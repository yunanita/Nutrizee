import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const analyzeNutritionLabel = async (base64Image: string): Promise<NutritionData> => {
  const model = "gemini-flash-latest"; // Using the stable flash latest alias for maximum production reliability

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
          text: `You are a high-precision nutrition label analysis engine. Your task is to extract every detail from the provided image, paying special attention to "super tiny" text, dense ingredient lists, and small numeric values in nutrition tables.
          
          Meticulously scan the image for:
          1. Fine print at the bottom or sides of the packaging.
          2. Trace allergens and micro-ingredients often listed in the smallest font.
          3. Exact numeric values and units, even if blurry or extremely small.
          4. Deceptive serving size information printed in small text.
          
          Instructions:
          - Perform a mental "high-resolution scan" of the entire image.
          - If a text block is tiny, use contextual clues from the surrounding label to resolve it with 100% accuracy.
          - Do not skip any ingredient, even if it's listed in a long, dense block.
          - Transform the data into a structured report in the Nutrizee brand voice: helpful, intelligent, modern, and educational.
          
          Provide the output strictly in the JSON schema requested.
          If data is absolutely unreadable after maximum effort, mark as "Unknown".`,
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
