---
title: Remote Functions
---
RemoteFunctions are for two way communicates between the server and client. This means the sender is able to receive a response from the receiver.  Flamework's RemoteFunctions implementation use promises which allow you to avoid any dangerous yields, errors, etc. All requests have a timeout of 10 seconds.

Flamework supports client->server->client requests *and* server->client->server requests because, internally, Flamework does not use Roblox's own RemoteFunctions which allows it to avoid the common (technical) pitfalls associated with client invocation.

Example use cases:
- Prompt
- Request Data

## Creation
You can use the `Networking.createFunction` macro to create your network handler. This will contain all your events for both server and client and you can also configure your [middleware](./middleware).

```ts
import { Networking } from "@flamework/networking";

// Client -> Server -> Client functions
interface ServerFunctions {
	function(param1: string): number;
}

// Server -> Client -> Server functions
interface ClientFunctions {
	function(param1: string): number;
}

// Returns an object containing a `server` and `client` field.
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
```

## Using Functions
Once you've declared all your functions, it's time to use them. You can access your functions simply by indexing the [Functions](./introduction#re-exporting) object.

A `player?` parameter in the following examples means that the parameter only exists on the server, and is absent on the client.

### Invoking Functions
Invoke a request and wait for a response.

```ts
// Invoke a function
Functions.function.invoke(player?, "my parameter!").then((value) => ...);

// Shorthand syntax, equivalent to Functions.
Functions.function(player?, "my parameter!").then((value) => ...);

// Predict, simulates a request being sent
Functions.function.predict(player?, "my parameter!").then((value) => ...);
```

### Handling Functions
You can only connect one handler to each function. Calling `setCallback` more than once will override the existing handler but will result in a warning being outputted.

```ts
// With a normal function
Functions.function.setCallback((player?, param1) => {
	print("This is", param1);
	return math.random(1, 100);
})

// With an async function
Functions.function.setCallback(async (player?, param1) => {
	print("This is", param1);
	return await myAsyncNumberGenerator(1, 100);
})
```

## Errors
Flamework's networking exposes a `NetworkingFunctionError` enum which is used whenever a RemoteFunction request is rejected.


| Name          | Description                                                                    |
|---------------|--------------------------------------------------------------------------------|
| Timeout       | The request surpassed the timeout length.                                      |
| Cancelled     | The request was cancelled by the receiver.                                     |
| BadRequest    | The request was rejected by the receiver due to invalid arguments.             |
| InvalidResult | The request was processed by the receiver, but an invalid result was returned. |
| Unprocessed   | The request was not processed by the receiver.                                 |

### Handling errors

Flamework's RemoteFunctions return promises which allows you to handle them the same as any other promise.
Flamework always passes a `NetworkingFunctionError` as the rejection value, which tells you the reason the request failed.

```ts
Events.function.invoke()
	.then((value) => print("I successfully got", value))
	.catch((reason) => {
		if (reason === NetworkingFunctionError.Timeout) {
			warn("My request timed out!");
		} else {
			warn("A different error occurred:", reason);
		}
	})
```
