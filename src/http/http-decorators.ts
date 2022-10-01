import {HttpClient} from './http-client';
import {HttpGetOptions} from './http-options';

/**
 * Checks whether the given string contains white spaces.
 *
 * @param {*} value Contains the string to be checked whether it
 * contains white spaces.
 * @return {Boolean} whether the given string contains white spaces.
 */
function hasSpaces<T>(value: T | string): value is string {
  return typeof value === 'string' && value.indexOf(' ') >= 0;
}

/**
 * Checks whether the given value is null or an empty string.
 *
 * @param {*} value Contains the value to be checked whether it is
 * null or empty string.
 * @return {Boolean} whether the given value is null or empty string.
 */
function isNullOrEmpty<T>(
    value: T | string | null | undefined,
): value is string | null | undefined {
  return !value || (typeof value === 'string' && value.trim().length === 0);
}

/**
 * Cares for the HTTP Get request to be valid.
 *
 * @param {HttpClient} target Contains the `HttpClient` instance.
 * @param {String} propertyKey Contains the key of the HTTP Get method.
 * @param {PropertyDescriptor} descriptor Contains the property descriptor.
 */
export function GET(
    target: HttpClient,
    propertyKey: 'get' extends keyof HttpClient ? 'get' : never,
    descriptor: PropertyDescriptor,
): void {
  // only the `HttpClient.get` method should be targeted
  if (target.constructor.name !== 'HttpClient' || propertyKey !== 'get') {
    throw new Error(
        `Decorator '@GET' can only be applied to the 'HttpClient.get' method.`,
    );
  }

  descriptor.value = (uri: string, options?: HttpGetOptions) => {
    // make sure uri is valid
    if (!uri || hasSpaces(uri)) {
      throw new Error(`Parameter 'uri' shouldn't be null or whitespace.`);
    }

    if (options) {
      // no body in HTTP Get request allowed
      if ('body' in options) {
        throw new Error(`HTTP Get request shoudn't have body.`);
      }

      // check for invalid request headers
      const headers = options.headers;
      if (headers) {
        const invalidHeader: string | undefined = Object
            .keys(headers)
            .find((header: string) => !(headers as any)[header] ||
                isNullOrEmpty(header) ||
                isNullOrEmpty((headers as any)[header]),
            );

        if (invalidHeader) {
          throw new Error(
              `'${invalidHeader}' is an invalid HTTP request header.`,
          );
        }
      }
    }
  };
}
