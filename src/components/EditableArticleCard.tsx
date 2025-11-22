'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEditMode } from '@/context/EditContext';
import { Trash2, Loader2 } from 'lucide-react';

interface EditableArticleCardProps {
    article: {
        id: string;
        title: string;
        category: string;
        date: string;
        excerpt: string;
        image?: string | null;
    };
}

export default function EditableArticleCard({ article }: EditableArticleCardProps) {
    const { isEditMode } = useEditMode();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent link navigation

        if (!confirm(`Are you sure you want to delete "${article.title}"?`)) {
            return;
        }

        setIsDeleting(true);

        try {
            const response = await fetch(`/api/articles/${article.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete article');
            }

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error deleting article:', error);
            alert('Failed to delete article');
            setIsDeleting(false);
        }
    };

    return (
        <Link href={`/blog/${article.id}`} className="group block relative">
            <div className="aspect-[4/3] bg-muted mb-4 relative overflow-hidden">
                {article.image ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                ) : null}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                {isEditMode && (
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 z-20"
                    >
                        {isDeleting ? (
                            <Loader2 size={18} className="animate-spin" />
                        ) : (
                            <Trash2 size={18} />
                        )}
                    </button>
                )}
            </div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {article.category}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
            </div>
            <h3 className="text-xl font-bold uppercase leading-tight group-hover:text-accent transition-colors">
                {article.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {article.excerpt}
            </p>
        </Link>
    );
}
