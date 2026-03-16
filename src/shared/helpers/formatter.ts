export class Formatter {
  public static toMoney(value: string | number) {
    const digits = String(value).replace(/[^\d]/g, '');
    return digits ? Number(digits).toLocaleString('ko-KR') : '';
  }

  public static toInt(value: string | number) {
    return Number(String(value).replace(/,/g, ''));
  }
}
