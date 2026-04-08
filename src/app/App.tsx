import React, { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import FlowCanvas from './components/flow/FlowCanvas';
import SolutionManagementPage from './components/solution/SolutionManagementPage';
import './globals.css';

type Page = 'solution' | 'canvas';

const App = () => {
  const [page, setPage] = useState<Page>('solution');

  return (
    <ThemeProvider attribute="class" forcedTheme="light">
      <div className="w-screen h-screen overflow-hidden">
        {page === 'solution' ? (
          <SolutionManagementPage onEnterCanvas={() => setPage('canvas')} />
        ) : (
          <FlowCanvas onBack={() => setPage('solution')} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
