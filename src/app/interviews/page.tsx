import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';
import AdminToolbar from '@/components/AdminToolbar';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function InterviewsPage() {
    const data = await getData();
    const { interviews = { title: 'INTERVIEWS', description: 'Street voices and artist stories.' } } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <EditableContent
                        path="interviews.title"
                        initialContent={interviews.title}
                        tag="h1"
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent"
                    />
                    <EditableContent
                        path="interviews.description"
                        initialContent={interviews.description}
                        tag="p"
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
                    />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Placeholder interview items */}
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="group cursor-pointer border border-muted p-6 hover:border-accent transition-colors">
                            <div className="aspect-video bg-muted relative overflow-hidden mb-4">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-4xl font-black uppercase">
                                    Interview {item}
                                </div>
                            </div>
                            <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Street Voice</p>
                            <h3 className="text-2xl font-bold uppercase mb-2 group-hover:text-accent transition-colors">
                                Interview with Artist #{item}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Exclusive conversation about underground culture and creative process.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <AdminToolbar />
        </div>
    );
}
