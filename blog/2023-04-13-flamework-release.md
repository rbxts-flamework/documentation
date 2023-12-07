---
title: Flamework v1.0.0-beta.20
authors: fireboltofdeath
tags: [Release]
---

## Change Log

Flamework will begin releasing packages with matching versions.
You should use the same version for every Flamework package.

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

<span style={{color: "crimson"}}>This release contains breaking changes.</span>

### Transformer
- TypeScript is now a peer dependency.
- Flamework will user the correct parameter length for user macros where it previously didn't (such as tuple rest parameters.)
- `delete` expressions will now work on component attributes.
- Improved union simplification for literal guard generation.
	- All `literal` guards will combine to a single guard, e.g `1 | 2` will no longer become `t.union(t.literal(1), t.literal(2))`

### Core
- Added a `profiling` option to `flamework.json` to enable memory categories and microprofiler labels.
- [Advanced user macros](#advanced-user-macros)

### Components
- Added doc comments to all component methods, also removed unnecessary overloads.
- Added `waitForComponent` API to wait until a component is added to a specific instance.
- Components will now warn whenever a component could not be created for 5+ seconds.
	- You can define `warningTimeout` in your component settings to override the time, set to 0 to disable.
- Added the ability to whitelist/blacklist specific ancestors.
	- These can be specified using `ancestorWhitelist` and `ancestorBlacklist` in your component settings.
	- <span style={{color: "crimson"}}>[BREAKING]</span> Defaults to `ancestorBlacklist: [ServerStorage, ReplicatedStorage]`
	- <span style={{color: "crimson"}}>[BREAKING]</span> This does not update when components are reparented.

### Networking
- Fixed an error whenever `NaN` was sent as an ID.

<!-- truncate -->

## Changes

### Advanced User Macros

Flamework now supports much more complex queries using user macros.
The new user macros give you the ability to create arbitrary queries based on inputted objects and arrays.

You can use any TypeScript syntax (mapped types, unions, conditional types, literals, etc) and Flamework will automatically
generate that object for you.

To use this new system, you must use the `Modding.Many` type.
```ts
/** @metadata macro */
function macro<T>(metadata?: Modding.Many<{ [k in keyof T]: Modding.Generic<T[k], "guard"> }>) {
	assert(metadata);
}

// This will generate a new object with the same keys as T, but containing the guard for each element.
macro<{ a: string, b: number }>();
```

#### Literals

Flamework supports generating literal values (numbers, strings, undefined, etc) which can be used to represent complex types, such as conditionals.

```ts
interface MacroMetadata<T> {
	isString: T extends string ? true : false;
	taggedConditional: T extends number
		? ["number", { value: T }]
		: ["unknown", { guard: Modding.Generic<T, "guard"> }];

	aString: T extends string ? `T is: ${T}` : `T is not a string`;
	aNumber: T extends number ? T : -1;
	aBoolean: T extends boolean ? T : false;
	maybeNothing: T extends string | number | boolean ? T : undefined;
}
```

#### De-unification

Flamework allows you to convert unions to an array of all constituents.
You can do this simply by wrapping your union in an array.

```ts
function macro<T>(metadata?: Modding.Many<(keyof T)[]>): void;
// OR
function macro<T>(metadata?: Modding.Many<Array<keyof T>>): void;
```

#### Utility types

Flamework also exposes several more types that user macros can use to leverage certain features of Flamework.
```ts
interface MacroMetadata<S extends string, T extends unknown[]> {
	hash: Modding.Hash<S, "optional context">,

	// Same as `Modding.Hash`, except it is disabled when Flamework obfuscation is off.
	obfuscated: Modding.Obfuscate<S, "optional context">,

	// Fetches the labels from the tuple.
	// This can also be used to fetch parameter names from `Parameters<T>`
	labels: Modding.TupleLabels<T>.
}

function macro<S extends string, T extends unknown[]>(metadata?: Modding.Many<MacroMetadata<S, T>>): void;
```

#### Inspect

There may be cases where you'd want to utilize some of Flamework's user macros features in plain code.
For example, you might want to retrieve every key from a type, or generate a guard for every member of a type.

Flamework provides the `Modding.inspect<T>()` macro which runs `T` through Flamework's user macro system.
```ts
type MyConstant = typeof myConstant;
const myConstant = {
	a: { value: "default" },
	b: { value: 15 },
} as const;

const constantMetadata = Modding.inspect<{
	keys: (keyof MyConstant)[],
	guards: {
		[k in keyof MyConstant]: Modding.Generic<MyConstant[k]["value"], "guard">
	},
}>();
```

## Previous Release
As of this release, Flamework will begin releasing all Flamework updates with matching versions.
These are the previous versions that you can revert to if you have any issues.
```
@flamework/core: 1.0.0-beta.8
@flamework/networking: 1.0.0-beta.9
@flamework/components: 1.0.0-beta.12
rbxts-transformer-flamework: 1.0.0-beta.15
```
