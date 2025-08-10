import {GoogleGenAI} from "@google/genai";

export function useGenAI() {

  const ai = new GoogleGenAI({apiKey: "AIzaSyBIOigPFAHapy7R3Gd6a5NNXPEF7KhMzOk"});

  async function askAI(contents: string) {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });
    console.log(response.text);

    let text = response.text
    if (response.text?.includes('json')) {
      text = response.text.slice(7, -3);
    }

    return text
  }

  return {askAI}
}
