---
title: Ignition!
---

You've written your services, you've written your controllers, now it's time to ignite Flamework!

## Preload necessary modules

Before you can ignite Flamework, it's necessary to preload your services, controllers, components and so on.
The easiest way to do this is by using the Flamework.addPaths macro.

```ts
// server
Flamework.addPaths("src/server/services");
Flamework.addPaths("src/server/components");
Flamework.addPaths("src/shared/components");

// client
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/client/components");
Flamework.addPaths("src/shared/components");
```

## Ignite!

That's it! You can now safely ignite Flamework.

```ts
Flamework.ignite()
```
