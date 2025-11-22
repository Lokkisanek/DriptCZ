import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: 'Missing article ID' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'data', 'content.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        if (!data.articles) {
            return NextResponse.json({ error: 'No articles found' }, { status: 404 });
        }

        // Find and remove the article
        const initialLength = data.articles.length;
        data.articles = data.articles.filter((article: any) => article.id !== id);

        if (data.articles.length === initialLength) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
