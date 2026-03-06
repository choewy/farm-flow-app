import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import { attendanceApi } from '@app/feature/attendance';
import { ROUTES } from '@app/shared/routes';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

export function ScanPage() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (isScanning || detectedCodes.length === 0) return;

    const qrCode = detectedCodes[0].rawValue;
    if (!qrCode) return;

    setIsScanning(true);

    // Choose Check In or Check Out based on user dialog or separate buttons on screen
    // For simplicity, we can ask the user
    try {
      const action = window.confirm('확인을 누르면 출근, 취소를 누르면 퇴근 처리됩니다.');
      if (action) {
        await attendanceApi.checkIn(qrCode);
        alert('출근 처리가 완료되었습니다.');
      } else {
        await attendanceApi.checkOut(qrCode);
        alert('퇴근 처리가 완료되었습니다.');
      }
      navigate(ROUTES.home);
    } catch (e) {
      const error = e as AxiosError;
      console.error(error);
      setError(JSON.stringify(error?.response?.data ?? '처리 중 오류가 발생했습니다.'));
      setTimeout(() => {
        setIsScanning(false);
        setError(null);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <div className="w-full bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800">QR 스캐너</h1>
          <p className="mt-2 text-sm text-slate-500">관리자 화면의 QR 코드를 스캔하세요</p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-square relative bg-slate-50 flex items-center justify-center border-2 border-[#8fcf72]/50">
          <Scanner
            onScan={handleScan}
            onError={(err) => console.error(err)}
            classNames={{
              container: 'w-full h-full object-cover',
            }}
          />
          {isScanning && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-10">
              <span className="text-white font-medium animate-pulse">처리 중...</span>
            </div>
          )}
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-2xl text-sm text-center">{error}</div>}

        <button
          onClick={() => navigate(ROUTES.home)}
          className="w-full py-4 px-4 text-base font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition"
        >
          돌아가기
        </button>
      </div>
    </div>
  );
}
