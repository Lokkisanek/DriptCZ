import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function FashionPage() {
    const data = await getData();
    const { fashion } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <EditableContent
                        path="fashion.title"
                        initialContent={fashion.title}
                        tag="h1"
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent"
                    />
                    <EditableContent
                        path="fashion.description"
                        initialContent={fashion.description}
                        tag="p"
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
                    />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Placeholders for fashion content */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div key={item} className="group cursor-pointer">
                            <div className="aspect-[3/4] bg-muted relative overflow-hidden mb-4">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">Outfit {item}</span>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold uppercase">Street Style: Prague {item}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
