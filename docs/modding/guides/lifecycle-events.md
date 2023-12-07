---
title: Lifecycle Events
---
This guide is for creating a custom lifecycle event.

## Defining the lifecycle event
You are able to define any number of lifecycle events and they can even be identical to one another. Flamework uses symbol information and assigns a unique ID to every lifecycle event. This means you can have multiple lifecycle events with identical members, even names, and Flamework can distinguish between them.

You are also able to define metadata which will be generated when a class uses your lifecycle event as shown in [the metadata docs](../metadata#how-do-i-request-metadata).

```ts
export interface OnPlayerJoined {
	onPlayerJoined(player: Player): void;
}
```

## Implementing the lifecycle event
After defining the lifecycle event and any metadata you want it to use, you can use the listeners API to implement it. It's recommended that you implement lifecycle events in a service/controller so that they only occur after ignition.

It is worth noting that methods in TypeScript use [bivariant parameters](https://roblox-ts.com/playground/#code/JYOwLgpgTgZghgYwgAgOoHsDuyDeAoASAFsIwALdAEwAoAHOKOIgRgC5kBnMKUAcwEp2AN3TBKAbjwBfPHgQAbOBw7IAggCMEyYEVryIJcCozZ8xUhRr1GLdgCI4mu-1yECSjtDB0GTZsgBeIOQHJ35xZAB6SOQAUQAleIB5eIBCQhkZOXQQLmRHLQDkEAhsDQRqcOzcsGRMLHYTQPzNSTx6zAA6EnIqajsQdFqC53EgA) which means implementations of lifecycle events are not always correctly typed.

```ts
@Service()
class PlayerJoinService implements OnStart {
	onStart() {
		const listeners = new Set<OnPlayerJoined>();

		// Automatically updates the listeners set whenever a listener is added or removed.
		// You can do more than just keeping track of a set,
		// e.g fire the new listener's event for all existing players.
		Modding.onListenerAdded<OnPlayerJoined>((object) => listeners.add(object));
		Modding.onListenerRemoved<OnPlayerJoined>((object) => listeners.delete(object));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		})

		for (const player of Players.GetPlayers()) {
			for (const listener of listeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		}
	}
}
```
