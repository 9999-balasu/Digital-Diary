// speech.d.ts
interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: any;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionStatic {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
}

declare var SpeechRecognition: SpeechRecognitionStatic;
declare var webkitSpeechRecognition: SpeechRecognitionStatic;

interface Window {
  SpeechRecognition: typeof SpeechRecognition;
  webkitSpeechRecognition: typeof SpeechRecognition;
}
