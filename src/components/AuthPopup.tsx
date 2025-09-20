'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function AuthPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const modal = isOpen ? (
    <div aria-modal="true" role="dialog" className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={() => setIsOpen(false)} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 text-white shadow-2xl">
        <button onClick={() => setIsOpen(false)} className="absolute right-3 top-3 rounded-full px-2 text-neutral-400 hover:text-neutral-200" aria-label="Close">✕</button>
        <h2 className="mb-6 text-center text-2xl font-semibold">Sign in to your D3VD account</h2>
        <div className="mb-4">
          <label className="mb-1 block text-sm text-neutral-300">Email</label>
          <input type="email" placeholder="Enter your email" className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label className="mb-1 block text-sm text-neutral-300">Password</label>
          <input type="password" placeholder="Enter your password" className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-neutral-100 outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col gap-3">
          <a href="/login" className="w-full rounded-lg bg-blue-600 py-2 text-center font-medium hover:bg-blue-700">Sign in</a>
          <a href="/signup" className="w-full rounded-lg bg-neutral-700 py-2 text-center hover:bg-neutral-600">Don't have an account? Sign up</a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Sign in</button>
      {mounted ? createPortal(modal, document.body) : null}
    </>
  );
}
