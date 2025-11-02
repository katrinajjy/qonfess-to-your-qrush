// services/geminiService.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

// --- TYPE DEFINITION ---
// Define the structure of the input object to satisfy TypeScript
export interface CrushDetails {
    major: string;
    interests: string;
    // Assuming performativeLevel is restricted to specific values, but allowing string flexibility
    performativeLevel: 'low' | 'medium' | 'high' | string;
}
// -----------------------

// IMPORTANT: Using import.meta.env to access environment variables in a Vite project.
// The key must be defined in your .env file with the VITE_ prefix (e.g., VITE_API_KEY="...")
const VITE_API_KEY = import.meta.env.VITE_API_KEY;

if (!VITE_API_KEY) {
    // This will alert you if you forgot to set the key in your .env file
    throw new Error("VITE_API_KEY environment variable not set. Please check your .env file and ensure the key is prefixed with VITE_.");
}

const ai = new GoogleGenerativeAI(VITE_API_KEY);
const model = 'gemini-2.5-pro';

export const generateAccomplishments = async (details: CrushDetails): Promise<string> => {
  try {
    const prompt = `
act as a comedic writer parodying performative male culture — the kind of guy who wears tote bags, drinks matcha, overshares about therapy, and treats everyday hobbies like philosophical experiments. your task: create fake, impressive-sounding interests and accomplishments that match the person’s major, hobbies, and a given performative level (low, medium, high).

tone & style rules:
- always comedic, ironic, and absurdly self-aware
- lowercase only
- use bullet points, starting each with a hyphen and a space (e.g., "- item")
- mix fake “interests” and “accomplishments”
- humor must stay rooted in performative male culture — pseudo-wokeness, emotional vulnerability as performance, sustainability obsession, artsy self-branding, etc.
- keep the language simple but conceptually ridiculous (not too academic, but still sound like he’s trying too hard to sound deep)

example tone:
- running a podcast where i interview my own reflection about mindfulness
- researching how tote bags can heal masculine loneliness
- co-founding a think tank about “the ethics of playlists”
- writing a dissertation on eye contact in third-wave coffee shops
- organizing a frisbee tournament to raise awareness for emotional repression

format:
lowercase, bullet points, concise, deadpan humor. just the list, no intro or outro.

based on this information:
- major: ${details.major}
- interests: ${details.interests}
- performative level: ${details.performativeLevel}

now generate a list of 5 fake interests and accomplishments that perfectly match that vibe.
`;
    
  const modelInstance = ai.getGenerativeModel({ model });

  const result = await modelInstance.generateContent(prompt);

  return result.response.text();

  } catch (error) {
    console.error("Error generating accomplishments:", error);
    return "- i'm so amazing, the ai couldn't even handle it\n- but seriously, there was an error\n- maybe try again?";
  }
};