import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';
import AdminToolbar from '@/components/AdminToolbar';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function EventsPage() {
    const data = await getData();
    const { events = { title: 'EVENTS', description: 'Underground happenings and street culture events.' } } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <EditableContent
                        path="events.title"
                        initialContent={events.title}
                        tag="h1"
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent"
                    />
                    <EditableContent
                        path="events.description"
                        initialContent={events.description}
                        tag="p"
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
                    />
                </header>

                {/* Events Calendar */}
                <div className="space-y-6">
                    {[
                        { date: '27 NOV', title: 'Underground Rave', location: 'Secret Location' },
                        { date: '03 DEC', title: 'Street Art Exhibition', location: 'Praha Gallery' },
                        { date: '10 DEC', title: 'Fashion Show', location: 'Warehouse District' },
                        { date: '15 DEC', title: 'Music Festival', location: 'TBA' },
                    ].map((event, index) => (
                        <div key={index} className="flex gap-6 border-l-4 border-accent pl-6 py-4 hover:bg-muted/20 transition-colors cursor-pointer">
                            <div className="flex-shrink-0">
                                <div className="text-4xl font-black leading-none">{event.date.split(' ')[0]}</div>
                                <div className="text-sm font-bold text-accent uppercase">{event.date.split(' ')[1]}</div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold uppercase mb-1">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">{event.location}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AdminToolbar />
        </div>
    );
}
