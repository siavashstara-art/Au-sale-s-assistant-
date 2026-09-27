import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Unregister any stale dev-sw.js service workers in development preview to prevent caching/blank screen issues
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => {
      for (const registration of registrations) {
        if (
          import.meta.env.DEV ||
          registration.active?.scriptURL.includes('dev-sw')
        ) {
          registration.unregister();
        }
      }
    })
    .catch(() => {});
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMsg: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMsg: error?.message || 'خطای غیرمنتظره' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-xl font-extrabold text-emerald-900 mb-2">
            در حال بازنشانی خودکار صفحه...
          </h1>
          <p className="text-xs text-slate-600 mb-4">{this.state.errorMsg}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold cursor-pointer"
          >
            بارگذاری مجدد برنامه
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
);
