import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const base64Audio = Buffer.from(arrayBuffer).toString('base64');

        const { text } = await generateText({
            model: google('gemini-2.5-flash'),
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Transcribe el siguiente audio exactamente como suena.' },
                        {
                            type: 'file',
                            data: base64Audio,
                            mediaType: file.type || 'audio/webm',
                        },
                    ],
                },
            ],
        });

        return NextResponse.json({ text });
    } catch (error) {
        console.error('Gemini Transcription Error:', error);
        return NextResponse.json(
            { error: 'Error processing audio' },
            { status: 500 }
        );
    }
}
