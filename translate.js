import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function translate() {
  const enJson = JSON.parse(fs.readFileSync('./src/locales/en.json', 'utf-8'));

  const promptES = `Translate the following JSON to Spanish. Keep the keys exactly the same. Return ONLY valid JSON, no markdown formatting or backticks.
${JSON.stringify(enJson, null, 2)}`;

  const promptPT = `Translate the following JSON to Portuguese. Keep the keys exactly the same. Return ONLY valid JSON, no markdown formatting or backticks.
${JSON.stringify(enJson, null, 2)}`;

  console.log('Translating to Spanish...');
  const resES = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptES,
    config: {
      responseMimeType: 'application/json'
    }
  });
  fs.writeFileSync('./src/locales/es.json', resES.text);
  console.log('Spanish translation saved.');

  console.log('Translating to Portuguese...');
  const resPT = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: promptPT,
    config: {
      responseMimeType: 'application/json'
    }
  });
  fs.writeFileSync('./src/locales/pt.json', resPT.text);
  console.log('Portuguese translation saved.');
}

translate().catch(console.error);
