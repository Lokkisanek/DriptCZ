import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';
import AdminToolbar from '@/components/AdminToolbar';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function ArtPage() {
    const data = await getData();
    const { art } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <EditableContent
                        path="art.title"
                        initialContent={art.title}
                        tag="h1"
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent"
                    />
                    <EditableContent
                        path="art.description"
                        initialContent={art.description}
                        tag="p"
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
                    />
                </header>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                        <div key={item} className="group cursor-pointer aspect-square bg-muted relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5"></div>
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-4xl font-black">
                                {item}
                            </div>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white font-bold uppercase tracking-wider text-sm">
                                    Artwork {item}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AdminToolbar />
        </div>
    );
}
