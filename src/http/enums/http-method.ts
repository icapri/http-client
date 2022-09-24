/**
 * Defines the entire HTTP request methods.
 */
export enum HttpMethod {
  /**
   * Requests a representation of the specified resource.
   * Requests using GET should only retrieve data.
   */
  GET = 'GET',

  /**
   * Asks for a response identical to a GET request, but
   * without the response body.
   */
  HEAD = 'HEAD',

  /**
   * Submits an entity to the specified resource, often
   * causing a change in state or side effects on the server.
   */
  POST = 'POST',

  /**
   * Replaces all current representations of the target
   * resource with the request payload.
   */
  PUT = 'PUT',

  /**
   * Deletes the specified resource.
   */
  DELETE = 'DELETE',

  /**
   * Establishes a tunnel to the server identified by the
   * target resource.
   */
  CONNECT = 'CONNECT',

  /**
   * Describes the communication options for the target resource.
   */
  OPTIONS = 'OPTIONS',

  /**
   * Performs a message loop-back test along the path to the
   * target resource.
   */
  TRACE = 'TRACE',

  /**
   * Applies partial modifications to a resource.
   */
  PATCH = 'PATCH',
}
