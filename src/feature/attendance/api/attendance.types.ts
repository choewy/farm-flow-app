import { ListResponse } from '@app/shared/api';
import { Attendance } from '@app/shared/models';

export type AttendanceListRequestParam = {
  startDate?: Date;
  endDate?: Date;
};

export type AttendanceListResponse = ListResponse<Attendance>;
export type AttendanceTodayResponse = Attendance | null;
