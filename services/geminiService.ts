import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "../constants";

let ai: GoogleGenAI | null = null;

const getAI = () => {
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

// Construct a system prompt that includes the menu data context
const getSystemPrompt = () => {
  const menuContext = MENU_ITEMS.map(
    item => `${item.name} (${item.category}): $${item.price}, ${item.calories} cal. Tags: ${item.tags.join(', ')}. Desc: ${item.description}`
  ).join('\n');

  return `You are "BurgerBot", a friendly, energetic, and helpful fast-food kiosk assistant at BurgerTech.
  
  Your goal is to help customers choose what to eat.
  
  HERE IS THE CURRENT MENU:
  ${menuContext}
  
  RULES:
  1. Only recommend items from the menu above.
  2. If asked about allergies, advise checking with staff, but provide ingredient info if available in description.
  3. Be concise. Kiosk users are in a hurry. Keep answers under 40 words unless asked for a list.
  4. If a user asks for a recommendation, ask 1 clarifying question (e.g., "Do you prefer beef or chicken?") or suggest a best-seller.
  5. Use emojis occasionally 🍔 🍟.
  `;
};

export const getGeminiReply = async (userMessage: string, history: {role: 'user'|'model', text: string}[]): Promise<string> => {
  try {
    const client = getAI();
    
    // We will use a fresh chat model for simplicity, but in a real app, we'd maintain the chat object.
    // For this stateless service, we reconstruct history each time or use single-turn if easier, 
    // but preserving context is better.
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemPrompt(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({
      message: userMessage
    });

    return response.text || "I'm having trouble connecting to the kitchen. Try picking a delicious burger!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My brain froze 🍦. Please try again.";
  }
};