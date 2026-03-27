export class DateTime {
  private static readonly DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  public static formatTime(seconds: number) {
    const totalSeconds = Math.max(0, Math.floor(seconds));
    const hours = Math.floor(totalSeconds / 3_600);
    const minutes = Math.floor((totalSeconds % 3_600) / 60);
    const remainingSeconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
    }

    if (minutes > 0) {
      return `${minutes}분 ${remainingSeconds}초`;
    }

    return `${remainingSeconds}초`;
  }

  public static formatDay(date: Date | string) {
    return this.DAYS[new Date(date).getDay()];
  }
}
