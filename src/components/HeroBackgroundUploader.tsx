'use client';

import React, { useState } from 'react';
import { useEditMode } from '@/context/EditContext';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

interface HeroBackgroundUploaderProps {
    currentBackground?: string | null;
}

export default function HeroBackgroundUploader({ currentBackground }: HeroBackgroundUploaderProps) {
    const { isEditMode } = useEditMode();
    const [isUploading, setIsUploading] = useState(false);

    if (!isEditMode) return null;

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            // Upload image
            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload image');
            }

            const uploadData = await uploadResponse.json();
            const imageUrl = uploadData.url;

            // Save to content.json
            const saveResponse = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: 'home.hero.background',
                    value: imageUrl,
                }),
            });

            if (!saveResponse.ok) {
                throw new Error('Failed to save background');
            }

            // Refresh page to show new background
            window.location.reload();
        } catch (error) {
            console.error('Error uploading background:', error);
            alert('Failed to upload background image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveBackground = async () => {
        if (!confirm('Remove background image?')) return;

        setIsUploading(true);

        try {
            const saveResponse = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: 'home.hero.background',
                    value: null,
                }),
            });

            if (!saveResponse.ok) {
                throw new Error('Failed to remove background');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error removing background:', error);
            alert('Failed to remove background');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="absolute top-4 left-4 z-20 flex gap-2">
            <label className="bg-accent/90 text-white px-3 py-2 rounded-lg font-bold text-sm hover:bg-accent transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50">
                {isUploading ? (
                    <>
                        <Loader2 size={16} className="animate-spin" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <ImageIcon size={16} />
                        Change Background
                    </>
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    className="hidden"
                />
            </label>

            {currentBackground && (
                <button
                    onClick={handleRemoveBackground}
                    disabled={isUploading}
                    className="bg-red-500/90 text-white px-3 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                    Remove
                </button>
            )}
        </div>
    );
}
