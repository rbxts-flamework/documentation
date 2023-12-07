---
title: Flamework v1.0.0-beta.23
authors: fireboltofdeath
tags: [Release]
---

## Change Log

This is a maintenance update containing bug fixes, performance improvements and usability improvements.

[@flamework/core](https://github.com/rbxts-flamework/core/commits/master)
[@flamework/components](https://github.com/rbxts-flamework/components/commits/master)
[@flamework/networking](https://github.com/rbxts-flamework/networking/commits/master)
[rbxts-transformer-flamework](https://github.com/rbxts-flamework/transformer/commits/master)

### Transformer
- Fixed macros not transforming inside decorators and specialized decorator fields.
- Improved type guard generation errors and added elaboration for some types.

### Core
- Improved performance for `OnTick`, `OnPhysics` and `OnRender` lifecycle events by recycling threads.

### Components
- Improved component warnings.
	- Component warnings now include the component class name and no longer includes the component identifier.
	- You can now click on the instance name (note, not the path) to travel directly to that instance.

### Networking
- Added an option to warn on failed requests.
	- This can be enabled/disabled using the `warnOnInvalidGuards` in your networking configuration.
	- By default, `warnOnInvalidGuards` is enabled only in Studio.

<!-- truncate -->

## Previous Release
The previous version of Flamework is `1.0.0-beta.22`
