'use client';
import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <LayoutContext.Provider value={{ sidebarOpen, setSidebarOpen, isInputFocused, setIsInputFocused }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}
