---
title: Remote Events
---
RemoteEvents are for one way communication between the server and client. You should use these when you do not need a response from the receiver.

## Creation
You can use the `Networking.createEvent` macro to create your network handler. This will contain all your events for both server and client and you can also configure your [middleware](./middleware).

It should be noted that you cannot return a value from an event and the return type on the interfaces will be ignored.
If you want two way communication then you should use [RemoteFunctions](./remote-functions).

```ts
import { Networking } from "@flamework/networking";

interface ClientToServerEvents {
	event(param1: string): void;
}

interface ServerToClientEvents {
	event(param1: string): void;
}

// Returns an object containing a `server` and `client` field.
export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();

// It is recommended that you create these in separate server/client files,
// which will avoid exposing server configuration (including type guards) to the client.
export const ServerEvents = GlobalEvents.createServer({ /* server config */ });
export const ClientEvents = GlobalEvents.createClient({ /* client config */ });
```

### Unreliable Events
Flamework supports specifying [unreliable remote events](https://create.roblox.com/docs/reference/engine/classes/UnreliableRemoteEvent).
These events must still follow any limits specified by Roblox (e.g the 900 byte size limit.)

You can specify that an event is unreliable using the `Networking.Unreliable` type.

```ts
interface ClientToServerEvents {
	myUnreliableEvent: Networking.Unreliable<(param1: string) => void>;
}
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

// Disconnect an event connection
const myConnection = events.event.connect(() => {});
myConnection.Disconnect();
```
