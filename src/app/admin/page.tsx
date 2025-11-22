'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        category: 'Fashion',
        excerpt: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to create article');

            setStatus('success');
            setFormData({ title: '', category: 'Fashion', excerpt: '' });
            setTimeout(() => {
                router.push('/');
                router.refresh();
            }, 1500);
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-muted/20 p-8 border border-muted backdrop-blur-sm">
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-8 text-center">New Drop</h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-black border border-muted p-3 text-white focus:border-accent focus:outline-none transition-colors"
                            placeholder="ENTER TITLE"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Category</label>
                        <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full bg-black border border-muted p-3 text-white focus:border-accent focus:outline-none transition-colors appearance-none"
                        >
                            <option value="Fashion">Fashion</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Events">Events</option>
                            <option value="Blog">Blog</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">Excerpt</label>
                        <textarea
                            required
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full bg-black border border-muted p-3 text-white focus:border-accent focus:outline-none transition-colors min-h-[100px]"
                            placeholder="BRIEF DESCRIPTION..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-white text-black font-bold uppercase tracking-widest py-4 hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
                    >
                        {status === 'loading' ? 'DROPPING...' : 'DROP CONTENT'}
                    </button>

                    {status === 'success' && (
                        <p className="text-green-500 text-center text-sm font-bold uppercase tracking-wider">Content Dropped Successfully</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-500 text-center text-sm font-bold uppercase tracking-wider">Drop Failed</p>
                    )}
                </form>
            </div>
        </div>
    );
}
