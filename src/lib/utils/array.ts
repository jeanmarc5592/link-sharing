interface SortByCreationDateOptions {
  order?: "DESC" | "ASC";
}

export class ArrayUtils {
  static sortByCreationDate(array: any[], { order = "DESC" }: SortByCreationDateOptions) {
    return array.sort((a, b) => {
      if (!("createdAt" in a) || !("createdAt" in b)) {
        console.error("Key 'createdAt' must be in every element");
        return 0;
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      if (order === "DESC") {
        return dateB - dateA;
      }

      return dateB + dateA;
    });
  }
}