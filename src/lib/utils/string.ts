export class StringUtils {
  static capitalize(str: string): string {
    if (str.length === 0) {
      return str;
    }
  
    const firstLetter = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1).toLowerCase();
  
    return `${firstLetter}${restOfString}`;
  }

  static isEmail(str: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  static toBoolean(str: string | null): boolean {
    if (str === "true") {
      return true;
    }

    if (str === "false") {
      return false;
    }

    console.error("Input 'str' muste be either 'true' or 'false'");
    return true;
  }
}