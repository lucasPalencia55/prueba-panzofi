import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import config from './config/config';
import ProtectedRoute from './components/authentication/protected-route';
import { RouterListener } from './components/router-listener/router-listener';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <RouterListener>
      <div className="flex-col flex-1 flex h-full">
        <main className="flex-1 grow">
          <div className="max-w-7xl mx-auto my-4 px-4 sm:px-6 md:px-8 text-black dark:text-zinc-300">
            <Routes>
              {config.routes.map(({ path, element, isPrivate, role }, index) => (
                <Route key={index} path={path} element={<ProtectedRoute isPrivate={isPrivate} element={element} role={role} />} />
              ))}
            </Routes>
          </div>
        </main>
      </div>
    </RouterListener>
  </Router>
);