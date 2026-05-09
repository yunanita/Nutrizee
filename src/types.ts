export interface NutritionData {
  productOverview: {
    productName: string;
    category: string;
    type: string;
    classification: string;
  };
  nutritionSummary: {
    calories: string;
    sugar: string;
    protein: string;
    sodium: string;
    totalFat: string;
    saturatedFat: string;
    carbohydrates: string;
    fiber: string;
    units: { [key: string]: string };
  };
  servingSizeAnalysis: {
    labelServingSize: string;
    servingsPerContainer: string;
    realisticAssessment: string;
    totalPackageImpact?: string;
  };
  assessments: {
    sugar: { level: 'Low' | 'Moderate' | 'High' | 'Very High'; explanation: string };
    sodium: { level: 'Low' | 'Moderate' | 'High' | 'Very High'; explanation: string };
    fat: { level: 'Low' | 'Moderate' | 'High' | 'Very High'; explanation: string };
    protein: { impact: string };
  };
  ingredientBreakdown: Array<{
    name: string;
    explanation: string;
    purpose: string;
    cautionLevel: 'Safe' | 'Moderate' | 'Avoid';
  }>;
  allergyWarnings: {
    confirmed: string[];
    traces: string[];
    inferred: string[];
  };
  additivesReview: Array<{
    name: string;
    type: string;
    explanation: string;
  }>;
  overallHealthScore: {
    score: number; // 1-100
    color: 'Green' | 'Yellow' | 'Red';
    summary: string;
  };
  consumerFriendlySummary: string;
}

export interface ScanHistory {
  id: string;
  timestamp: number;
  productName: string;
  score: number;
  color: 'Green' | 'Yellow' | 'Red';
  imageUrl: string;
  data: NutritionData;
}
