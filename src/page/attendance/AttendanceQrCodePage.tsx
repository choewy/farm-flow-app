import { useEffect, useRef, useState } from 'react';
import { QrCode, RefreshCw, Smartphone } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

import { API_BASE_URL } from '@app/config';
import { attendanceQrApi } from '@app/feature/attendance-qr';
import { useSse } from '@app/shared/api';
import { useAuthStore } from '@app/shared/stores';

export default function AttendanceQrCodePage() {
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
      setSeconds((prev) => prev - 1);
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
    if (!deviceId || !data?.id || seconds > 0) {
      return;
    }

    createQr();
  }, [seconds, deviceId, data?.id]);

  const progress = `${(Math.min(seconds, 59) / 59) * 100}%`;

  return (
    <div className="app-page app-page-centered items-center">
      <div className="app-panel w-full px-5 py-5">
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-primary/10 text-primary">
              <QrCode size={26} />
            </div>
            <h1 className="mt-4 text-[1.45rem] font-black tracking-[-0.04em] text-slate-800">출퇴근 QR</h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <span className="app-chip app-chip-primary">
              <Smartphone size={14} />
              모바일 스캔 전용
            </span>
            <span className="app-chip">
              <RefreshCw size={14} />
              1분마다 자동 갱신
            </span>
          </div>

          <div className="rounded-4xl border border-[rgba(148,163,184,0.16)] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
            <div className="rounded-3xl bg-[linear-gradient(180deg,#f8fdff_0%,#edf7ff_100%)] p-4">
              {data?.id ? (
                <QRCodeCanvas value={data.id} size={220} level="H" marginSize={3} className="rounded-xl" />
              ) : (
                <div className="flex h-55 w-55 items-center justify-center rounded-[1.35rem] border border-slate-200 bg-white text-sm text-slate-400 animate-pulse">
                  QR 로딩 중...
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>다음 갱신까지</span>
              <span>{seconds < 0 ? 0 : seconds}초</span>
            </div>
            <div className="app-progress mt-2">
              <div className="app-progress-bar" style={{ width: progress }} />
            </div>
          </div>

          <div className="app-note w-full">
            <p className="text-sm font-semibold text-slate-700">화면을 켠 상태로 유지해 주세요.</p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-slate-500">
              코드가 자동으로 새로 발급되므로 직원이 순서대로 스캔하기에 적합한 화면입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
