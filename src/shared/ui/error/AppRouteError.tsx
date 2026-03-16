import { useEffect, useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { canRecoverByReload, recoverAppByReload, RELOAD_STORAGE_KEY } from './AppErrorBoundary';

const getErrorMessage = (error: unknown) => {
  if (isRouteErrorResponse(error)) {
    return error.statusText || '라우트 로딩 중 오류가 발생했어요.';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return '새 버전 배포 직후 캐시 충돌로 화면을 불러오지 못했을 수 있어요.';
};

export function AppRouteError() {
  const error = useRouteError();
  const [isReloading, setIsReloading] = useState(() => canRecoverByReload());

  useEffect(() => {
    console.error('Unhandled route error caught by AppRouteError.', error);

    if (!isReloading) {
      return;
    }

    void recoverAppByReload();
  }, [error, isReloading]);

  const handleManualReload = () => {
    sessionStorage.removeItem(RELOAD_STORAGE_KEY);
    setIsReloading(true);
    void recoverAppByReload();
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-white px-6 text-center text-slate-700">
      <div className="space-y-2">
        <h1 className="text-xl font-semibold text-slate-900">
          {isReloading ? '새 버전이 배포되었습니다.' : '페이지를 불러오지 못했어요.'}
        </h1>
        <p className="text-sm leading-6 text-slate-500">{isReloading ? '페이지를 다시 불러옵니다.' : getErrorMessage(error)}</p>
      </div>
      {!isReloading ? (
        <button type="button" onClick={handleManualReload} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          다시 불러오기
        </button>
      ) : null}
    </div>
  );
}
