import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path: contentPath, value } = body;

        if (!contentPath || value === undefined) {
            return NextResponse.json({ error: 'Missing path or value' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'data', 'content.json');
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Update the data object based on the path (e.g., "home.hero.title")
        const keys = contentPath.split('.');
        let current = data;
        for (let i = 0; i < keys.length - 1; i++) {
            if (!current[keys[i]]) {
                current[keys[i]] = {};
            }
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;

        await fs.writeFile(filePath, JSON.stringify(data, null, 2));

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Failed to save content:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
