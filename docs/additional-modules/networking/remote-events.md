---
title: Remote Events
---
RemoteEvents are for one way communication between the server and client. You should use these when you do not need a response from the receiver.

Example use cases:
- Notifications
- Interaction
- Tools

## Creation
You can use the `Networking.createEvent` macro to create your network handler. This will contain all your events for both server and client and you can also configure your [middleware](./middleware).

It should be noted that you cannot return a value from an event and the return type on the interfaces will be ignored.
If you want two way communication then you should use [RemoteFunctions](./remote-functions).

```ts
import { Networking } from "@flamework/networking";

// Client -> Server events
interface ServerEvents {
	event(param1: string): void;
}

// Server -> Client events
interface ClientEvents {
	event(param1: string): void;
}

// Returns an object containing a `server` and `client` field.
export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
```

## Using Events
Once you've declared all your events, it's time to use them. You can access your events simply by indexing the [Events](./introduction#re-exporting) object.

### Firing Events
Send a request between the server and client.

#### Server
```ts
// Fire to player(s)
Events.event.fire(player, ...args);
Events.event.fire([player1, player2], ...args);

// Fire to all players except
Events.event.except(player, ...args);
Events.event.except([player1, player2], ...args);

// Broadcast
Events.event.broadcast(...args);

// Predict, fires server event using player as the sender
Events.event.predict(player, ...args);

// Shorthand syntax, equivalent to Events.event.fire
Events.event(player, ...args);
```

#### Client
```ts
// Fire to server
Events.event.fire(...args);

// Predict, fires client event from the client
Events.event.predict(...args);

// Shorthand syntax, equivalent to Events.event.fire
Events.event(...args);
```

### Connecting
Connecting to an event returns a RBXScriptConnection which can be used to disconnect the event at any time.

The following example is assuming the code is run on the server. Connecting events on the server and client is identical except that clients do not have an additional `player` parameter.

```ts
// Connect to an event
Events.event.connect((player, arg1) => {
	print(player, arg1);
});

// Narrow this event connection
// (Warning) This may be replaced with a more versatile macro in the future.
Events.event.connect((player, arg1: "ThisString" | "AnotherString") => {
	if (arg1 !== "ThisString" && arg1 !== "AnotherString") {
		// This will never run!
	}
})

// Disconnect an event connection
const myConnection = events.event.connect(() => {});
myConnection.Disconnect();
```
