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
    <div>
      {data?.id && <QRCodeCanvas value={data.id} />}
      <div>{data?.id ?? '-'}</div>
      <div>{seconds}</div>
    </div>
  );
}
