import { ListResponse } from '@app/shared/api';
import { Farm } from '@app/shared/models';

export type FarmListResponse = ListResponse<Farm>;

export type FarmCreateRequestData = {
  name: string;
};

export type FarmCreateResponse = {
  id: string;
};

export type FarmUpdateRequestData = {
  name: string;
};

export type FarmUpdateResponse = {
  id: string;
};
