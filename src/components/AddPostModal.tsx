'use client';

import React, { useState, FormEvent } from 'react';
import { X, Upload, Loader2 } from 'lucide-react';

interface AddPostModalProps {
    onClose: () => void;
}

export default function AddPostModal({ onClose }: AddPostModalProps) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Events');
    const [excerpt, setExcerpt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let imageUrl = null;

            // Upload image if provided
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload image');
                }

                const uploadData = await uploadResponse.json();
                imageUrl = uploadData.url;
            }

            // Create article
            const response = await fetch('/api/articles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    category,
                    excerpt,
                    image: imageUrl,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create article');
            }

            // Refresh the page to show new article
            window.location.reload();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-accent/20 rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-foreground">Add New Post</h2>
                    <button
                        onClick={onClose}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                            placeholder="Enter post title..."
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                        >
                            <option value="Events">Events</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Interviews">Interviews</option>
                        </select>
                    </div>

                    {/* Excerpt */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Excerpt
                        </label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            required
                            rows={3}
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground resize-none"
                            placeholder="Brief description..."
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Cover Image (Optional)
                        </label>
                        <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center hover:border-accent/50 transition-colors">
                            {imagePreview ? (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="max-h-48 mx-auto rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setImageFile(null);
                                            setImagePreview(null);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <label className="cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <Upload className="mx-auto mb-2 text-muted-foreground" size={32} />
                                    <p className="text-sm text-muted-foreground">
                                        Click to upload image
                                    </p>
                                </label>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-3 bg-background border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors text-foreground disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Post'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
