import { GoogleGenerativeAI } from "@google/generative-ai";
import { ChatHistory, GenerationConfig, ChatSettings } from "../type";


const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
    throw new Error("Google API key not found");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function chatToGemini(
    userMessage: string,
    history: ChatHistory,
    settings: ChatSettings
): Promise<string> {

    const model = genAI.getGenerativeModel({
        model: settings.model || "gemini-2.5-flash",
        systemInstruction: settings.systemInstructions || "you are a helpful assistant",
    });

    const generationConfig: GenerationConfig = {
        temperature: settings.temperature || 1,
        topP: 0.9,
        responseMimeType: "text/plain",
    }


    const chatSession = model.startChat({
        generationConfig,
        history,
    })


    try {
        const results = await chatSession.sendMessage(userMessage);
        return results.response.text();
    } catch (error) {
        console.error("Error in chatToGemini", error);
        throw error;
    }



}
