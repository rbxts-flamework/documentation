---
title: May 15th Modding Release
authors: fireboltofdeath
---

## Change Log

### Transformer
- Flamework will no longer remove decorators that aren't Flamework decorators.
- Added support for decorators on fields.
- Union guard generation ignores symbol types.
- [Added configuration option to change how IDs are generated.](#id-generation)
- [Added compile-time metadata](/docs/flamework/modding/metadata)
- [Added user macros](#user-macros)

### Core
- `Flamework.implements<T>()` no longer narrows constructors into T.
- Flamework's lifecycle events now use the roblox-ts extensions `@hideinherited` tag.
- OnInit and OnStart will use separate memory categories per singleton.
- [Added support for modding.](/docs/flamework/modding)

### Components
- <span style={{color: "crimson"}}>[BREAKING]</span> Components no longer call <code>super.onStart()</code> implicitly.
- Components now use the modding API internally
	- This means you can use custom lifecycle events on components.

### Networking
- Connect macro guard generation now takes into account optional parameters.

### Modding
- <span style={{color: "crimson"}}>[BETA BREAKING]</span> <code>Modding.createDependency</code> no longer adds the dependency as a listener and must be done separately.
- You can create Flamework decorators.
- You can create custom lifecycle events.
- Deferred dependency API allows you to delay the constructor of a class.
- Decorators can request specific compile-time metadata.
- Dependency resolution can be modified, extended or overridden.
- You can add custom values into Flamework's default dependency resolution.
	- `Modding.addDependency(Flamework.id<SomeType>(), objOfSomeType)`

<!-- truncate -->

## Changes

### User Macros
More specific documentation is available in [the modding documentation.](/docs/flamework/modding/guides/user-macros)

Flamework now allows users to define Flamework-style macros which can tap into metadata about type parameters or the callsite.
```ts
/** @metadata macro */
function macro<T>(abc?: Modding.Generic<T, "id">, xyz?: Modding.Caller<"line" | "char">) {
	assert(abc && xyz);

	print(abc.id, `${xyz.line}:${xyz.char}`);
}

macro<MyInterface>();
```

### ID Generation
Flamework now supports four different ID generation modes, which can be configured under Flamework's config in tsconfig. The default behavior is "full", which may change in the future. If obfuscation is enabled, and no ID generation mode is specified, the default is changed to "obfuscated".

All ID generation modes besides full incorporate a unique hash to prevent collisions with other IDs which means these generation modes should not be used in packages.

- "idGenerationMode": "full"
	- This should always be used for packages.
	- **(prefix:)server/services/subfolder/service1@Service1**
- "idGenerationMode": "short"
	- Includes only the file name and declaration name.
	- **(prefix:)service1@Service1\{HASH}**
- "idGenerationMode": "tiny"
	- Includes only the declaration name.
	- **(prefix:)Service1\{HASH}**
- "idGenerationMode": "obfuscated"
	- **(prefix:)HASH**

## Previous Release
If you run into any issues with the update, you should revert your packages to these specific versions.
```
@flamework/core: 1.0.0-beta.3
@flamework/networking: 1.0.0-beta.6
@flamework/components: 1.0.0-beta.5
rbxts-transformer-flamework: 1.0.0-beta.9
```
