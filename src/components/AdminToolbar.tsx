'use client';

import React, { useState } from 'react';
import { useEditMode } from '@/context/EditContext';
import { Plus, Image } from 'lucide-react';
import AddPostModal from './AddPostModal';

export default function AdminToolbar() {
    const { isEditMode } = useEditMode();
    const [showAddPostModal, setShowAddPostModal] = useState(false);

    if (!isEditMode) return null;

    return (
        <>
            <div className="fixed bottom-4 left-4 z-50 flex gap-2">
                <button
                    onClick={() => setShowAddPostModal(true)}
                    className="bg-accent text-white px-4 py-3 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-accent/90 transition-colors flex items-center gap-2 shadow-lg"
                >
                    <Plus size={18} />
                    Add Post
                </button>
            </div>

            {showAddPostModal && (
                <AddPostModal onClose={() => setShowAddPostModal(false)} />
            )}
        </>
    );
}
