import { Injectable } from '@angular/core';

export interface RouteEstimate {
    directDistanceNm: number;
    estimatedShippingDistanceNm: number;
    routeType: 'coastal' | 'intra-regional' | 'transoceanic' | 'same_port';
    routeMultiplier: number;
    canalRequired: 'none' | 'suez' | 'panama' | 'kiel';
    estimatedTransitDays: number;
    confidence: 'high' | 'medium' | 'low';
    method: string;
}

@Injectable({
    providedIn: 'root'
})
export class MaritimeCalculatorService {

    constructor() { }

    /**
     * Calculates the Great Circle distance in Nautical Miles (NM).
     */
    public calculateDirectDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        if (lat1 === lat2 && lon1 === lon2) return 0;

        // Earth radius in Nautical Miles
        const R = 3440.065;

        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Estimates shipping route details including distance corrections and transit time.
     */
    public estimateRoute(originLat: number, originLon: number, destLat: number, destLon: number): RouteEstimate {
        const directNm = this.calculateDirectDistance(originLat, originLon, destLat, destLon);

        // Default values
        let multiplier = 1.15; // Standard deviation for sea routes
        let routeType: RouteEstimate['routeType'] = 'transoceanic';
        let canal: RouteEstimate['canalRequired'] = 'none';
        let confidence: RouteEstimate['confidence'] = 'medium';

        if (directNm < 1) {
            return {
                directDistanceNm: 0,
                estimatedShippingDistanceNm: 0,
                routeType: 'same_port',
                routeMultiplier: 1,
                canalRequired: 'none',
                estimatedTransitDays: 0,
                confidence: 'high',
                method: 'Same Port'
            };
        }

        const startRegion = this.getRegion(originLat, originLon);
        const endRegion = this.getRegion(destLat, destLon);

        // --- Heuristic Rule Engine ---

        // 1. Short Coastal Routes (< 600 NM)
        // Coastal routes often wind around landmasses more than open ocean
        if (directNm < 600) {
            multiplier = 1.25;
            routeType = 'coastal';
        }

        // 2. Trans-Pacific (Asia <-> US West Coast)
        // Direct Great Circle is quite efficient here (following Aleutian islands)
        if (this.isTransPacific(startRegion, endRegion)) {
            // If US West Coast (Lon < -100 approx)
            if (originLon < -100 || destLon < -100) {
                multiplier = 1.08; // Very direct
            }
        }

        // 3. US East Coast <-> Asia (Panama Canal)
        // This is a massive deviation from Great Circle (which would go over North Pole/Canada)
        if (this.isUSEastToAsia(startRegion, endRegion, originLon, destLon)) {
            multiplier = 1.65; // Major deviation through Panama
            canal = 'panama';
        }

        // 4. Europe <-> Asia (Suez Canal)
        // Great Circle goes over Russia/Land. Shipping goes around.
        if (this.isEuropeToAsia(startRegion, endRegion)) {
            multiplier = 1.55;
            canal = 'suez';
        }

        // 5. Intra-Europe (e.g. Baltic to Med)
        if (startRegion === 'EUROPE' && endRegion === 'EUROPE' && directNm > 800) {
            multiplier = 1.6; // Likely around Gibraltar
            routeType = 'intra-regional';
        }

        // 6. Trans-Atlantic
        if (this.isTransAtlantic(startRegion, endRegion)) {
            multiplier = 1.10; // Fairly direct
        }

        const estimatedNm = Math.round(directNm * multiplier);
        // 20 knots avg speed = 20 NM/hour
        const hours = estimatedNm / 20;
        const days = parseFloat((hours / 24).toFixed(1));

        return {
            directDistanceNm: Math.round(directNm),
            estimatedShippingDistanceNm: estimatedNm,
            routeType: routeType,
            routeMultiplier: multiplier,
            canalRequired: canal,
            estimatedTransitDays: days,
            confidence: confidence,
            method: `Great Circle x ${multiplier} (${canal !== 'none' ? canal + ' routing' : 'standard deviation'})`
        };
    }

    // --- Helper Methods ---

    private getRegion(lat: number, lon: number): string {
        if (lat > 30 && lon > -30 && lon < 45) return 'EUROPE';
        if (lat > 0 && lon > 90 && lon < 150) return 'ASIA_EAST'; // China, Japan, Korea
        if (lat > 0 && lon > 45 && lon < 90) return 'ASIA_WEST'; // India, Middle East
        if (lat < 10 && lon > 90 && lon < 160) return 'ASIA_SE'; // Singapore, Indo
        if (lon < -30 && lon > -180) {
            if (lat > 15) return 'AMERICAS_NORTH'; // US, Canada, Mex
            return 'AMERICAS_SOUTH';
        }
        if (lat < 0 && lon > -20 && lon < 60) return 'AFRICA_SOUTH';
        return 'OTHER';
    }

    private isTransPacific(r1: string, r2: string): boolean {
        return (r1 === 'ASIA_EAST' && r2 === 'AMERICAS_NORTH') ||
            (r2 === 'ASIA_EAST' && r1 === 'AMERICAS_NORTH');
    }

    private isUSEastToAsia(r1: string, r2: string, lon1: number, lon2: number): boolean {
        // Check if it's Americas <-> Asia
        if (!this.isTransPacific(r1, r2)) return false;

        // Check if the Americas point is East Coast (Lon > -100 roughly)
        // New York is ~-74. West coast is ~-118.
        const americasLon = (r1 === 'AMERICAS_NORTH') ? lon1 : lon2;
        return americasLon > -100;
    }

    private isEuropeToAsia(r1: string, r2: string): boolean {
        const asiaRegions = ['ASIA_EAST', 'ASIA_WEST', 'ASIA_SE'];
        return (r1 === 'EUROPE' && asiaRegions.includes(r2)) ||
            (r2 === 'EUROPE' && asiaRegions.includes(r1));
    }

    private isTransAtlantic(r1: string, r2: string): boolean {
        return (r1 === 'EUROPE' && r2 === 'AMERICAS_NORTH') ||
            (r2 === 'EUROPE' && r1 === 'AMERICAS_NORTH');
    }

}
