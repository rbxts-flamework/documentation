---
title: June 9th Components Release
authors: fireboltofdeath
---

## Change Log

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

### Transformer
- Added `Vector2int16` to guard generation.
- Fixed a bug when your project has multiple rootDirs

### Components
- Default attributes are now applied as attributes onto instances.
- Components API will no longer turn explicit component specifiers into their ID form.
- Components API now allows you to pass strings as the component specifier.
- Components API now supports inheritance and implements.
	- The new `getComponents<T>(instance)` API will get all components that implement or extend from T.
	- The `getAllComponents<T>()` API will also get all components that implement or extend from T.
- Fixed a bug where onAttributeChanged would report an incorrect oldValue

<!-- truncate -->

## Previous Release
If you run into any issues with the update, you should revert your packages to these specific versions.
```
@flamework/core: 1.0.0-beta.4
@flamework/networking: 1.0.0-beta.6
@flamework/components: 1.0.0-beta.6
rbxts-transformer-flamework: 1.0.0-beta.10
```
