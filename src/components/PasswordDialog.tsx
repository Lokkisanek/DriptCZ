'use client';

import React, { useState, FormEvent } from 'react';

interface PasswordDialogProps {
    onSubmit: (password: string) => void;
    onCancel: () => void;
}

export default function PasswordDialog({ onSubmit, onCancel }: PasswordDialogProps) {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit(password);
        setPassword('');
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-background border border-accent/20 rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Enter Edit Mode</h2>
                <p className="text-muted-foreground mb-6">
                    Please enter the password to enable edit mode.
                </p>
                
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-background border border-accent/30 rounded-lg focus:outline-none focus:border-accent transition-colors mb-4 text-foreground"
                        autoFocus
                    />
                    
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-background border border-accent/30 rounded-lg hover:bg-accent/10 transition-colors text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-semibold"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
