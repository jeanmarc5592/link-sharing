export class StringUtils {
  static capitalize(str: string) {
    if (str.length === 0) {
      return str;
    }
  
    const firstLetter = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1).toLowerCase();
  
    return `${firstLetter}${restOfString}`;
  }

  static isEmail(str: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }
}