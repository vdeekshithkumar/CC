
const TEST_CASES = [
    { id: 1, name: "Short Coastal (LA to Oakland)", origin: { lat: 33.7405, lon: -118.2719 }, dest: { lat: 37.7955, lon: -122.2797 }, expected: 350 },
    { id: 2, name: "Trans-Pacific (Shanghai to LA)", origin: { lat: 31.2304, lon: 121.4737 }, dest: { lat: 33.7405, lon: -118.2719 }, expected: 5500 },
    { id: 3, name: "Europe to Asia (Rotterdam to Singapore)", origin: { lat: 51.9244, lon: 4.4777 }, dest: { lat: 1.2644, lon: 103.8223 }, expected: 8300 },
    { id: 4, name: "Americas to Asia (NY to Tokyo)", origin: { lat: 40.6895, lon: -74.0447 }, dest: { lat: 35.6528, lon: 139.7594 }, expected: 9700 },
    { id: 5, name: "Intra-Regional Europe (Hamburg to Barcelona)", origin: { lat: 53.5511, lon: 9.9937 }, dest: { lat: 41.3522, lon: 2.1658 }, expected: 0 }, // Benchmark not provided, but estimated ~2200 NM via Gibraltar
    { id: 6, name: "Trans-Atlantic (Southampton to NY)", origin: { lat: 50.8998, lon: -1.4044 }, dest: { lat: 40.6895, lon: -74.0447 }, expected: 3200 }, //Approx
    { id: 7, name: "Long Route (Durban to Santos)", origin: { lat: -29.8587, lon: 31.0218 }, dest: { lat: -23.9608, lon: -46.3033 }, expected: 3900 }, // Approx
    { id: 8, name: "Very Short (HK to Shenzhen)", origin: { lat: 22.3193, lon: 114.1694 }, dest: { lat: 22.5329, lon: 114.1344 }, expected: 20 }, // Approx
    { id: 9, name: "Same Point", origin: { lat: 1.2644, lon: 103.8223 }, dest: { lat: 1.2644, lon: 103.8223 }, expected: 0 },
    { id: 10, name: "Intl Date Line (Vladivostok to Vancouver)", origin: { lat: 43.1056, lon: 131.8735 }, dest: { lat: 49.2827, lon: -123.1207 }, expected: 4100 } // Approx
]; // Note: Added expected approx values for 5, 6, 7, 8, 10 based on general knowledge for dev testing

// --- Logic Implementation ---

