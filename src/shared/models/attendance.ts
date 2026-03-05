export type Attendance = {
  id: string;
  workDate: string;
  status: 'in' | 'out';
  checkedInAt: string;
  checkedOutAt: string;
  seconds: number;
};
