---
title: Global Handlers
---
The `GlobalEvents`/`GlobalFunctions` APIs includes some optional events that you can connect to.

## Connection
You can connect to one of these optional events by using `GlobalEvents.registerHandler(name, callback)`.

```ts
export const GlobalEvents = Networking.createEvent<S, C>();
export const GlobalFunctions = Networking.createFunction<S, C>();


GlobalEvents.registerHandler("onBadRequest", (player) => print(player, "sent a bad request!"));
GlobalFunctions.registerHandler("onBadResponse", (player) => print(player, "returned a bad response!"));

```

## Events
Every handler is fired with the player in question (on the client, this will always be `Players.LocalPlayer` even when events are caused by the server) along with an event data object.

Every event data object includes a `networkInfo` field containing information about the RemoteEvent/RemoteFunction that caused this event.

```ts
export interface NetworkInfo {
	/**
	 * The name provided for this event.
	 */
	name: string;

	/**
	 * The (generated) global name used for distinguishing different createEvent calls.
	 */
	globalName: string;

	/**
	 * Whether this remote is an event or function.
	 */
	eventType: "Event" | "Function";
}
```

Along with the `networkInfo` field, each event also includes its own relevant data, specific to each event.

### onBadRequest
This event is fired when the server or client fires a remote but the arguments do not pass the generated type guards.
It is not recommended to use this for moderative action as false positives can happen in many ways.

This event is fired for both RemoteEvents and RemoteFunctions.

```ts
interface BadRequestData {
	/**
	 * The index of the argument that was incorrect.
	 */
	argIndex: number;

	/**
	 * The value of the argument that was incorrect.
	 */
	argValue: unknown;
}
```

### onBadResponse
This event is fired when the server or client return a value from a RemoteFunction callback that does not pass the generated type guards.
It is not recommended to use this for moderative action as false positives can happen in many ways.

This event is only fired for RemoteFunctions.

```ts
interface BadResponseData {
	/**
	 * The value of the argument that was incorrect.
	 */
	value: unknown;
}
```
