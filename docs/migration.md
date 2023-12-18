---
title: Migration
---

# Migrating to 1.0.0
This document summarizes some breaking changes that were made during the Flamework 1.0 release.

This document will only detail larger breaking changes, it is still recommended that you read the full [release notes](/blog/2023/09/29/flamework-release) before migrating.

If you do not have an existing codebase, please refer to [the installation guide](/docs/installation).

## Core
These are migration steps for `@flamework/core`

### Glob `addPaths` has been replaced with `addPathsGlob`
Previously, you could use globs under the `addPaths` function and it'd match all directories that matched the given glob.
You must now use `addPathsGlob` which will run the path directly through the glob.

Flamework now matches files by default, and you must specify directory matching in the glob (using a trailing `/`).
This means if you used the glob `src/*/server`, you must now use `src/*/server/` to match only directories.

1. Replace `addPaths({ glob: "file" }, "path")` with `addPathsGlob("path")`
2. Replace `addPaths("path")` or `addPaths({ glob: "directory" }, "path")` with `addPathsGlob("path/")`

## Networking
These are migration steps for `@flamework/networking`

### Revised networking setup
Flamework no longer specifies configuration in the shared networking file, and you must now configure networking on the server and client individually.

1. Replace `GlobalEvents.server` and `GlobalEvents.client` with `GlobalEvents.createServer({})` and `GlobalEvents.createClient({})` respectively.
2. You must move your config from `shared/networking.ts` to `server/networking.ts` and `client/networking.ts` (or your respective files).

```ts
// `createEvent`/`createFunction` no longer accepts configuration.
const GlobalEvents = Networking.createEvent<Server, Client>();

const Events = GlobalEvents.createServer({ /* server config */ })
const Events = GlobalEvents.createClient({ /* client config */ })
```

### Networking failure events are now under `GlobalEvents`
These were previously exposed under the `Networking` namespace, but they are now under the individual `GlobalEvents` API.

These updated events also pass an object containing the event information as opposed to multiple arguments.
Refer to the [documentation](./additional-modules/networking/global-handlers.md) for additional information.

1. Replace `Networking.registerNetworkHandler("name", callback)` with `GlobalEvents.registerHandler("name", callback)`
2. The handlers now only pass 2 parameters: the player and the specific event's information object

```ts
// `createEvent`/`createFunction` no longer accepts configuration.
const GlobalEvents = Networking.createEvent<Server, Client>();

GlobalEvents.registerHandler("onBadRequest", (player) => print(player, "sent a bad request!"));
GlobalEvents.registerHandler("onBadResponse", (player) => print(player, "returned a bad response!"));
```

## Components
These are migration steps for `@flamework/components`

### Component maids were removed
Components no longer include a maid by default.

If you'd like to replace the previous behavior, you can create a new `DisposableComponent` and use that for components instead of `BaseComponent`.
You can replace maid with the cleanup solution of your choosing.

```ts
export class DisposableComponent<A = {}, I extends Instance = Instance> extends BaseComponent<A, I> {
	protected maid = new Maid();

	override destroy() {
		this.maid.Destroy();

		// You must still call BaseComponent's destructor!
		super.destroy();
	}
}
```

## Modding
These are migration steps for the `@flamework/core` modding API.

### `Modding.Generic` and `Modding.Caller` can only emit a single type of metadata
These APIs now only generate a single type of metadata (e.g `Modding.Generic<T, "guard">` will now compile directly to `t.string` instead of an object).

Flamework exposes backwards compatible APIs, but you should consider using the new APIs when possible.

1. Replace any existing usages with the backwards compatible `Modding.GenericMany` or `Modding.CallerMany` APIs.
