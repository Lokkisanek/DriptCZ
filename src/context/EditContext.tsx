'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import PasswordDialog from '@/components/PasswordDialog';

interface EditContextType {
    isEditMode: boolean;
    toggleEditMode: () => void;
}

const EditContext = createContext<EditContextType | undefined>(undefined);

// SHA-256 hash of "admin123"
const PASSWORD_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';

async function hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function EditProvider({ children }: { children: React.ReactNode }) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [showPasswordDialog, setShowPasswordDialog] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const attemptToggleEditMode = () => {
        if (isEditMode) {
            // If already in edit mode, just turn it off
            setIsEditMode(false);
        } else {
            // If not in edit mode, show password dialog
            setShowPasswordDialog(true);
            setPasswordError(false);
        }
    };

    const handlePasswordSubmit = async (password: string) => {
        const hash = await hashPassword(password);

        if (hash === PASSWORD_HASH) {
            setIsEditMode(true);
            setShowPasswordDialog(false);
            setPasswordError(false);
        } else {
            setPasswordError(true);
            // Show error for 2 seconds then allow retry
            setTimeout(() => setPasswordError(false), 2000);
        }
    };

    const handlePasswordCancel = () => {
        setShowPasswordDialog(false);
        setPasswordError(false);
    };

    // Toggle with Ctrl+E (or Cmd+E)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                attemptToggleEditMode();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isEditMode]);

    return (
        <EditContext.Provider value={{ isEditMode, toggleEditMode: attemptToggleEditMode }}>
            {children}
            {isEditMode && (
                <div className="fixed bottom-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest z-50 animate-pulse">
                    Edit Mode On
                </div>
            )}
            {showPasswordDialog && (
                <PasswordDialog
                    onSubmit={handlePasswordSubmit}
                    onCancel={handlePasswordCancel}
                />
            )}
            {passwordError && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold z-50 animate-pulse">
                    Incorrect password
                </div>
            )}
        </EditContext.Provider>
    );
}

export function useEditMode() {
    const context = useContext(EditContext);
    if (context === undefined) {
        throw new Error('useEditMode must be used within an EditProvider');
    }
    return context;
}