function calculateDistance(lat1, lon1, lat2, lon2) {
    if (lat1 === lat2 && lon1 === lon2) return 0;

    const R = 3440.065; // Earth radius in Nautical Miles
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function getRegion(lat, lon) {
    if (lat > 30 && lon > -30 && lon < 40) return 'EUROPE';
    if (lat > 0 && lon > 90 && lon < 150) return 'ASIA_EAST';
    if (lat > 0 && lon > 40 && lon < 90) return 'ASIA_WEST'; // Incl Middle East
    if (lat < 10 && lon > 90 && lon < 160) return 'ASIA_SE';
    if (lon < -30 && lon > -180) {
        if (lat > 15) return 'AMERICAS_NORTH';
        return 'AMERICAS_SOUTH';
    }
    if (lat < 0 && lon > -20 && lon < 60) return 'AFRICA_SOUTH';
    return 'OTHER';
}

function estimateShippingRoute(origin, dest) {
    if (!origin || !dest) return { error: "Invalid Coordinates" };

    const directNm = calculateDistance(origin.lat, origin.lon, dest.lat, dest.lon);

    if (isNaN(directNm)) return { error: "Calculation Failed" };
    if (directNm < 1) return {
        directDistanceNm: 0,
        estimatedShippingDistanceNm: 0,
        routeType: "same_port",
        routeMultiplier: 1,
        canal: "none",
        transitDays: 0,
        confidence: "high"
    };

    let multiplier = 1.15; // Base heuristic for sea variance
    let routeType = "transoceanic";
    let canal = "none";
    let confidence = "medium";

    const regOrigin = getRegion(origin.lat, origin.lon);
    const regDest = getRegion(dest.lat, dest.lon);

    // Heuristics
    // 1. Coastal / Very Short
    if (directNm < 500) {
        multiplier = 1.30; // Coastal routes meander more
        routeType = "coastal";
        confidence = "medium";
    }

    // 2. Trans-Pacific (Asia East <-> Americas West)
    // Coords check needed as regions assume 'Americas North' covers both coasts usually
    // Simple check: Long difference large, crossing date line logic implicit in calculation? 
    // Actually direct calc handles date line if dLon handled right (which Haversine usually does if diff < 180? No, standard Haversine assumes shortest path).
    // Let's ensure Haversine does shortest path (Math.sin(dLon/2)).

    // Detect Trans-Pacific
    if ((regOrigin === 'ASIA_EAST' && regDest === 'AMERICAS_NORTH') ||
        (regOrigin === 'AMERICAS_NORTH' && regDest === 'ASIA_EAST')) {
        // If Panama is NOT involved (West Coast)
        // Simple Longitude check: if Americas lon is < -100 (West Coastish)
        if ((origin.lon < -100 || dest.lon < -100)) {
            // Shanghai to LA
            multiplier = 1.05; // Great circle is very efficient here usually
            routeType = "transoceanic";
            canal = "none";
        } else {
            // East coast to Asia -> Panama
            multiplier = 1.4; // Detour
            canal = "panama";
        }
    }

    // 3. Europe to Asia (Suez)
    if ((regOrigin === 'EUROPE' && (regDest === 'ASIA_EAST' || regDest === 'ASIA_SE')) ||
        (regDest === 'EUROPE' && (regOrigin === 'ASIA_EAST' || regOrigin === 'ASIA_SE'))) {
        // Rotterdam to Singapore
        // Direct distance goes over Russia/Land. Shipping goes around.
        // Heuristic: HUGE multiplier if linear, but linear logic fails on Haversine over land.
        // We know Rotterdam -> Singapore straight line is ~5500NM (over land). Actual is 8300.
        // Ratio: 8300/5500 ~= 1.5
        multiplier = 1.55;
        canal = "suez";
        routeType = "transoceanic";
    }

    // 4. Intra-Europe (Hamburg to Barcelona) - Around Spain/Gibraltar
    if (regOrigin === 'EUROPE' && regDest === 'EUROPE') {
        // If lat diff is significant and requires going around land (e.g. North Sea to Med)
        // Check if one is North (< 48N) and one South (> 48N) of France/Spain? 
        // Hamburg (~53N) to Barcelona (~41N).
        // Direct is over land. Sea is around Gibraltar.
        // Heuristic: If one is Mediterranean (lon > -5, lat < 45) and one is North/Baltic.
        // Simple heuristic: distance > 800NM inside Europe probably means detour around land if lats differ?
        if (directNm > 500) {
            multiplier = 1.6; // Gibraltar detour
            routeType = "intra-regional";
        } else {
            routeType = "intra-regional";
        }
    }

    // 5. Trans-Atlantic
    if ((regOrigin === 'EUROPE' && regDest === 'AMERICAS_NORTH') ||
        (regDest === 'EUROPE' && regOrigin === 'AMERICAS_NORTH')) {
        multiplier = 1.1; // Pretty direct
        routeType = "transoceanic";
    }

    const estimatedNm = Math.round(directNm * multiplier);
    const days = (estimatedNm / (20 * 24)).toFixed(1);

    return {
        directDistanceNm: Math.round(directNm),
        estimatedShippingDistanceNm: estimatedNm,
        routeType: routeType,
        routeMultiplier: multiplier,
        canalRequires: canal,
        estimatedTransitDays: days,
        confidence: confidence
    };
}


// --- Test Runner ---

console.log("Running Maritime Logic Tests...\n");

TEST_CASES.forEach(test => {
    const result = estimateShippingRoute(test.origin, test.dest);

    console.log(`Test Case ${test.id}: ${test.name}`);
    console.log(`  Origin: ${test.origin.lat}, ${test.origin.lon}`);
    console.log(`  Dest: ${test.dest.lat}, ${test.dest.lon}`);
    console.log(`  Direct NM: ${result.directDistanceNm}`);
    console.log(`  Est. Shipping NM: ${result.estimatedShippingDistanceNm} (Expected ~${test.expected})`);
    console.log(`  Details: Type=${result.routeType}, Canal=${result.canalRequires}, Days=${result.estimatedTransitDays}`);

    if (test.expected > 0) {
        const diff = Math.abs(result.estimatedShippingDistanceNm - test.expected);
        const pct = (diff / test.expected) * 100;
        console.log(`  Accuracy: ${pct.toFixed(1)}% difference`);
    }
    console.log("---------------------------------------------------");
});
