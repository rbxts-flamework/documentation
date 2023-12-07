---
title: Singletons
---
This guide is for creating a custom singleton.

You should see the [custom decorator guide](./decorators) and the [dependency resolution guide](./dependency-resolution) for additional information.

## Defining the singleton decorator
You need to define the decorator you will use for your singleton. This is identical to defining any other decorator and you can choose between a meta decorator or normal decorator.

```ts
/**
 * Request the required metadata for lifecycle events and dependency resolution.
 * @metadata flamework:implements flamework:parameters
 */
export const Singleton = Modding.createMetaDecorator("Class");
```

## Using the singletons
Flamework will automatically create and manage singletons whenever they're used for dependency injection. You simply need to use your singleton (via the Dependency macro or constructor DI) and Flamework will instantiate it.

```ts
@Singleton()
class MySingleton {}

const mySingleton = Dependency<MySingleton>();
```

## Ensuring the singletons always load
Flamework will only create and manage singletons *if* they're requested, however, this may not be ideal as your singleton might not be explicitly used anywhere. If you want your singletons to always be created, you can use `Modding.resolveSingleton` to create them manually.

```ts
@Service()
export class SingletonService implements OnStart {
	onStart() {
		const constructors = Modding.getDecorators<typeof Singleton>();
		for (const { object } of constructors) {
			// Create the singleton manually.
			Modding.resolveSingleton(object);
		}
	}
}
```
