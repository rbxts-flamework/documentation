---
title: September 14th Release
authors: fireboltofdeath
---

## Change Log

### Transformer
- Consistent ID generation for non-obfuscated packages.
- SourceFiles are validated prior to Flamework transforming them.
	- This can lead to slightly slower compile times, but decreases chance of incorrect emit and diagnostics.
	- You can disable this via the transformer's `noSemanticDiagnostics` option, but this is not recommended.

### Core
- Flamework.addPaths now has glob support.
	- `Flamework.addPaths("src/features/*/server")`

### Networking
- You can now pass player arrays to event.fire()
- [Promise-based remote functions are now supported.](#remote-functions)
- [Global networking events.](#global-networking-events)
- <span style={{color: "crimson"}}>[BREAKING]</span> <a href="#revised-networking-structure">Revised structure for networking.</a>

### Components
- Added `Components.getAllComponents<T>()` for fetching all components of a certain type.
- Components will move all constructor logic (fields, constructor body, etc) into onStart automatically.
	- If you're not using the `OnStart` event, you cannot have a method named `onStart` in a component.

<!-- truncate -->

## Changes

### Revised Networking Structure
Flamework's event objects are now solely comprised of the developer-specified events, so methods like `connect` and `predict` are no longer under the main `Events` object, but is now under each event separately.

Now that events are connected to via the same way they are fired, this means events that have the same name on server and client will both have receiver methods (`connect`, `predict`) as well as sender methods (`fire`, `except`, `broadcast`) where applicable.

Networking functions also follow this structure, but are new and therefore do not have any breaking changes.

This was done to prevent accidental breaking changes in the future, as well as for stylistics reasons.

#### Converting to the new structure
```ts
// old
Events.connect("myEvent", () => {});
Events.predict("myEvent");

// new
Events.myEvent.connect(() => {});
Events.myEvent.predict();
```

### Global Networking Events
Currently, Flamework allows you to register handlers for two different events.
It is not recommended to directly punish players over these events, as there are many ways an invalid value could be provided.

- onBadRequest
	- Fires whenever a client (or the server) sends incorrect arguments to an event/function.
	- First parameter is the player (or LocalPlayer on the client.)
	- Second parameter is the NetworkInfo object, containing information about the specific event/function.
	- Third parameter is the argument number which failed the type guards.
- onBadResponse
	- Fires whenever a client (or the server) returns an incorrect value from a networking function.
	- First parameter is the player (or LocalPlayer on the client.)
	- Second parameter is the NetworkInfo object, containing information about the specific event/function.

```ts
Networking.registerNetworkHandler("onBadRequest", (player, event, failedArg) => {
	print(player, "fired", event.name, "but passed invalid value for argument", failedArg);
});
```

### Remote Functions
Flamework now supports an equivalent of RemoteFunctions, using promises.
You can fire and receive on both client and server, but only one callback can be registered at one time.


#### Defining a new RemoteFunction
```ts
interface ServerFunctions {
	myServerFunction(param1: string, param2: number): Instance | undefined;
}

interface ClientFunctions {
	myClientFunction(param1: string, param2: number): Instance | undefined;
}

export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>({
	// server middleware
}, {
	// client middleware
})
```

#### Using a networking function
```ts
// server
Functions.prompt.invoke(player, "Yes", "No").then((result) => print("player said", result));
Functions.fetchData.setCallback((player, kind) => {
	return kind === "Coins" ? getPlayerCoins(player) : getPlayerGems(player);
})

// client
Functions.fetchData.invoke("Coins").then((result) => print("I have", result, "coins!"));
Functions.prompt.setCallback((option1, option2) => {
	return math.random() < 0.5 ? option1 : option2;
})

// prediction (fire a client function on the client)
Functions.prompt.predict("Yes", "No").then((result) => print("I chose", result));
```

## Previous Release
If you run into any issues with the update, you should revert your packages to these specific versions.
```
@flamework/core: 1.0.0-beta.0
@flamework/networking: 1.0.0-beta.2
@flamework/components: 1.0.0-beta.3
rbxts-transformer-flamework: 1.0.0-beta.3
```
