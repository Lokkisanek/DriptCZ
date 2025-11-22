'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useEditMode } from '@/context/EditContext';
import { cn } from '@/lib/utils'; // We need to create this utility or import clsx/tailwind-merge directly

interface EditableContentProps {
    path: string;
    initialContent: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
    className?: string;
    multiline?: boolean;
}

export default function EditableContent({
    path,
    initialContent,
    tag = 'p',
    className,
    multiline = false,
}: EditableContentProps) {
    const { isEditMode } = useEditMode();
    const [content, setContent] = useState(initialContent);
    const [isSaving, setIsSaving] = useState(false);
    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    const handleBlur = async () => {
        if (!elementRef.current) return;

        const newContent = elementRef.current.innerText;
        if (newContent === content) return;

        setContent(newContent);
        setIsSaving(true);

        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path, value: newContent }),
            });

            if (!response.ok) {
                throw new Error('Failed to save');
            }
        } catch (error) {
            console.error('Error saving content:', error);
            // Revert on error? Or just show error state?
        } finally {
            setIsSaving(false);
        }
    };

    const Tag = tag as any;

    return (
        <Tag
            ref={elementRef}
            contentEditable={isEditMode}
            onBlur={handleBlur}
            className={cn(
                className,
                isEditMode && "outline-dashed outline-1 outline-accent/50 hover:outline-accent cursor-text transition-all",
                isSaving && "opacity-50"
            )}
            suppressContentEditableWarning={true}
        >
            {content}
        </Tag>
    );
}
