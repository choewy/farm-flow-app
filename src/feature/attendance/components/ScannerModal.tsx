import { useState } from 'react';
import { AxiosError } from 'axios';
import { X } from 'lucide-react';

import { attendanceApi } from '../api';

import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

interface AttendanceScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'in' | 'out';
  onSuccess: () => void;
}

export function AttendanceScannerModal({ isOpen, onClose, type, onSuccess }: AttendanceScannerModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
    if (isProcessing || detectedCodes.length === 0) {
      return;
    }

    const qrCode = detectedCodes[0].rawValue;

    if (!qrCode) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      if (type === 'in') {
        await attendanceApi.checkIn(qrCode);
        alert('출근 처리가 완료되었습니다.');
      } else {
        await attendanceApi.checkOut(qrCode);
        alert('퇴근 처리가 완료되었습니다.');
      }
      onSuccess();
      onClose();
    } catch (e) {
      const error = e as AxiosError;
      console.error(e);
      setError(JSON.stringify(error?.response?.data ?? '처리 중 오류가 발생했습니다.'));
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-white">
      <header className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold">QR {type === 'in' ? '출근' : '퇴근'} 스캔</h2>
        <button onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-center">
          <p className="text-slate-500">관리자 화면의 QR 코드를 스캔하세요</p>
        </div>

        <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden relative bg-slate-50 border-2 border-[#8fcf72]/50">
          <Scanner
            onScan={handleScan}
            onError={(err) => console.error(err)}
            classNames={{
              container: 'w-full h-full object-cover',
            }}
          />
          {isProcessing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm z-10">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white font-medium">처리 중...</span>
              </div>
            </div>
          )}
        </div>

        {error && <div className="w-full max-w-sm bg-red-50 text-red-600 p-4 rounded-2xl text-sm text-center">{error}</div>}

        <div className="pt-4">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-slate-100 text-slate-600 font-semibold rounded-2xl hover:bg-slate-200 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
