import { InvitationCreateRequestData, InvitationValidateRequestData, InvitationValidateResponse } from './invitation.types';

import { http } from '@app/shared/api';

const create = async (data: InvitationCreateRequestData) => http.post<void>('invitations', data);
const validate = async (data: InvitationValidateRequestData) => http.post<InvitationValidateResponse>('invitations/validate', data);

export const invitationApi = { create, validate };
