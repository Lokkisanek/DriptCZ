import fs from 'fs/promises';
import path from 'path';
import EditableArticleCard from '@/components/EditableArticleCard';
import AdminToolbar from '@/components/AdminToolbar';

async function getData() {
    const filePath = path.join(process.cwd(), 'data', 'content.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function BlogPage() {
    const data = await getData();
    const { articles = [] } = data;

    return (
        <div className="min-h-screen py-24 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-4 text-accent">
                        BLOG
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
                        Articles, stories, and insights from the underground.
                    </p>
                </header>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((article: any) => (
                            <EditableArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 text-muted-foreground">
                        <p>No articles yet. Add your first post in edit mode!</p>
                    </div>
                )}
            </div>
            <AdminToolbar />
        </div>
    );
}
