import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, excerpt, image } = body;

        if (!title || !category || !excerpt) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'data', 'content.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        const newArticle = {
            id: Date.now().toString(),
            title,
            category,
            date: new Date().toISOString().split('T')[0],
            excerpt,
            image: image || null, // Add image field
        };

        if (!data.articles) {
            data.articles = [];
        }

        data.articles.unshift(newArticle); // Add to beginning

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, article: newArticle });
    } catch (error) {
        console.error('Failed to create article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
