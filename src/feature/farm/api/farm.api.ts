import { FarmCreateRequestData, FarmCreateResponse, FarmListResponse, FarmUpdateRequestData } from './farm.type';

import { http } from '@app/shared/api';

const list = async () => http.get<FarmListResponse>('farms');
const create = async (data: FarmCreateRequestData) => http.post<FarmCreateResponse>('farms', data);
const update = async (id: string, data: FarmUpdateRequestData) => http.patch(`farms/${id}`, data);
const remove = async (id: string) => http.delete(`farms/${id}`);

export const farmApi = {
  list,
  create,
  update,
  remove,
};
