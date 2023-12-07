---
title: Dependencies
---
This page will cover how to retrieve singletons from inside other singletons, or anywhere else in your code.

## Dependency Injection
The preferred way to get references to your singletons is by using dependency injection. Flamework uses a constructor-based DI system, which means you simply specify the dependencies in your constructor and Flamework will automatically pass them when creating the singleton.

When you request a dependency through dependency injection, Flamework will [automatically determine the load order](./creating-a-singleton.md#load-order) of your singletons.

```ts
import { OtherService } from "./otherService";

@Service()
export class MyService {
	constructor(private otherService: OtherService) {}

	method() {
		print(this.otherService.getName());
	}
}
```

## Dependency Macro
If you cannot, or do not want to, use dependency injection then you can use the Dependency macro. The macro will grab a reference to your singleton and can be called from anywhere in your code, not just in other singletons.

:::danger Not Recommended
It is not recommended to use the `Dependency` macro.

While the `Dependency` macro can be more convenient, it can also harm your ability to stub, test or refactor your code.
You should pass dependencies down through dependency injection, e.g through function arguments, Roact `Context`s, etc.

The `Dependency` macro can also obfuscate the execution order of your singletons, as a dependency of a singleton might run *after* your singleton,
as Flamework cannot statically know your singleton depends on another.

When Flamework releases v2.0, the `Dependency` macro may be removed or be unable to run in certain contexts, e.g prior to ignition.

If those aspects do not matter to you, then you can proceed, I won't stop you.
:::

Some examples of where you may use the Dependency macro over DI:
* Utility functions
* Roact components

It is possible to bypass circular dependency errors using the `Dependency` macro, but this is not recommended and is widely considered an anti-pattern.

```ts
const myDependency = Dependency<MyDependency>();
```
