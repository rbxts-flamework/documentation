---
title: Listeners
---
A listener is an instance of a class which can be registered to receive lifecycle events or decorator behavior.

You can also turn arbitrary objects into listeners as long as you supply the necessary reflection metadata for lifecycle events/decorators (`flamework:implements` and `flamework:decorators`) respectively but it is easiest to use classes and let Flamework do this automatically.

## Adding a listener
You can use the `Modding.addListener` API to create a listener. Flamework will automatically fire relevant events (e.g onListenerAdded) based on the `flamework:implements` metadata as well the `flamework:decorators` metadata.

Flamework automatically adds all singletons, components or custom classes (when using [`Modding.createDependency`](./dependency-resolution)) as listeners.

```ts
@Decorator()
class A implements LifecycleEvent {}

Modding.addListener(new A());
```

## Removing a listener
You can use the `Modding.removeListener` API to remove a listener. Flamework will automatically fire relevant events (e.g onListenerRemoved) based on the `flamework:implements` metadata as well the `flamework:decorators` metadata.

Lifecycle events will no longer fire once the object is removed as a listener.
```ts
@Decorator()
class A implements LifecycleEvent {}

const obj = new A();
Modding.addListener(obj);
// some time later
Modding.removeListener(obj);
```

## Listener added/removed
Flamework exposes an `onListenerAdded` event as well as an `onListenerRemoved`. These events can be fired for any listener or you can specify a specific ID to listen for (Flamework only fires these events for decorator/lifecycle event IDs.)

```ts
// Fires when any listener is added.
Modding.onListenerAdded((obj) => {
	print("new listener!", obj);
})

// Fires when any listener is removed.
Modding.onListenerRemoved((obj) => {
	print("listener was removed!", obj);
})

// Fires whenever a listener subscribed to the MyLifecycle lifecycle event was added.
Modding.onListenerAdded<MyLifecycle>((obj) => {
	print("new listener for MyLifecycle!", obj);
	obj.myLifecycle();
})

// Fires whenever a listener subscribed to the MyLifecycle lifecycle event was removed.
Modding.onListenerRemoved<MyLifecycle>((obj) => {
	print("listener for MyLifecycle was removed!", obj);
})
```
