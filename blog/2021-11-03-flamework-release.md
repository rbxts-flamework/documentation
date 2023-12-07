---
title: November 3rd Release
authors: fireboltofdeath
---

## Change Log

This release is primarily bug fixes. Some bugs may require manual action on your part, see [transformer](#potentially-breaking) and [networking](#potentially-breaking-1)

### Transformer
- Fixed conditional type guard generation.
- Fixed properties that do not have initializers in components.
- Fixed constructor-inferred types on components.
- Fixed abstract members on components.
- Fixed Enum guard generation.
- Fixed Enum union (`Enum.A | Enum.B`) guard generation.
- Add warning when `Dependency` macro is outside of a function.
- Add support for EnumItem literal guard generation.
- Decreased output clutter when compiling in verbose mode.
- Improved TS version mismatch errors.
##### Potentially breaking
- [Improved `addPaths` macro.](#addpaths-improvements)

---
### Core
- Removed preloaded messages

---
### Networking
- Server-sided events and functions now have `predict` methods.
##### Potentially breaking
- Middleware and networking function connections are now (optionally) asynchronous.
	- This may require changes for existing networking function middleware, as `processNext` now returns a promise.

---
### Components
- Fixed incorrect return type on `Components.getComponent`

<!-- truncate -->

## Changes

### `addPaths` improvements
`addPaths` once again supports preloading only specific files as well as relative paths.
When using globs (e.g * or **), relative paths will be disabled and only entire folders can be preloaded.

If your project is a multi-place project, you will have to update your paths to be relative to your project's root directory due to a bug with `addPaths` which has now been fixed.

## Previous Release
If you run into any issues with the update, you should revert your packages to these specific versions.
```
@flamework/core: 1.0.0-beta.1
@flamework/networking: 1.0.0-beta.5
@flamework/components: 1.0.0-beta.4
rbxts-transformer-flamework: 1.0.0-beta.7
```
