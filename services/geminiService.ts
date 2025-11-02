
import { GoogleGenAI } from '@google/genai';
import { CrushDetails, PerformativeLevel } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-pro';

const getLevelDescription = (level: PerformativeLevel) => {
    switch(level) {
        case PerformativeLevel.High:
            return "Be extremely over-the-top, almost like a parody. Think 'founded a crypto-philanthropy for endangered memes' or 'summited Mount Everest on a unicycle to find myself'. Make it sound absurdly impressive.";
        case PerformativeLevel.Medium:
            return "Be impressive but more grounded. Think 'published a research paper on a niche topic related to their major' or 'won a regional competition related to their interests'. Believable, but very cool.";
        case PerformativeLevel.Low:
            return "Be humble but intriguing. Focus on unique, quirky skills or experiences. Think 'can perfectly replicate any bird call' or 'spent a summer restoring ancient manuscripts in a monastery'. Quietly captivating.";
    }
}

export const generateAccomplishments = async (details: CrushDetails): Promise<string> => {
  try {
    const levelInstruction = getLevelDescription(details.performativeLevel);

    const prompt = `
      You are a witty and charming wingman. Your goal is to help me impress my crush by creating a short, slightly exaggerated bio filled with fake accomplishments.

      My crush's details:
      - Major: ${details.major}
      - Interests: ${details.interests}

      My desired "performative male" level is: ${details.performativeLevel}.
      Here is how you should act based on this level: ${levelInstruction}

      Generate a bio of 2-3 sentences. It must be funny, charming, and make me sound like someone they absolutely have to meet.
      IMPORTANT: Do not use quotation marks or markdown in your response. Just return the plain text bio.
    `;
    
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Error generating accomplishments:", error);
    return "I'm so amazing, the AI couldn't even handle it... But seriously, there was an error. Maybe try again?";
  }
};
