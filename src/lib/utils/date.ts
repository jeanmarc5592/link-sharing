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

  static generateLast7Days(): Date[] {
    const today = this.getToday();
    const last7Days: Date[] = [];

    let currentDate = new Date(today);

    for (let i = 0; i < 7; i++) {
      last7Days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return last7Days.reverse();
  }

  static getDate(originalDate: Date): string {
    return originalDate.toISOString().split('T')[0];
  }
}