import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';
import AdminToolbar from '@/components/AdminToolbar';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function MusicPage() {
    const data = await getData();
    const { music } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <EditableContent
                        path="music.title"
                        initialContent={music.title}
                        tag="h1"
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent"
                    />
                    <EditableContent
                        path="music.description"
                        initialContent={music.description}
                        tag="p"
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
                    />
                </header>

                {/* Playlists Section */}
                <section className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">PLAYLISTS</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="group cursor-pointer">
                                <div className="aspect-square bg-muted relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 bg-accent/20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-black">
                                        ♫
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold uppercase group-hover:text-accent transition-colors">
                                    Underground Mix {item}
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">15 tracks</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reviews Section */}
                <section>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8">REVIEWS</h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="border-b border-muted pb-6 hover:border-accent transition-colors cursor-pointer">
                                <div className="flex gap-6">
                                    <div className="w-24 h-24 bg-muted flex-shrink-0"></div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Album Review</p>
                                        <h3 className="text-2xl font-bold uppercase mb-2">Album Title {item}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Deep dive into the latest underground release...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
            <AdminToolbar />
        </div>
    );
}
