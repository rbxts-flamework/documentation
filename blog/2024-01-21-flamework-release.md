---
title: Flamework v1.1.0
authors: fireboltofdeath
tags: [Release]
---

## Change Log

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

## Additions

### Core
- Updated `@rbxts/t` to latest

### Components
- [Added component listener methods](#component-listeners)

### Networking
- [Networking now supports unreliable remote events](#unreliable-remote-events)
- [Networking now supports namespaces](#networking-namespaces)
- Generated event names are now shuffled to avoid const-matching.
- Flamework no longer erases symbol information on events, so `Find All References` and similar tools will now function properly.
- The networking module was rewritten. The behavior should be mostly the same, but there are some small differences.
	- The way remotes are created is now different.
	- Guards are now implemented as a middleware, which means `event.predict`/`function.predict` will now be affected by guard checking.

### Transformer
- `buffer`, `OverlapParams` and `FloatCurveKey` are now supported by guard generation.
- Improved emit for user macro objects by omitting fields that result in `undefined`.

<!-- truncate -->

## Changes

### Component Listeners
Flamework now supports listening for when specific components are added or removed.
These listeners can be disconnected using the returned connection object.

```ts
this.components.onComponentAdded<MyComponent>((myComponent) => {
	print("A new MyComponent has spawned!");
});

this.components.onComponentRemoved<MyComponent>((myComponent) => {
	print("RIP MyComponent, you will be missed.");
});
```

These APIs also support polymorphism using superclasses and interfaces.
This allows you to write interfaces to achieve composition behavior, tag certain components using an empty interface, among many other usecases.

```ts
interface Interactable {
	onInteract(): void;
}

this.components.onComponentAdded<Interactable>((value) => value.onInteract());
```

### Unreliable Remote Events
Flamework now supports unreliable remote events.
You can specify them using the `Networking.Unreliable` type.

```ts
interface ClientToServerEvents {
	myReliableEvent(): void;
	myUnreliableEvent: Networking.Unreliable<() => void>;
}
```

### Networking Namespaces
Flamework now supports specifying namespaces under your networking events.
This can be useful for organization or for isolating certain types of remotes (e.g reliable/unreliable)

Flamework also supports multiple nested namespaces, up to whatever depth you desire.

```ts
interface ClientToServerEvents {
	normalEvent(): void;

	myCombatEvents: {
		killPlayer(): void;
		revivePlayer(): void;
		eatPlayer(): void;
	},

	mySocialEvents: {
		doNotKillPlayer(): void;
		throwAParty(): void;
		inviteFriends(): void;
	},

	// Namespaces don't have to be defined in the same file!
	myRandomNamespace: MyRandomNamespace,
}

// You can access namespaces as you might expect, through the `Events` object.
Events.myCombatEvents.killPlayer();
Events.mySocialEvents.throwAParty();
```

You can still specify middleware for namespaced events, by specifying them under your `middleware` configuration.

```ts
const Events = GlobalEvents.createServer({
	middleware: {
		normalEvent: [middleware0],
		myCombatEvents: {
			killPlayer: [middleware1, middleware2],
		}
	}
})
```
