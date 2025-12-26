
import React, { useState, useRef } from 'react';

interface Props {
  onTranscriptChange: (text: string) => void;
}

export const VoiceRecorder: React.FC<Props> = ({ onTranscriptChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [text, setText] = useState('');
  const recognitionRef = useRef<any>(null);

  const startRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("お使いのブラウザは音声認識に対応していません。");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      let current = '';
      for (let i = 0; i < event.results.length; i++) {
        current += event.results[i][0].transcript;
      }
      setText(current);
      onTranscriptChange(current);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  };

  const stopRecording = () => {
    recognitionRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-bold transition-all ${
            isRecording 
              ? 'bg-red-600 animate-pulse text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {isRecording ? (
            <>
              <span className="w-2 h-2 bg-white rounded-full"></span>
              録音停止
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
              プレゼンを録音
            </>
          )}
        </button>
        {text && <span className="text-xs text-green-500 font-bold">● 書き起こし中</span>}
      </div>
      
      <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 min-h-[60px] text-xs text-slate-400">
        {text || "「批評を開始する」前にプレゼンを話すと、発表態度や口癖も指摘の対象になります。"}
      </div>
    </div>
  );
};
