import { NextResponse } from "next/server";
import { chatToGemini } from "@/util/geminiHelper";
import { ChatHistory, ChatSettings } from "@/type";

export async function POST(req: Request) {
    try {
        const { userMessage, history, settings } = (await req.json()) as {
            userMessage: string;
            history: ChatHistory;
            settings: ChatSettings;
        };

        const aiResponse = await chatToGemini(userMessage, history, settings);
        return NextResponse.json({ response: aiResponse });
    } catch (error) {
        console.error("Error in POST", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}