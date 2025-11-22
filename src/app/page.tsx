import fs from 'fs/promises';
import path from 'path';
import EditableContent from '@/components/EditableContent';
import EditableArticleCard from '@/components/EditableArticleCard';
import AdminToolbar from '@/components/AdminToolbar';
import HeroBackgroundUploader from '@/components/HeroBackgroundUploader';
import HeroButtons from '@/components/HeroButtons';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'content.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}

export default async function Home() {
  const data = await getData();
  const { home } = data;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-muted">
        {/* Background Image or Default */}
        {home.hero.background ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${home.hero.background})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-[url('/placeholder-noise.png')] opacity-10 pointer-events-none"></div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none"></div>

        {/* Background Upload Control */}
        <HeroBackgroundUploader currentBackground={home.hero.background} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <EditableContent
            path="home.hero.title"
            initialContent={home.hero.title}
            tag="h1"
            className="text-6xl md:text-9xl font-black tracking-tighter mb-4 glitch-effect"
          />
          <EditableContent
            path="home.hero.subtitle"
            initialContent={home.hero.subtitle}
            tag="h2"
            className="text-xl md:text-2xl font-bold uppercase tracking-[0.5em] text-accent mb-8"
          />
          <EditableContent
            path="home.hero.description"
            initialContent={home.hero.description}
            tag="p"
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          />

          <HeroButtons buttons={home.hero.buttons || []} />
        </div>
      </section>

      {/* Spotlight Section */}
      <section className="py-24 px-4 border-b border-muted">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-muted relative overflow-hidden group">
              {/* Placeholder for artist image */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 text-9xl font-black uppercase rotate-12 group-hover:scale-110 transition-transform duration-700">
                Spotlight
              </div>
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay"></div>
            </div>
            <div>
              <EditableContent
                path="home.spotlight.title"
                initialContent={home.spotlight.title}
                tag="h3"
                className="text-sm font-bold uppercase tracking-widest text-accent mb-2"
              />
              <EditableContent
                path="home.spotlight.artist"
                initialContent={home.spotlight.artist}
                tag="h2"
                className="text-4xl md:text-6xl font-black tracking-tighter mb-6"
              />
              <EditableContent
                path="home.spotlight.description"
                initialContent={home.spotlight.description}
                tag="p"
                className="text-lg text-muted-foreground mb-8"
              />
              <Link href="/music" className="inline-flex items-center gap-2 text-white border-b border-accent pb-1 hover:text-accent transition-colors uppercase tracking-wider font-bold text-sm">
                Read Full Interview <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Preview */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12">LATEST DROPS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.articles.map((article: any) => (
              <EditableArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <AdminToolbar />
    </div>
  );
}
