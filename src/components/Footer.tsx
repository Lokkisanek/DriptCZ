import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-muted mt-auto py-12 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-bold uppercase tracking-wider mb-4">Dript.</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            The underground pulse. Syrový pohled na to, co se děje v ulicích.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">Explore</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/fashion" className="hover:text-foreground transition-colors">Fashion</Link></li>
                            <li><Link href="/music" className="hover:text-foreground transition-colors">Music</Link></li>
                            <li><Link href="/art" className="hover:text-foreground transition-colors">Art</Link></li>
                            <li><Link href="/events" className="hover:text-foreground transition-colors">Events</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-accent">Connect</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-foreground transition-colors">Newsletter</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-muted pt-8 text-center text-xs text-muted-foreground uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Dript Platform. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
