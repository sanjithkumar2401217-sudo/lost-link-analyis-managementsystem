
import { GoogleGenAI, Type } from "@google/genai";
import { ParsedItemData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const parseItemDescription = async (description: string): Promise<ParsedItemData> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Parse the following description of a lost or found item and extract the details. Today's date is ${new Date().toLocaleDateString()}. If a specific date is mentioned (e.g., 'yesterday', 'Tuesday'), calculate the YYYY-MM-DD date. If no date is found, use today's date in YYYY-MM-DD format. Description: "${description}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        item: {
                            type: Type.STRING,
                            description: "The name of the item (e.g., 'iPhone 14', 'water bottle')."
                        },
                        location: {
                            type: Type.STRING,
                            description: "The location where the item was lost or found (e.g., 'Library', 'Food Court')."
                        },
                        date: {
                            type: Type.STRING,
                            description: "The date the item was lost or found in YYYY-MM-DD format."
                        },
                        specification: {
                            type: Type.STRING,
                            description: "Detailed specifications or description of the item (e.g., 'blue color, with a cat sticker')."
                        }
                    },
                    required: ["item", "location", "date", "specification"]
                }
            }
        });

        const jsonString = response.text;
        const parsedData: ParsedItemData = JSON.parse(jsonString);
        return parsedData;

    } catch (error) {
        console.error("Error parsing item description with Gemini:", error);
        throw new Error("Failed to understand the item description. Please try entering the details manually.");
    }
};
