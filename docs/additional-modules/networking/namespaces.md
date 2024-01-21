---
title: Namespaces
---

Namespaces can be used to organize your remote events and remote functions instead of all being under a single massive object.

## Specifying a namespace
You can specify a namespace under your events/functions interfaces using a plain object literal.
Namespaces behave identically for both remote events and remote functions.

Namespaces can nested inside other namespaces up to any depth.

```ts
interface ClientToServerEvents {
	myEvent(): void;

	myNamespace: {
		myNamespacedEvent(): void;
	}
}
```

It is also possible to combine this with the [Unreliable Remote Events](./remote-events.md#unreliable-events) feature to specify that an entire namespace is unreliable.

```ts
interface ClientToServerEvents {
	myUnreliableNamespace: UnreliableNamespace<{
		myNamespacedEvent(): void;
	}>;
}

type UnreliableNamespace<T> = { [k in keyof T]: Networking.Unreliable<T[k]> };
```

Namespaces also do not have to be defined in the same file, you can specify them in different files and merge them afterwards.

```ts
interface ClientToServerEvents {
	myCombatEvents: CombatEventsNamespace;
	mySocialEvents: SocialEventsNamespace;
}
```

## Using namespaces
You can use namespaces exactly as you might expect, by accessing them under the `Events` object.

```ts
Events.myCombatEvents.killPlayer.fire();
Events.mySocialEvents.throwAParty.connect(() => print("Throwing a party!"));
```

## Specifying middleware
You can specify middleware for namespaces simply by using an object literal for the namespace instead of an array.

```ts
const Events = GlobalEvents.createServer({
	middleware: {
		normalEvent: [middleware0],
		myCombatEvents: {
			killPlayer: [middleware1],
		}
	}
})
```
