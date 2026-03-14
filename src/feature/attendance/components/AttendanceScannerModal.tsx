import { useState } from 'react';
import { X } from 'lucide-react';

import { attendanceApi } from '../api';

import { getErrorCodeMessage } from '@app/shared/api';
import { Toast } from '@app/shared/toast';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';

type AttendanceScannerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: 'in' | 'out';
  onSuccess: () => void;
};

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
        Toast.success('출근 처리가 완료되었습니다.');
      } else {
        await attendanceApi.checkOut(qrCode);
        Toast.success('퇴근 처리가 완료되었습니다.');
      }
      onSuccess();
      onClose();
    } catch (e) {
      Toast.error(getErrorCodeMessage(e));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex flex-col bg-slate-50">
      <header className="flex items-center justify-between p-4 bg-white border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800">QR {type === 'in' ? '출근' : '퇴근'} 스캔</h2>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500">지정된 QR 코드를 카메라 화면에 맞춰주세요</p>
        </div>

        <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden relative bg-slate-100 border border-slate-200 shadow-sm">
          <Scanner
            onScan={handleScan}
            onError={(e) => {
              const getErrorMessage = (e: unknown) => {
                if (e instanceof DOMException) {
                  switch (e.name) {
                    case 'NotAllowedError':
                      return '카메라 권한이 차단되어 있습니다. Safari 설정에서 카메라 권한을 허용해주세요.';
                    case 'NotFoundError':
                      return '사용 가능한 카메라를 찾지 못했습니다.';
                    case 'NotReadableError':
                      return '카메라를 다른 앱이 사용 중일 수 있습니다.';
                    case 'OverconstrainedError':
                      return '카메라 설정이 기기와 맞지 않습니다.';
                    default:
                      return `${e.name}: ${e.message}`;
                  }
                }

                if (e instanceof Error) {
                  return e.message;
                }

                return '카메라 초기화 중 오류가 발생했습니다.';
              };

              setError(getErrorMessage(e));
              Toast.error(getErrorMessage(e));
            }}
            constraints={{
              facingMode: { ideal: 'environment' },
            }}
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
