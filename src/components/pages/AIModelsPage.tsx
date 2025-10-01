import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import PredictForm from "../PredictForm";
import { getModelPerformance, ModelMetrics } from "../../services/api"; // <-- Import API function
import { Skeleton } from "../ui/skeleton"; // Assuming you have a Skeleton component

interface AIModelsPageProps {
  onNavigateBack: () => void;
}

// Function to render the loading state
const LoadingMetrics = () => (
    <div className="space-y-3">
        <div className="flex justify-between items-center">
            <span className="text-sm">R² Score</span>
            <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm">RMSE</span>
            <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm">MAE</span>
            <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex justify-between items-center">
            <span className="text-sm">Prediction Horizon</span>
            <Skeleton className="h-4 w-20" />
        </div>
    </div>
);

export function AIModelsPage({ onNavigateBack }: AIModelsPageProps) {
    const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                const data = await getModelPerformance();
                setMetrics(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch model performance:", err);
                setError("Failed to load model performance metrics. Please ensure the model is trained and the backend is running.");
                setMetrics(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const renderPerformanceContent = () => {
        if (loading) {
            return <LoadingMetrics />;
        }
        
        if (error) {
            return <p className="text-red-500 text-sm">{error}</p>;
        }

        // Use a calculated R2 Score (or default if not available in metrics)
        // Since the model only provides MAE/RMSE, we'll keep the R2 score static for now
        // or replace it with something related to MAE/RMSE calculation base.
        const staticR2 = "0.89 (Placeholder)"; 
        const staticAccuracy = "94.2% (Placeholder)"; 

        return (
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm">Accuracy (Hypothetical)</span>
                    <span className="text-sm text-primary font-medium">{staticAccuracy}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">R² Score (Hypothetical)</span>
                    <span className="text-sm text-primary font-medium">{staticR2}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">RMSE (Root Mean Square Error)</span>
                    <span className="text-sm text-primary font-medium">
                        {metrics?.rmse ? `${metrics.rmse.toFixed(3)} m³/s` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">MAE (Mean Absolute Error)</span>
                    <span className="text-sm text-primary font-medium">
                        {metrics?.mae ? `${metrics.mae.toFixed(3)} m³/s` : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">Prediction Horizon</span>
                    <span className="text-sm text-primary font-medium">6 months</span>
                </div>
            </div>
        );
    };

    return (
        <div className="pt-16">
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Button 
                            variant="outline" 
                            onClick={onNavigateBack}
                            className="mb-8"
                        >
                            ← Back to Features
                        </Button>
                        
                        <div className="text-center space-y-4 mb-16">
                            <div className="text-6xl mb-4">📊</div>
                            <h1 className="text-3xl lg:text-4xl text-foreground">
                                AI Models & Machine Learning
                            </h1>
                            <div className="w-24 h-1 bg-primary mx-auto"></div>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Advanced machine learning algorithms trained on historical data to provide precise seasonal river flow predictions with confidence intervals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle>Model Architecture</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            <span className="text-sm">Neural Networks (LSTM/GRU)</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            <span className="text-sm">Random Forest Ensembles</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            <span className="text-sm">Support Vector Regression</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            <span className="text-sm">Gradient Boosting Models (Primary Model)</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="h-2 w-2 bg-primary rounded-full"></div>
                                            <span className="text-sm">Ensemble Voting Systems</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle>Actual Performance Metrics (XGBoost)</CardTitle>
                                    <CardDescription>
                                        These results are calculated from the current deployed model's test set.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {renderPerformanceContent()} {/* <-- Dynamic Data Here */}
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="border-0 shadow-sm bg-white mb-12">
                            <CardHeader>
                                <CardTitle>Training & Validation Process</CardTitle>
                                <CardDescription>
                                    Our models are trained on decades of historical data with rigorous validation
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-4 gap-6">
                                    <div className="text-center space-y-3">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                            <span className="text-primary">📚</span>
                                        </div>
                                        <h3 className="font-medium">Data Preparation</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Feature engineering and temporal alignment
                                        </p>
                                    </div>
                                    
                                    <div className="text-center space-y-3">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                            <span className="text-primary">🎯</span>
                                        </div>
                                        <h3 className="font-medium">Model Training</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Cross-validation with temporal splits
                                        </p>
                                    </div>
                                    
                                    <div className="text-center space-y-3">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                            <span className="text-primary">✅</span>
                                        </div>
                                        <h3 className="font-medium">Validation</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Out-of-sample testing and backtesting
                                        </p>
                                    </div>
                                    
                                    <div className="text-center space-y-3">
                                        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                                            <span className="text-primary">🚀</span>
                                        </div>
                                        <h3 className="font-medium">Deployment</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Real-time inference and monitoring
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Prediction Form wired to FastAPI */}
                        <div className="mb-12">
                            <PredictForm />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle>Key Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Uncertainty quantification with confidence intervals</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Multi-horizon forecasting (1-6 months ahead)</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Automatic model retraining and updates</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Extreme event detection and alerts</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Ensemble predictions for robustness</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader>
                                    <CardTitle>Innovation Highlights</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Physics-informed neural networks</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Transfer learning across river basins</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Attention mechanisms for temporal patterns</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Multi-scale feature integration</span>
                                        </li>
                                        <li className="flex items-start space-x-2">
                                            <span className="text-primary mt-1">•</span>
                                            <span>Adaptive learning for climate change</span>
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
