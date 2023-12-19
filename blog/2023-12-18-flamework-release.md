---
title: Flamework v1.0.0
authors: fireboltofdeath
tags: [Release]
---

## Change Log

Flamework is finally entering its long overdue v1.0.0, and along comes with a plethora of changes.

There have been many breaking changes made to ensure the longevity of Flamework and you should read all of these changes before migrating to `v1.0.0`.

A migration guide detailing the larger changes has been included [here](/docs/migration) but it is still recommended that you read the full release notes.

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

<span style={{color: "crimson"}}>This release contains breaking changes.</span>

## Breaking Changes

Packages that depend on Flamework `v1.0.0-beta` will not be compatible with Flamework `v1.0.0` projects.

### Transformer
- Flamework decorators are now evaluated in the opposite order (bottom -> top) to match TypeScript behavior.

### Core
- [Flamework decorators now support abstract classes.](#abstract-classes)
- [Improved glob support](#improved-glob-support)
- The `@External()` decorator has been renamed to `@Optional()` to better communicate intent.
- The `Flamework.registerExternalClass` function has been renamed to `Flamework.includeOptionalClass`.
	- It is no longer necessary to explicitly include optional singletons, if they are part of your game's dependency graph.
- `Reflect.metadata`, `Reflect.objToId` and `Reflect.decorators` are no longer exposed.
- `Flamework.Testing` was removed.
- `Flamework.isInitialized`, `Flamework.flameworkConfig` have been removed.
- `Flamework.ignite()` no longer accepts a config object.
- `Modding.Generic` and `Modding.Caller` have been renamed to `Modding.GenericMany` and `Modding.CallerMany` respectively.
	- The new `Modding.Generic` and `Modding.Caller` types are able to fetch individual metadata rather than an object containing metadata.
- `Flamework.hash` now uses type arguments, such as `Flamework.hash<"text", "context">()`
- `Dependency(T)` syntax has been removed in favor of `Dependency<T>()` for the sake of consistency.

### Components
- [Components now allow you to adjust StreamingEnabled support.](#component-streaming-modes)
- [Maids are no longer included on BaseComponent by default](#component-maids)
- `StarterPack`, `StarterGui`, and `StarterPlayer` are now ignored by default.
- Component methods now have a `object` constraint on their generics, as part of the abstract class support.
- Internal `BaseComponent` fields are no longer exposed, including: `setInstance`, `setAttribute` and `_attributeChangeHandlers`.

### Networking
- [Networking configuration refactor](#networking-config-refactor)
- [Improved networking handlers](#improved-networking-handlers)

## Additions

### Core
- [Flamework decorators now support abstract classes.](#abstract-classes)
- [Improved glob support](#improved-glob-support)
- `Flamework.addPaths`/`Flamework.addPathsGlob` is now able to preload packages.
- Added `Modding.getObjectFromId` to replace `Reflect.objToId`.

### Components
- [Components now allow you to adjust StreamingEnabled support.](#component-streaming-modes)
- Fixed attribute changed ordering where handlers would fire before the attribute is updated on the component object.

### Networking
- [Networking configuration refactor](#networking-config-refactor)
- [Improved networking handlers](#improved-networking-handlers)
- Removed type-based symbol obfuscation, which avoids a common roblox-ts bug with incremental mode.
- Networking is now mocked in edit mode to support use cases like UI stories.
- Server config and generated type guards are no longer exposed to the client by default.

### Transformer
- Improved stability, all builtin Flamework macros have been converted to use the user macro machinery.
- Added guard generation support for the `Font` datatype. I know, you're welcome.
- User macros now support union parameters, to optionally generate metadata.
- `Modding.Many` user macro types can now be nested.
- Fixed some incorrect node factory functions, which caused Flamework to erase certain tokens are generated emit.

<!-- truncate -->

## Changes

### Abstract Classes

You can now create abstract components, singletons, etc. These abstract classes will be ignored by Flamework.

To support abstract components, decorator descriptors (including those returned by `Modding.getDecorators`) will now expose the constructor as an `AbstractConstructor`, which is a breaking change.

Decorator descriptors also now include an optional `constructor` field which is typed as a normal constructor and is only present if the attached class is not abstract.

### Component Streaming Modes

Flamework components now support several streaming modes and a component's streaming mode can be adjusted with the `streamingMode` field in its configuration.
The streaming mode dictates how Flamework components behave in regards to hierarchy changes.

There are three streaming modes available currently: `Contextual`, `Watching` and `Disabled`.

Flamework uses the `Contextual` streaming mode by default, which is a breaking change as `Contextual` will not watch for hierarchy changes on atomic models.
The `Contextual` streaming mode acts like `Disabled` on the server or on atomic models and `Watching` for everything else.

```ts
export enum ComponentStreamingMode {
	/**
	 * This disables instance guard streaming, and will only run the instance guard once.
	 */
	Disabled,

	/**
	 * This will watch for any changes to the instance tree, and rerun the instance guards.
	 */
	Watching,

	/**
	 * This determines the appropriate streaming mode based on a couple of factors.
	 *
	 * If on the server, this will always behave like `Disabled`.
	 *
	 * If on the client, and the attached instance is an `Atomic` model, this will behave like `Disabled`.
	 *
	 * Otherwise, this behaves like `Watching`.
	 */
	Contextual,
}
```

### Component Maids
Flamework 1.0 has removed the `maid` field from `BaseComponent` and you are expected to provide your own cleanup.
You are able to use any cleanup method including: `Maid`, `Janitor`, or manual cleanup.

This was done as the choice of cleanup solution is largely preference and `Maid`'s API also did not blend well with the rest of Flamework.

You can use this class as a drop in replacement, updating all of your components to extend `DisposableComponent`.

```ts
export class DisposableComponent<A = {}, I extends Instance = Instance> extends BaseComponent<A, I> {
	protected maid = new Maid();

	override destroy() {
		this.maid.Destroy();
		super.destroy();
	}
}
```

### Improved Glob Support
Flamework supported blobs in `addPaths` previously however it had several issues and inconsistencies.

Some of the issues include:
- Flamework tried to automatically detect when you were using globs, which wasn't always accurate.
- You had to explicitly specify whether you wanted to match folders or directories

Most importantly, though, globs did not automatically update as your file system changed.
This could lead to incorrect preloading behavior if you did not explicitly recompile your runtime file.

Flamework 1.0 solves this by utilizing its runtime metadata which will update the paths after every compile.
It is recommended to use globs with as few matches as possible, to avoid generating large amounts of paths.

The `Flamework.addPaths` function no longer accepts globs directly, and you must use `Flamework.addPathsGlob`.
This function supports all glob queries, and does not force you to match directories or files which means you will need to specify that in your glob.

Support for providing multiple paths in a single call has also been removed.

Refer to [node-glob documentation](https://github.com/isaacs/node-glob?tab=readme-ov-file#glob-primer) for all supported syntax.

### Networking Config Refactor
Flamework 1.0 changes how networking events and functions are created/configured.

These changes allow Flamework to hide sensitive information (generated type guards, middleware configuration, etc) from the client, and also allows Flamework to add new configuration in the future.

```ts
/// Previously
const GlobalEvents = Networking.createEvent<Server, Client>(
	{ /* server middleware */ },
	{ /* client middleware */ },
	{ /* server & client config */ },
)

/// Now
const GlobalEvents = Networking.createEvent<Server, Client>();

// server/networking.ts
const Events = GlobalEvents.createServer({
	/* server config */
})

// client/networking.ts
const Events = GlobalEvents.createClient({
	/* client config */
})
```

### Improved Networking Handlers
Flamework has a feature that allows you to connect to certain events, such as when a client sends an invalid request, or returns an invalid response.

These used to be global, under the `Networking` namespace, but in Flamework 1.0, they are now part of your `GlobalEvents` API.

They also no longer pass the related event information as multiple parameters, and instead uses a single object containing all relevant event information.
