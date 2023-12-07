---
title: Scripting API
---
Flamework exposes a Components singleton which can be used on both server and client. Inside, there are several methods that allow you to interface with Flamework's components. You can grab a reference to this singleton the same way as you do any others, [as documented](/docs/guides/dependencies).

## Retrieving a component
If you'd like to retrieve the component attached to a specific instance, you can use `Components.getComponent<T>(instance)`
```ts
import { Components } from "@flamework/components";

const components = Dependency<Components>();
const myComponent = components.getComponent<MyComponent>(game);
if (myComponent) {
	myComponent.method();
}
```

## Adding/removing a component
Similarly, if you'd like to add a component to a specific instance, you can use `Components.addComponent<T>(instance)`

If you'd like to remove a component, you can use `Components.removeComponent<T>(instance)`

Disclaimer: Components added via the scripting API do not get removed automatically. It is recommended that you use the `tag` config option which will automatically create and cleanup components, and also supports StreamingEnabled on the client.
```ts
import { Components } from "@flamework/components";

const components = Dependency<Components>();
components.addComponent<MyComponent>(game);
components.removeComponent<MyComponent>(game);
```
