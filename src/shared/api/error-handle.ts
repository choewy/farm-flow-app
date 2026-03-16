import { AxiosError } from 'axios';

import { ErrorCode } from './error-code';
import { ErrorResponse } from './types';

const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.WrongEmailOrPassword]: '이메일 또는 비밀번호가 잘못되었습니다.',
  [ErrorCode.DuplicatedEmail]: '이미 존재하는 이메일 계정입니다.',
  [ErrorCode.InvalidToken]: '유효하지 않은 토큰입니다.',
  [ErrorCode.ExpiredToken]: '토큰이 만료되었습니다.',
  [ErrorCode.InvalidQrCode]: '유효하지 않은 QR 코드입니다.',
  [ErrorCode.ExceedFarmCount]: '농장 최대 생성 개수를 초과하였습니다.',
  [ErrorCode.FarmNotFound]: '농장 정보를 찾을 수 없습니다.',
  [ErrorCode.InvalidInvitationCode]: '유효하지 않은 초대코드입니다.',
  [ErrorCode.ForbiddenPermission]: '접근 권한이 없습니다.',
  [ErrorCode.RoleProtected]: '수정 또는 삭제가 불가능한 역할입니다.',
  [ErrorCode.RoleNotFound]: '역할을 찾을 수 없습니다.',
  [ErrorCode.InvitationDuplicated]: '이미 농장의 소속이 되어있는 이메일입니다.',
  [ErrorCode.MemberNotFound]: '멤버를 찾을 수 없습니다.',
  [ErrorCode.MemberProtected]: '수정 또는 삭제가 불가능한 멤버입니다.',
};

export function getErrorCodeMessage(e: unknown) {
  if (e instanceof AxiosError === false) {
    return 'unknown error';
  }

  const data = e?.response?.data as ErrorResponse;

  if (!data) {
    return e.message;
  }

  return errorMessages[data.errorCode];
}
