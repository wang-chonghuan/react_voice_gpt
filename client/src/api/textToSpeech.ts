import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import {franc, francAll} from 'franc'

// 语音合成函数
export const textToSpeech = async (inputText: string, subscriptionKey: string, region: string) => {
  const detectedLanguage = franc(inputText, {minLength: 1});
  let synthesisLanguage = "en-US";

  if (detectedLanguage === "cmn" || detectedLanguage === "zh") {
    synthesisLanguage = "zh-CN";
  }

  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);
  speechConfig.speechSynthesisLanguage = synthesisLanguage;
  const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

  return new Promise<void>((resolve, reject) => {
    synthesizer.speakTextAsync(
      inputText,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          resolve();
        } else if (result.reason === sdk.ResultReason.Canceled) {
          reject(new Error(`Synthesis failed. Error detail: ${result.errorDetails}`));
        }
        synthesizer.close();
      },
      (error) => {
        reject(error);
        synthesizer.close();
      }
    );
  });
};
