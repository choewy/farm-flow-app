import { ListResponse } from '@app/shared/api';
import { Attendance } from '@app/shared/models';

export type AttendanceTodayResponse = Attendance | null;

export type AttendanceListRequestParam = {
  startDate?: Date;
  endDate?: Date;
};

export type AttendanceUpdateRequestData = {
  checkedInAt?: string;
  checkedOutAt?: string;
};

export type AttendanceListResponse = ListResponse<Attendance>;
