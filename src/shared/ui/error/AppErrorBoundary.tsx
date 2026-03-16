import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
  isReloading: boolean;
};

export const RELOAD_STORAGE_KEY = 'farm-flow:error-boundary:last-reload-at';
export const RELOAD_COOLDOWN_MS = 10_000;

export const canRecoverByReload = () => {
  const lastReloadAt = sessionStorage.getItem(RELOAD_STORAGE_KEY);

  if (!lastReloadAt) {
    return true;
  }

  const elapsed = Date.now() - Number(lastReloadAt);
  return Number.isFinite(elapsed) && elapsed > RELOAD_COOLDOWN_MS;
};

export const unregisterServiceWorkers = async () => {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(registrations.map((registration) => registration.unregister()));
};

export const clearCacheStorage = async () => {
  if (!('caches' in window)) {
    return;
  }

  const cacheKeys = await caches.keys();
  await Promise.allSettled(cacheKeys.map((cacheKey) => caches.delete(cacheKey)));
};

export const createReloadUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.set('__refresh', String(Date.now()));
  return url.toString();
};

export const recoverAppByReload = async () => {
  sessionStorage.setItem(RELOAD_STORAGE_KEY, String(Date.now()));
  await Promise.allSettled([unregisterServiceWorkers(), clearCacheStorage()]);
  window.location.replace(createReloadUrl());
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = {
    hasError: false,
    isReloading: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React error caught by AppErrorBoundary.', error, errorInfo);

    if (!canRecoverByReload()) {
      return;
    }

    this.setState({ isReloading: true }, () => {
      void recoverAppByReload();
    });
  }

  private handleManualReload = () => {
    sessionStorage.removeItem(RELOAD_STORAGE_KEY);
    this.setState({ isReloading: true }, () => {
      void recoverAppByReload();
    });
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center text-slate-700">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-slate-900">
            {this.state.isReloading ? '새 버전이 배포되었습니다.' : '문제가 발생했어요.'}
          </h1>
          <p className="text-sm leading-6 text-slate-500">
            {this.state.isReloading
              ? '페이지를 다시 불러옵니다.'
              : '새 버전이 배포된 직후 캐시 충돌로 오류가 날 수 있어요. 다시 불러오면 대부분 해결됩니다.'}
          </p>
        </div>
        {!this.state.isReloading ? (
          <button
            type="button"
            onClick={this.handleManualReload}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            다시 불러오기
          </button>
        ) : null}
      </div>
    );
  }
}
