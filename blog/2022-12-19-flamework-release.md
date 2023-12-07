---
title: December 19th Release
authors: fireboltofdeath
---

## Change Log

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

### Transformer
- [Added runtime metadata](#runtime-metadata)
- Add support for some namespaced enums in guard generation

### Core
- Added a warning for calling the `Dependency` macro prior to ignition and during preloading.
- Added support for file globs with `addPaths` by using `addPaths({ glob: "file" }, ..)`
- Fixed incorrect `Modding.resolveSingleton` return type.
- Singletons are now generic and you can define your own
	- Using the `flamework:singleton` metadata and `flamework:loadOrder` metadata
- Singletons are now topologically sorted based on dependencies.
	- This should remove the need for specifying `loadOrder` in all but rare cases.

### Components
- Fixed a bug that caused components to lag when streaming models in and out.
- [Components now support dependencies](#component-dependencies)

### Networking
- RemoteFunctions now have custom timeouts with the `invokeWithTimeout` method.
- [You can now provide configuration to your networking.](#networking-configuration)
- RemoteEvents now use Roblox's networking queue which will not fire events until after there is a listener.
- Rest arguments are now properly supported.

<!-- truncate -->

## Changes

### Runtime Metadata

Runtime metadata is an improvement in how Flamework can deliver some types of code which, at the moment, is only used to transmit configuration from a `flamework.json` file to your game.

This has an advantage of allowing Flamework to apply configuration globally instead of only after ignition, which allows Flamework to provide warnings and log levels which can occur prior to ignition, among other things.

In the future, runtime metadata will likely be used for storing more powerful type guards and other things internal to Flamework.

```ts
export interface FlameworkConfig {
	/**
	 * Defines what logging level Flamework should use.
	 * This can be useful for debugging issues with ignition.
	 */
	logLevel?: "none" | "verbose";

	/**
	 * Disables the warnings that occur when you use the `Dependency` macro prior to ignition.
	 * This does not disable warning for using the macro during preloading, as that is always unintended.
	 */
	disableDependencyWarnings?: boolean;
}
```

### Component Dependencies

You are now able to use dependency injection on components to depend on other components. This allows components to interact with one another and will automatically add and remove components based on necessity.

If your component depends on another component, it will not be added unless your dependency is added first. Likewise, if your dependency gets removed, so will your component.

```ts
@Component({ tag: "required!" })
export class Component1 extends BaseComponent {
	doSomething() {
		print("I did something!");
	}
}

@Component({ tag: "required!" })
export class Component2 extends BaseComponent extends OnStart {
	constructor(private component: Component1) {
		super();
	}

	onStart() {
		print("Telling dependency to do something");

		this.component.doSomething();
	}
}
```

### Networking Configuration

You can now specify several different settings for your networking by passing in an object after the middleware.
```ts
const GlobalEvents = Networking.createEvent({}, {}, { disableClientGuards: true });
```

As well as disabling guards for the server and client, you can also change the default timeout on networking functions.

```ts
export interface EventConfiguration {
	/**
	 * Disables input validation on the server, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableServerGuards: boolean;

	/**
	 * Disables input validation on the client, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableClientGuards: boolean;
}

export interface FunctionConfiguration {
	/**
	 * Disables input validation and return validation on the server, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableServerGuards: boolean;

	/**
	 * Disables input validation and return validation on the client, allowing any value to pass.
	 * Defaults to `false`
	 */
	disableClientGuards: boolean;

	/**
	 * The default timeout for requests from the server to the client.
	 * Defaults to `10`
	 */
	defaultServerTimeout: number;

	/**
	 * The default timeout for requests from the client to the server.
	 * Defaults to `30`
	 */
	defaultClientTimeout: number;
}
```

## Previous Release
If you run into any issues with the update, you should revert your packages to these specific versions.
```
@flamework/core: 1.0.0-beta.7
@flamework/networking: 1.0.0-beta.8
@flamework/components: 1.0.0-beta.10
rbxts-transformer-flamework: 1.0.0-beta.14
```
