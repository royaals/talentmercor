


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { useCandidates } from '@/context/CandidateContext';

export default function Header() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  const { selectedCandidates } = useCandidates();
  
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 font-bold text-xl text-mercor-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span onClick={() => navigate('/')} className="cursor-pointer">TalentMercor</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <div 
            onClick={() => navigate('/')} 
            className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          >
            Dashboard
          </div>
          <div 
            onClick={() => navigate('/upload')} 
            className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          >
            Upload Data
          </div>
          <div 
            onClick={() => navigate('/team')}
            className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
          >
            My Team ({selectedCandidates.length}/5)
          </div>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
