import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Action {
    type: 'move' | 'lease' | 'buy';
    from?: string;
    amount: number;
    cost: number;
    savings: number;
}

interface Prediction {
    id: number;
    port: string;
    portCode: string;
    type: 'deficit' | 'surplus';
    amount: number;
    unit: string;
    daysAhead: number;
    confidence: number;
    reason: string;
    actions: Action[];
}

interface AIInsight {
    summary: {
        predictedDeficits: number;
        recommendations: number;
        potentialSavings: number;
    };
    predictions: Prediction[];
}

@Component({
    selector: 'app-ai-insights',
    templateUrl: './ai-insights.component.html',
    styleUrls: ['./ai-insights.component.css']
})
export class AiInsightsComponent implements OnInit {

    aiInsights: AIInsight = {
        summary: {
            predictedDeficits: 3,
            recommendations: 2,
            potentialSavings: 24500
        },
        predictions: [
            {
                id: 1,
                port: 'Colombo',
                portCode: 'LKCMB',
                type: 'deficit',
                amount: 120,
                unit: 'TEU',
                daysAhead: 6,
                confidence: 89,
                reason: 'Peak season + import surge',
                actions: [
                    {
                        type: 'move',
                        from: 'Tuticorin',
                        amount: 80,
                        cost: 7200,
                        savings: 8600
                    }
                ]
            },
            {
                id: 2,
                port: 'Mumbai',
                portCode: 'INMUN',
                type: 'deficit',
                amount: 85,
                unit: 'TEU',
                daysAhead: 4,
                confidence: 92,
                reason: 'Seasonal demand spike + vessel delays',
                actions: [
                    {
                        type: 'move',
                        from: 'Chennai',
                        amount: 60,
                        cost: 5400,
                        savings: 7200
                    }
                ]
            },
            {
                id: 3,
                port: 'Singapore',
                portCode: 'SGSIN',
                type: 'surplus',
                amount: 200,
                unit: 'TEU',
                daysAhead: 8,
                confidence: 76,
                reason: 'Reduced export activity',
                actions: [
                    {
                        type: 'move',
                        from: 'Singapore',
                        amount: 120,
                        cost: 9800,
                        savings: 9700
                    }
                ]
            }
        ]
    };

    constructor(public dialog: MatDialog) { }

    ngOnInit(): void {
    }

    openModal(): void {
        this.dialog.open(AiInsightsModalComponent, {
            width: '90vw',
            maxWidth: '1200px',
            maxHeight: '90vh',
            data: this.aiInsights,
            panelClass: 'ai-insights-modal'
        });
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

// Modal Component
@Component({
    selector: 'app-ai-insights-modal',
    template: `
        <div class="modal-header">
            <h2 class="modal-title">
                <span class="ai-icon">🤖</span>
                AI Insights
            </h2>
            <button mat-icon-button (click)="closeModal()" aria-label="Close modal">
                <span class="close-icon">✕</span>
            </button>
        </div>

        <div mat-dialog-content class="modal-content">
            <div class="predictions-grid">
                <div *ngFor="let prediction of data.predictions; let i = index" 
                     class="prediction-card"
                     [style.animation-delay]="i * 100 + 'ms'">
                    
                    <!-- Card Header -->
                    <div class="card-header">
                        <div class="port-info">
                            <span class="status-icon">{{ getStatusIcon(prediction.type) }}</span>
                            <h3 class="port-name">{{ prediction.port }} - {{ prediction.portCode }}</h3>
                            <span class="confidence-badge" [ngClass]="getConfidenceBadgeClass(prediction.confidence)">
                                {{ prediction.confidence }}% confidence
                            </span>
                        </div>
                        <button class="dismiss-btn" 
                                (click)="dismissPrediction(prediction.id)"
                                aria-label="Dismiss prediction">
                            ✕
                        </button>
                    </div>

                    <!-- Prediction Details -->
                    <div class="prediction-details">
                        <div class="metric">
                            <label class="metric-label">Predicted {{ prediction.type === 'deficit' ? 'Deficit' : 'Surplus' }}</label>
                            <div class="metric-value">{{ prediction.amount }} {{ prediction.unit }} in {{ prediction.daysAhead }} days</div>
                        </div>
                        <div class="reason">
                            <label class="metric-label">Reason</label>
                            <div class="metric-value">{{ prediction.reason }}</div>
                        </div>
                    </div>

                    <!-- Recommendations -->
                    <div class="recommendations" *ngIf="prediction.actions.length > 0">
                        <h4 class="recommendations-title">💡 Recommended Actions</h4>
                        <div *ngFor="let action of prediction.actions" class="action-item">
                            <div class="action-details">
                                <p class="action-description">
                                    Move {{ action.amount }} TEU from {{ action.from }} (closest)
                                </p>
                                <span class="cost-savings">
                                    Cost: {{ formatCurrency(action.cost) }} | Saves: {{ formatCurrency(action.savings) }}
                                </span>
                            </div>
                            <div class="action-buttons">
                                <button class="btn-primary" 
                                        (click)="approveMove(prediction, action)"
                                        aria-label="Approve container move">
                                    Approve Move
                                </button>
                                <button class="btn-secondary" 
                                        (click)="viewOptimizer(prediction)"
                                        aria-label="View in optimizer">
                                    View Optimizer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem;
            border-bottom: 2px solid #F3F4F6;
        }

        .modal-title {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            color: #1F2937;
            margin: 0;
        }

        .ai-icon {
            font-size: 1.8rem;
        }

        .close-icon {
            font-size: 1.5rem;
            color: #6B7280;
        }

        .modal-content {
            padding: 1.5rem;
            max-height: 70vh;
            overflow-y: auto;
        }

        .predictions-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
            gap: 1.5rem;
        }

        @media (max-width: 768px) {
            .predictions-grid {
                grid-template-columns: 1fr;
            }
        }
    `]
})
export class AiInsightsModalComponent {
    constructor(
        public dialogRef: MatDialogRef<AiInsightsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AIInsight
    ) { }

    closeModal(): void {
        this.dialogRef.close(); // Changed from closeAll() to close() to close only this modal
    }

    getConfidenceBadgeClass(confidence: number): string {
        if (confidence >= 85) {
            return 'confidence-high';
        } else if (confidence >= 70) {
            return 'confidence-medium';
        } else {
            return 'confidence-low';
        }
    }

    getStatusIcon(type: string): string {
        return type === 'deficit' ? '🔴' : '🟢';
    }

    dismissPrediction(id: number): void {
        this.data.predictions = this.data.predictions.filter(p => p.id !== id);
        // Note: Summary counts are not updated here. If needed, this would require
        // emitting an event or passing a service to update the parent component's data.
    }

    approveMove(prediction: Prediction, action: Action): void {
        console.log('Approve move:', { prediction, action });
        // Placeholder for future integration
        alert(`Move approved: ${action.amount} TEU from ${action.from} to ${prediction.port}`);
    }

    viewOptimizer(prediction: Prediction): void {
        console.log('View optimizer for:', prediction);
        // Placeholder for navigation to optimizer
        alert(`Opening optimizer view for ${prediction.port}`);
    }

    formatCurrency(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
}
