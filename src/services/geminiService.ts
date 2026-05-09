import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const analyzeNutritionLabel = async (base64Image: string): Promise<NutritionData> => {
  const model = "gemini-flash-latest"; // Using flash for speed/vision capability

  const response = await ai.models.generateContent({
    model: model,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        {
          text: `Analyze this nutrition label and ingredient list. Transform it into a structured report following the Nutrizee brand voice: helpful, intelligent, modern, and educational.
          
          Provide the output strictly in the JSON schema requested.
          If data is missing or unreadable, mark as "Unknown".
          Focus on:
          1. Accurately identifying the product name (e.g., "Full Cream Milk", "Dark Chocolate Bar").
          2. Accurate extraction of nutrition values.
          3. Explaining ingredients in beginner-friendly terms.
          3. Warning about allergens.
          4. Assessing if serving sizes are deceptive.
          5. Giving an overall health score (0-100) and color classification (Green/Yellow/Red).`,
        },
      ],
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          productOverview: {
            type: Type.OBJECT,
            properties: {
              productName: { type: Type.STRING },
              category: { type: Type.STRING },
              type: { type: Type.STRING },
              classification: { type: Type.STRING },
            },
            required: ["productName", "category", "type", "classification"],
          },
          nutritionSummary: {
            type: Type.OBJECT,
            properties: {
              calories: { type: Type.STRING },
              sugar: { type: Type.STRING },
              protein: { type: Type.STRING },
              sodium: { type: Type.STRING },
              totalFat: { type: Type.STRING },
              saturatedFat: { type: Type.STRING },
              carbohydrates: { type: Type.STRING },
              fiber: { type: Type.STRING },
              units: {
                type: Type.OBJECT,
                additionalProperties: { type: Type.STRING }
              },
            },
            required: ["calories", "sugar", "protein", "sodium", "totalFat", "saturatedFat", "carbohydrates", "fiber", "units"],
          },
          servingSizeAnalysis: {
            type: Type.OBJECT,
            properties: {
              labelServingSize: { type: Type.STRING },
              servingsPerContainer: { type: Type.STRING },
              realisticAssessment: { type: Type.STRING },
              totalPackageImpact: { type: Type.STRING },
            },
            required: ["labelServingSize", "servingsPerContainer", "realisticAssessment"],
          },
          assessments: {
            type: Type.OBJECT,
            properties: {
              sugar: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Very High"] },
                  explanation: { type: Type.STRING },
                },
                required: ["level", "explanation"],
              },
              sodium: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Very High"] },
                  explanation: { type: Type.STRING },
                },
                required: ["level", "explanation"],
              },
              fat: {
                type: Type.OBJECT,
                properties: {
                  level: { type: Type.STRING, enum: ["Low", "Moderate", "High", "Very High"] },
                  explanation: { type: Type.STRING },
                },
                required: ["level", "explanation"],
              },
              protein: {
                type: Type.OBJECT,
                properties: {
                  impact: { type: Type.STRING },
                },
                required: ["impact"],
              },
            },
          },
          ingredientBreakdown: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                explanation: { type: Type.STRING },
                purpose: { type: Type.STRING },
                cautionLevel: { type: Type.STRING, enum: ["Safe", "Moderate", "Avoid"] },
              },
              required: ["name", "explanation", "purpose", "cautionLevel"],
            },
          },
          allergyWarnings: {
            type: Type.OBJECT,
            properties: {
              confirmed: { type: Type.ARRAY, items: { type: Type.STRING } },
              traces: { type: Type.ARRAY, items: { type: Type.STRING } },
              inferred: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["confirmed", "traces", "inferred"],
          },
          additivesReview: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                type: { type: Type.STRING },
                explanation: { type: Type.STRING },
              },
              required: ["name", "type", "explanation"],
            },
          },
          overallHealthScore: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              color: { type: Type.STRING, enum: ["Green", "Yellow", "Red"] },
              summary: { type: Type.STRING },
            },
            required: ["score", "color", "summary"],
          },
          consumerFriendlySummary: { type: Type.STRING },
        },
        required: [
          "productOverview",
          "nutritionSummary",
          "servingSizeAnalysis",
          "assessments",
          "ingredientBreakdown",
          "allergyWarnings",
          "additivesReview",
          "overallHealthScore",
          "consumerFriendlySummary"
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(response.text) as NutritionData;
};
