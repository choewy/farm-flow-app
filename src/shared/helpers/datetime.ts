export class DateTime {
  private static readonly DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  public static formatTime(seconds: number) {
    return new Date(seconds * 1000).toISOString().substring(11, 19);
  }

  public static formatDay(date: Date | string) {
    return this.DAYS[new Date(date).getDay()];
  }
}
