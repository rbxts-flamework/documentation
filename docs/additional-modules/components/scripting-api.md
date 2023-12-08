---
title: Scripting API
---
Flamework exposes a Components singleton which can be used on both server and client. Inside, there are several methods that allow you to interface with Flamework's components. You can grab a reference to this singleton the same way as you do any others, [as documented](/docs/guides/dependencies).

## Retrieving a component
If you'd like to retrieve the component attached to a specific instance, you can use `Components.getComponent<T>(instance)`

There is additionally `Components.waitForComponent<T>(instance)` whenever you want to wait for a component to be added to the specific instance.
This returns a promise that can be cancelled to clear up resources if necessary.

```ts
import { Components } from "@flamework/components";

const components = Dependency<Components>();
const myComponent = components.getComponent<MyComponent>(game);
if (myComponent) {
	myComponent.method();
}

components.waitForComponent<MyComponent>(game).then((myComponent) => {
	myComponent.method();
});
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

## Polymorphic APIs
Sometimes, you might want components to support generic features like `OnInteract`, or `BaseEnemy`, however the `getComponent` API will only fetch exact components.

Flamework exposes two APIs to support this behavior, `Components.getComponents<T>(instance)` and `Components.getAllComponents<T>(instance)`.

```ts
const components = Dependency<Components>();

// A hypothetical OnInteract interface, similar to a lifecycle event.
print("interactable components:", components.getComponents<OnInteract>(Workspace.MyInteractableItem));

// Getting all components that extend a BaseEnemy class.
print("enemies:", components.getAllComponents<BaseEnemy>());
```
