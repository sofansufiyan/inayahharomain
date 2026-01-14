
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { ChatMessage, SystemSettings, UmrahPackage } from '../types';

interface AIConsultantProps {
  settings: SystemSettings;
  packages: UmrahPackage[];
}

const AIConsultant: React.FC<AIConsultantProps> = ({ settings, packages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Assalamu'alaikum! Saya asisten digital ${settings.agencyName}. Ada yang bisa saya bantu terkait rencana ibadah Umrah Anda?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const packageContext = packages.map(p => `${p.name}: Rp ${p.price.toLocaleString('id-ID')} (${p.duration} hari)`).join(', ');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `Anda adalah konsultan Umrah ahli dari ${settings.agencyName}. 
          Tugas Anda adalah memberikan informasi yang ramah, islami, dan akurat tentang Umrah.
          Gunakan konteks paket berikut jika ditanya tentang harga atau jadwal: ${packageContext}.
          Selalu akhiri dengan doa atau ajakan untuk mendaftar di ${settings.agencyName}.`
        }
      });

      const aiText = response.text || "Maaf, saya sedang mengalami kendala teknis. Silakan hubungi admin kami.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Maaf, layanan konsultasi AI sedang tidak tersedia. Silakan hubungi WhatsApp kami." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] no-print">
      {isOpen ? (
        <div className="bg-white rounded-[2rem] shadow-2xl border border-emerald-100 w-[350px] md:w-[400px] h-[500px] flex flex-col overflow-hidden animate-scaleIn">
          <div className="bg-emerald-900 p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center font-bold">AI</div>
              <div>
                <h4 className="font-bold text-sm">Konsultan Berkah</h4>
                <p className="text-[10px] text-emerald-300 uppercase tracking-widest">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div className="flex-grow p-6 overflow-y-auto space-y-4 bg-emerald-50/30">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-emerald-900 text-white rounded-tr-none' 
                    : 'bg-white text-emerald-950 shadow-sm border border-emerald-50 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 rounded-tl-none flex gap-1">
                  <div className="w-2 h-2 bg-emerald-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-emerald-50 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Tanya tentang Umrah..."
              className="flex-grow px-4 py-3 rounded-xl bg-emerald-50 border-none outline-none text-sm font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="w-12 h-12 bg-emerald-900 text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-emerald-900 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full border-2 border-white animate-pulse"></div>
          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        </button>
      )}
    </div>
  );
};

export default AIConsultant;
