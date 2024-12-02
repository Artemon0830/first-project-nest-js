export class TransformHelper {
  public static toLowerCase({ value }: { value: string }): string {
    return value ? value.toString().toLowerCase() : value;
  }
  public static trim({ value }: { value: string }): string {
    return value ? value.toString().trim() : value;
  }
  public static trimArray({ value }: { value: string[] }): string[] {
    return value ? value.map((item) => item.trim()) : value;
  }
}
