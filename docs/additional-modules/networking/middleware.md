---
title: Middleware
---

Middlewares are functions that get called before the listener to any event or function. It's able to drop requests, delay requests or change the parameters and return value prior to listeners being called. Flamework does not bundle any middleware by default.

Example use cases for middleware:
* Stricter type checks (for types that can't be represented via TypeScript, e.g constrained numbers)
* Rate limiting (drop or delay requests that go over a certain threshold)
* Blocking unauthorized requests before they reach the listener
* Logging

## Defining a custom middleware
The following middleware passes requests based on a % chance.

Middleware pass in an event object containing some metadata about the event. This includes the name, global name and whether the middleware is attached to a function or event.

### Middleware Types
When you want to define middleware for a RemoteEvent, you can use the `Networking.EventMiddleware<I>` type.<br/>
The `I` parameter defines what inputs your middleware accepts and can't be applied to events that don't satisfy the specified type.

When you want to define middleware for a RemoteFunction, you can use the `Networking.FunctionMiddleware<I, O>` type.<br/>
The `I` parameter works the same as RemoteEvents.<br/>
The `O` parameter defines what output your middleware accepts and can't be applied to functions that don't satisfy the specified type.

If you don't care about types the parameter or output is, you can use a generic which will be inferred when the middleware is used, as shown below. You can also use the `any` type to avoid having to define a generic, but this is not recommended.

### RemoteEvent Middleware
The processNext function is used to tell Flamework to process the next middleware or fire listeners if there's none left.

```ts
function randomChanceMiddleware<I extends Array<unknown>>(chances: number): Networking.EventMiddleware<I> {
	return (processNext, event) => {
		print("Loaded middleware for", event.name);
		return (player, ...args) => {
			if (math.random() < chances / 100) {
				processNext(player, ...args);
			}
		};
	};
}
```

### RemoteFunction Middleware
The `processNext` function is used to tell Flamework to process the next middleware or handler. It returns a promise containing the result of the next handler.

Your middleware as well as `processNext` can return `Networking.Skip` which tells the sender that this request was cancelled. If your middleware uses the result from `processNext`, it should check if the value is `Networking.Skip` and forward that value if it is.

```ts
function randomChanceMiddleware<I extends Array<unknown>, O>(chances: number): Networking.FunctionMiddleware<I, O> {
	return (processNext, event) => {
		print("Loaded middleware for", event.name);
		return async (player, ...args) => {
			if (math.random() < chances / 100) {
				return processNext(player, ...args);
			}
			return Networking.Skip;
		};
	};
}
```

## Using middleware
To use a middleware, you simply register it in your createEvent/createFunction call as shown below.

```ts
export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>(
	// server events
	{
		myServerEvent: [randomChanceMiddleware(50)]
	},
	// client events
	{
		myClientEvent: [randomChanceMiddleware(25)]
	}
);
```
