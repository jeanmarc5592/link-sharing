export class DateUtils {
  static getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  static getSevenDaysAgo(): string {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return sevenDaysAgo.toISOString().split('T')[0];
  }

  static formatDate(originalDate: Date): string {
    const options = { month: 'short', day: 'numeric' } as Intl.DateTimeFormatOptions;
    const date = new Date(originalDate);
    
    return date.toLocaleDateString('en-US', options);
  }
}