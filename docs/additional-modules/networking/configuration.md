---
title: Configuration
---
Flamework remotes support additional configuration that can be passed to the `createServer`/`createClient` methods.

The server and client have separate configuration, so make sure to update both when necessary.

## RemoteEvents
The following configuration is available for remote events.

```ts
export interface EventCreateConfiguration<T> {
	/**
	 * Disables input validation, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableIncomingGuards: boolean;

	/**
	 * Emit a warning whenever a guard fails.
	 * This is enabled only in studio by default.
	 */
	warnOnInvalidGuards: boolean;

	/**
	 * The middleware for each event.
	 */
	middleware: EventMiddlewareList<T>;
}
```

## RemoteFunctions
The following configuration is available for remote functions.

```ts
export interface FunctionCreateConfiguration<T> {
	/**
	 * Disables input validation, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableIncomingGuards: boolean;

	/**
	 * Emit a warning whenever a guard fails.
	 * This is enabled only in studio by default.
	 */
	warnOnInvalidGuards: boolean;

	/**
	 * The default timeout for outgoing requests.
	 * Defaults to `10`
	 */
	defaultTimeout: number;

	/**
	 * The middleware for each event.
	 */
	middleware: FunctionMiddlewareList<T>;
}
```
