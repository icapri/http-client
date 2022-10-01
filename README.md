## Asynchronous HTTP Client for TypeScript Developers

Especially when using the Angular Framework one can see
that the built in `HttpClient` works with Observables
but for they are not the proper objects to use for the
communication between the client and the server. Even
the method `toPromise()` inside the `Observable<T>` has
already been marked as `@deprecated` although there is
a RxJs function which converts the Observable to Promise.

This `HttpClient` object uses the [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) in the background and contains the basic CRUD methods.
