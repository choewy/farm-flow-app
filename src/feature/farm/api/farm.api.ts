import { FarmCreateRequestData, FarmCreateResponse, FarmListResponse, FarmUpdateRequestData } from './farm.type';

import { http } from '@app/shared/api';
import { Farm } from '@app/shared/models';

const get = async (id: string) => http.get<Farm>(`farms/${id}`);
const list = async () => http.get<FarmListResponse>('farms');
const create = async (data: FarmCreateRequestData) => http.post<FarmCreateResponse>('farms', data);
const update = async (id: string, data: FarmUpdateRequestData) => http.patch(`farms/${id}`, data);
const remove = async (id: string) => http.delete(`farms/${id}`);

export const farmApi = {
  get,
  list,
  create,
  update,
  remove,
};
