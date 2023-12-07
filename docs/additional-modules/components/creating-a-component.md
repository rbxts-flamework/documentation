---
title: Creating a Component
---

A component is a class which is attached to a Roblox instance.
It's able to access lifecycle events, as well as use constructor DI.
A component is useful for representing objects inside of your game world, for example a door, a vehicle or a weapon.

Refer to [Lifecycle Events](/docs/guides/lifecycle-events) for which lifecycle events work on components.

## Declaring the component

Declaring a component is very similar to the way you declare singletons, except you must extend the base component class: BaseComponent.
```ts
import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

@Component()
export class MyComponent extends BaseComponent implements OnStart {
	constructor(private myDependency: MyDependency) {
		super();
	}

	onStart() {
		print(`Wow! I'm attached to ${this.instance.GetFullName()}`);
	}
}
```

## Using the component

There are two ways you can attach an instance to a component, the [Scripting API](/docs/additional-modules/components/scripting-api) and a CollectionService tag. If you'd like to use the Scripting API, refer to the linked documentation.

If you'd like to use a CollectionService tag, it's very simple! Just specify it in your Component's config.
```ts
@Component({
	tag: "my-cs-tag",
})
```

## Instance type

You likely only want your component to be instantiated on the correct objects.
The first type parameter of BaseComponent is for [attributes](/docs/additional-modules/components/attributes), however the second allows you to specify a custom Instance type. Flamework will automatically generate a type guard for it, and prevent attaching your component to invalid objects.

```ts
interface MyComponentInstance extends Model {
	hinge: BasePart & {
		constraint: HingeConstraint
	},
}

export class MyComponent extends BaseComponent<{}, MyComponentInstance> implements OnStart {
	onStart() {
		print(this.instance.hinge.constraint);
	}
}
```
