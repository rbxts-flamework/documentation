---
title: Dependency Resolution
---
This guide is for augmenting Flamework's dependency resolution, creating dependencies using dependency resolution and injecting custom values into the dependency resolution.

Augmenting dependency resolution only affects constructor DI. The `Dependency` macro is only usable for singletons.

## Creating custom objects
If you want to create custom objects, that aren't singletons, while allowing Flamework to resolve its dependencies then you can use the `Modding.createDependency` API. This is the API that [Flamework's component system](../../additional-modules/components/creating-a-component) also uses.

You can manipulate the dependency resolution by passing [DependencyResolutionOptions](#dependencyresolutionoptions) as the second parameter.

```ts
@MyDecorator()
class MyDecoratorClass {
	constructor(protected dependency: MyService) {
		print(dependency);
	}
}

const myDecoratorClass = Modding.createDependency(MyDecoratorClass);
```

## Injecting custom dependencies
Sometimes, you want to inject a value into Flamework's dependency resolution which can be used by any class. The modding API supports this using `Modding.registerDependency<T>`

This API takes a function which will pass the constructor being resolved and can return any value. The function is called whenever the specified ID is being resolved.

This must be called prior to any attempts to resolve the specified ID, meaning prior to ignition. Preloading can also cause singletons to be resolved, though that is a bad practice.

```ts title="dependencies.ts"
// This uses a marker type to prevent type interning.
export type Name = string & { _marker?: void };
export type Version = string & { _marker?: void };
Modding.registerDependency<Name>((ctor) => tostring(ctor));
Modding.registerDependency<Version>(() => "v1.5.2");
```

```ts title="services/myService.ts"
@Service()
export class MyService {
	constructor(private name: Name, private version: Version) {
		assert(name === "MyService");
		assert(version === "v1.5.2");
	}
}
```

## Augmenting singleton dependency resolution
Singletons can be resolved at any point in time, so it is not safe to pass [DependencyResolutionOptions](#dependencyresolutionoptions) to `Modding.resolveSingleton` like you can with `Modding.createDependency`.

If you'd like to change the dependency resolution behavior, you can set the `flamework:dependency_resolution` reflection metadata to a valid [DependencyResolutionOptions](#dependencyresolutionoptions). This should be done in a decorator attached to your class as this ensures the singleton is not resolved prior to the metadata being attached.

```ts
export const Singleton = Modding.createDecorator("Class", (descriptor) => {
	Reflect.defineMetadata(descriptor.object, "flamework:dependency_resolution", {
		handle: (id: string, index: number) => {
			print(descriptor.object, "is resolving", id);
		}
	})
})
```

## DependencyResolutionOptions
These are the options available to augment dependency resolution.

```ts
interface DependencyResolutionOptions {
	/**
	 * Fires whenever a dependency is attempting to be resolved.
	 *
	 * Return undefined to let Flamework resolve it.
	 */
	handle?: (id: string, index: number) => unknown;

	/**
	 * Fires whenever Flamework tries to resolve a primitive (e.g string)
	 */
	handlePrimitive?: (id: string, index: number) => defined;
}
```
