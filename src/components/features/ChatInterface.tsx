'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useRef, useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AudioRecorder } from './AudioRecorder';
import { cn } from '@/lib/utils';

export function ChatInterface() {
    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat/send',
        }),
    });
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleTranscription = (text: string) => {
        setInput((prev: string) => (prev ? `${prev} ${text}` : text));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && status === 'ready') {
            sendMessage({ text: input });
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-md mx-auto bg-gray-50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                            m.role === 'user'
                                ? "ml-auto bg-primary text-primary-foreground"
                                : "bg-muted"
                        )}
                    >
                        {m.parts.map((part, index) =>
                            part.type === 'text' ? (
                                <span key={index}>{part.text}</span>
                            ) : null
                        )}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 pb-safe-area">
                <div className="max-w-md mx-auto flex items-end gap-2">
                    <AudioRecorder onTranscriptionComplete={handleTranscription} />

                    <form onSubmit={handleSubmit} className="flex-1 flex gap-2 items-center">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe o habla..."
                            className="min-h-[44px] text-base"
                            disabled={status !== 'ready'}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-11 w-11 shrink-0"
                            disabled={status !== 'ready'}
                        >
                            <Send className="h-5 w-5" />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
