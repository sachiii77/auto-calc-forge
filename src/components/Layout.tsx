
import React from 'react';
import { Navigation } from './Navigation';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <footer className="text-center p-4">
        © 2024 CalcForge. All Rights Reserved.
      </footer>
    </>
  );
};

export default Layout;
