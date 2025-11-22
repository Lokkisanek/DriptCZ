'use client';

import React, { useState } from 'react';
import { useEditMode } from '@/context/EditContext';
import Link from 'next/link';
import { ArrowRight, Edit, X, Plus, GripVertical, Trash2 } from 'lucide-react';

interface ButtonStyle {
    background: string;
    text: string;
    hoverBg: string;
    hoverText: string;
    border: string;
}

interface HeroButton {
    id: string;
    text: string;
    url: string;
    icon: string;
    style: ButtonStyle;
}

interface HeroButtonsProps {
    buttons: HeroButton[];
}

export default function HeroButtons({ buttons: initialButtons }: HeroButtonsProps) {
    const { isEditMode } = useEditMode();
    const [buttons, setButtons] = useState(initialButtons);
    const [editingButton, setEditingButton] = useState<HeroButton | null>(null);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleSaveButtons = async (newButtons: HeroButton[]) => {
        try {
            const response = await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    path: 'home.hero.buttons',
                    value: newButtons,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to save buttons');
            }

            setButtons(newButtons);
        } catch (error) {
            console.error('Error saving buttons:', error);
            alert('Failed to save buttons');
        }
    };

    const handleAddButton = () => {
        const newButton: HeroButton = {
            id: Date.now().toString(),
            text: 'New Button',
            url: '#',
            icon: '',
            style: {
                background: 'bg-accent',
                text: 'text-white',
                hoverBg: 'hover:bg-accent/90',
                hoverText: '',
                border: '',
            },
        };
        const newButtons = [...buttons, newButton];
        handleSaveButtons(newButtons);
    };

    const handleDeleteButton = (id: string) => {
        const newButtons = buttons.filter((btn) => btn.id !== id);
        handleSaveButtons(newButtons);
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const newButtons = [...buttons];
        const draggedButton = newButtons[draggedIndex];
        newButtons.splice(draggedIndex, 1);
        newButtons.splice(index, 0, draggedButton);

        setButtons(newButtons);
        setDraggedIndex(index);
    };

    const handleDragEnd = () => {
        if (draggedIndex !== null) {
            handleSaveButtons(buttons);
        }
        setDraggedIndex(null);
    };

    const buildClassName = (style: ButtonStyle) => {
        return [
            'px-8 py-3 font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2',
            style.background,
            style.text,
            style.hoverBg,
            style.hoverText,
            style.border,
        ]
            .filter(Boolean)
            .join(' ');
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {buttons.map((button, index) => (
                    <div key={button.id} className="relative group" draggable={isEditMode} onDragStart={() => handleDragStart(index)} onDragOver={(e) => handleDragOver(e, index)} onDragEnd={handleDragEnd}>
                        <Link href={button.url} className={buildClassName(button.style)}>
                            {button.text}
                            {button.icon === 'arrow' && <ArrowRight size={16} />}
                        </Link>

                        {isEditMode && (
                            <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <button
                                    onClick={() => setEditingButton(button)}
                                    className="bg-accent text-white p-1 rounded hover:bg-accent/90"
                                >
                                    <Edit size={14} />
                                </button>
                                <button
                                    onClick={() => handleDeleteButton(button.id)}
                                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <div className="bg-muted text-white p-1 rounded cursor-move">
                                    <GripVertical size={14} />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isEditMode && (
                    <button
                        onClick={handleAddButton}
                        className="px-8 py-3 border-2 border-dashed border-accent/50 hover:border-accent transition-colors flex items-center justify-center gap-2 text-accent"
                    >
                        <Plus size={16} />
                        Add Button
                    </button>
                )}
            </div>

            {editingButton && (
                <ButtonEditModal
                    button={editingButton}
                    onClose={() => setEditingButton(null)}
                    onSave={(updatedButton) => {
                        const newButtons = buttons.map((btn) =>
                            btn.id === updatedButton.id ? updatedButton : btn
                        );
                        handleSaveButtons(newButtons);
                        setEditingButton(null);
                    }}
                />
            )}
        </>
    );
}

interface ButtonEditModalProps {
    button: HeroButton;
    onClose: () => void;
    onSave: (button: HeroButton) => void;
}

function ButtonEditModal({ button, onClose, onSave }: ButtonEditModalProps) {
    const [editedButton, setEditedButton] = useState({ ...button });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedButton);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-background border border-accent/20 rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">Edit Button</h2>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Text */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Button Text
                        </label>
                        <input
                            type="text"
                            value={editedButton.text}
                            onChange={(e) => setEditedButton({ ...editedButton, text: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                        />
                    </div>

                    {/* URL */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            URL
                        </label>
                        <input
                            type="text"
                            value={editedButton.url}
                            onChange={(e) => setEditedButton({ ...editedButton, url: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                        />
                    </div>

                    {/* Icon */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-foreground">
                            Icon
                        </label>
                        <select
                            value={editedButton.icon}
                            onChange={(e) => setEditedButton({ ...editedButton, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground"
                        >
                            <option value="">No Icon</option>
                            <option value="arrow">Arrow</option>
                        </select>
                    </div>

                    {/* Style Section */}
                    <div className="border-t border-accent/20 pt-6 mt-6">
                        <h3 className="text-lg font-bold mb-4 text-foreground">Button Style</h3>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                                    Background (e.g., bg-white, bg-accent)
                                </label>
                                <input
                                    type="text"
                                    value={editedButton.style.background}
                                    onChange={(e) =>
                                        setEditedButton({
                                            ...editedButton,
                                            style: { ...editedButton.style, background: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                                    Text Color (e.g., text-white, text-black)
                                </label>
                                <input
                                    type="text"
                                    value={editedButton.style.text}
                                    onChange={(e) =>
                                        setEditedButton({
                                            ...editedButton,
                                            style: { ...editedButton.style, text: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                                    Hover Background (e.g., hover:bg-accent)
                                </label>
                                <input
                                    type="text"
                                    value={editedButton.style.hoverBg}
                                    onChange={(e) =>
                                        setEditedButton({
                                            ...editedButton,
                                            style: { ...editedButton.style, hoverBg: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                                    Hover Text Color (e.g., hover:text-white)
                                </label>
                                <input
                                    type="text"
                                    value={editedButton.style.hoverText}
                                    onChange={(e) =>
                                        setEditedButton({
                                            ...editedButton,
                                            style: { ...editedButton.style, hoverText: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                                    Border (e.g., border border-white)
                                </label>
                                <input
                                    type="text"
                                    value={editedButton.style.border}
                                    onChange={(e) =>
                                        setEditedButton({
                                            ...editedButton,
                                            style: { ...editedButton.style, border: e.target.value },
                                        })
                                    }
                                    className="w-full px-4 py-2 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors text-foreground text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-background border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
