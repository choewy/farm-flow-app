export class Formatter {
  public static toMoney(value: string | number) {
    const digits = String(value).replace(/[^\d]/g, '');
    const digitValue = digits ? Number(digits).toLocaleString('ko-KR') : '';

    return digitValue;
  }

  public static toInt(value: string | number) {
    return Number(String(value).replace(/,/g, ''));
  }
}
