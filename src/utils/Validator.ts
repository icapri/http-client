export abstract class Validator {
  public static isArray(value: any): value is any[] | readonly any[] {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  
  public static isBoolean(value: any): value is boolean {
    return typeof value === 'boolean';
  }
  
  public static isEmptyObject(value: any): value is Record<string, never> {
    const propsCount = Object.getOwnPropertyNames(value).length;
    const symbsCount = Object.getOwnPropertySymbols(value).length;
    return Validator.isObject(value) && propsCount === 0 && symbsCount === 0;
  }
  
  public static isObject(value: any): value is object {
    return value !== null && typeof value === 'object';
  }
  
  public static isString(value: any): value is string {
    return typeof value === 'string';
  }
}
