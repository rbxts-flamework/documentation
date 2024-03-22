---
title: Flamework v1.2.0
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
- Fixed the `constructor` field always being `undefined` on decorator descriptors.

### Networking
- Fixed a bug where Flamework would always create both a reliable and unreliable remote.

### Transformer
- [Reflection support for roblox-ts decorators.](#roblox-ts-decorators)
- Added support for nominal fields in guard generation.
	- This means types like `string & { _nominal_mynominalfield: never }` will become just `t.string`
- Fixed bug that triggered a diagnostic when extending a user macro class.
- Fix crash when generating guards with an `unknown` field.

<!-- truncate -->

## Changes

### roblox-ts decorators
Flamework now supports reflection for native roblox-ts decorators, and they can be used in place (or alongside) of Flamework decorators.

By default, Flamework will ignore roblox-ts decorators but you can specify the `@metadata reflect` JSDoc to enable Flamework's reflection.
Unlike Flamework decorators, roblox-ts decorators with the `reflect` metadata do not automatically generate *any* metadata, including the `identifier` metadata, which must be specified manually.

```ts
/** @metadata reflect identifier flamework:parameters */
const NewDecorator = (ctor: unknown) => {};

@NewDecorator
class MyClass {
	constructor(a: string) {}
}
```

As a caveat, you cannot currently use roblox-ts decorators with Flamework's modding API (listeners, `getDecorator`, `getDecorators`, `getPropertyDecorators`, etc.)

Support for these APIs may be added in a future update but can be implemented fairly easily without Flamework.
