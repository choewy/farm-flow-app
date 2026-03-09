import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

import { API_BASE_URL } from '@app/config';
import { attendanceQrApi } from '@app/feature/attendance-qr';
import { useSse } from '@app/shared/api';
import { useAuthStore } from '@app/shared/stores';

export function AttendanceQrCodePage() {
  const { deviceId } = useAuthStore();
  const [seconds, setSeconds] = useState<number>(60);
  const data = useSse<{ id: string }>(`${API_BASE_URL}/attendances/qr/${deviceId}`);

  const creatingRef = useRef(false);
  const createQr = async () => {
    if (!deviceId || creatingRef.current) {
      return;
    }

    creatingRef.current = true;

    try {
      await attendanceQrApi.create(deviceId);
      setSeconds(59);
    } finally {
      creatingRef.current = false;
    }
  };

  useEffect(() => {
    if (!deviceId || data?.id) {
      return;
    }

    creatingRef.current = false;
    setSeconds(59);
    const timeout = setTimeout(() => createQr(), 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [deviceId, data?.id]);

  useEffect(() => {
    if (!data?.id) {
      return;
    }

    setSeconds(59);
  }, [data?.id]);

  useEffect(() => {
    if (!deviceId || !data?.id) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [deviceId, data?.id]);

  useEffect(() => {
    if (!deviceId || !data?.id || seconds !== 0) {
      return;
    }

    createQr();
  }, [seconds, deviceId, data?.id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-8 flex flex-col items-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">출퇴근 QR</h1>
          <p className="text-sm text-slate-500">앱 스캐너를 통해 아래 코드를 스캔하세요</p>
        </div>

        <div className="bg-white p-4 rounded-2xl shadow-inner border border-slate-100">
          {data?.id ? (
            <QRCodeCanvas value={data.id} size={220} level="H" includeMargin={true} className="rounded-2xl" />
          ) : (
            <div className="w-55 h-55 flex items-center justify-center bg-slate-50 rounded-2xl text-slate-400 animate-pulse text-sm">
              QR 로딩 중...
            </div>
          )}
        </div>

        <div className="w-full text-center">
          <div className="inline-flex items-center space-x-2 bg-primary-light text-primary-dark px-5 py-2.5 rounded-full font-semibold text-sm shadow-sm">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{seconds}초 후 갱신됨</span>
          </div>
        </div>

        <div className="text-xs font-mono text-slate-400 truncate w-full text-center">ID: {data?.id ?? '대기 중...'}</div>
      </div>
    </div>
  );
}
