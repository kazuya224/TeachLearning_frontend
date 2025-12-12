import { useEffect, useRef, useState } from "react";

export const useSpeechInput = (onResult: (text: string) => void) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("このブラウザは音声認識に対応していません");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP"; // 日本語
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (e: any) => {
      console.error("Speech recognition error:", e);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onResult]);

  const start = () => {
    if (!recognitionRef.current) return;
    setIsRecording(true);
    recognitionRef.current.start();
  };

  const stop = () => {
    if (!recognitionRef.current) return;
    recognitionRef.current.stop();
  };

  return { isRecording, start, stop };
};