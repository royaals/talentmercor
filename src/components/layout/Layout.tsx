
import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TalentMercor. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
