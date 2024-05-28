---
title: Creating a Singleton
---
Flamework allows you to create Services (server) and Controllers (client). These are both singletons, meaning there will only ever be one instance of them. The only difference between the two is where they run. Services run on the server, while controllers run on the client. This means controllers have access to an OnRender lifecycle event that services do not.

## Lifecycle Events
Services, controllers and the like are able to implement lifecycle events. The functionality of these varies, but they all work the same way: implementing the proper interface.

Simply having a method with the same name as the lifecycle event isn't enough as all lifecycle events are opt-in, you have to explicitly declare your intent to subscribe to a specific lifecycle event. This is done by using `implements LifecycleEvent` on your class declaration.

## Basic Service

This is a bare minimum example of a service with a lifecycle event connected.

```ts
import { Service, OnTick } from "@flamework/core";

@Service()
export class MyService implements OnTick {
	onTick(dt: number) {
		print("My service is ticking", dt);
	}
}
```

## Basic Controller

This is a bare minimum example of a controller with a lifecycle event connected.

```ts
import { Controller, OnRender } from "@flamework/core";

@Controller()
export class MyController implements OnRender {
	onRender(dt: number) {
		print("My controller is rendering", dt);
	}
}
```

## Load Order

:::info Dependency Injection
When you use dependency injection, Flamework will automatically determine the correct load order for you, so it is recommended to avoid setting this manually.

This property will take priority over Flamework's automatic order but singletons with the same load order will still run in the automatic order.
:::


You can use the `loadOrder` configuration to override the order that singletons will call `OnInit` and `OnStart`.

The default `loadOrder` property defaults to `1` and decreasing the `loadOrder` causes the singleton to load earlier.

```ts
@Controller({
	loadOrder: 0 // Loads BEFORE all other controllers with default loadOrder
})
```

```ts
@Controller({
	loadOrder: 2 // Loads AFTER all other controllers with default loadOrder
})
```
