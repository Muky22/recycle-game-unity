export class Utils {
  public static verboseHash(num: number, size: number): string {
    if (num.toString().length >= size) {
      return num.toString();
    }

    var s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }
}
