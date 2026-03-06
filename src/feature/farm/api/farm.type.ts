import { ListResponse } from '@app/shared/api';
import { Farm, Role } from '@app/shared/models';

export type FarmListRow = {
  farm: Farm;
  role: Role;
};

export type FarmListResponse = ListResponse<FarmListRow>;

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
