---
title: Configuration
---
Components have a few features we haven't covered yet!

## Predicate
You can add a `predicate` function to a component to determine if the component should be constructed for a provided instance.

This only affects Components created via **CollectionService**!
```ts
@Component({
	tag: "Example",
	predicate: ( instance ) => instance.FindFirstAncestorOfClass("PlayerGui") !== undefined,
})
export class ExampleComponent extends BaseComponent implements OnStart {}
```

## Streaming
Flamework components support `StreamingEnabled` and will try to ensure that instances are fully loaded in before a component is initialized.
If you need to change Flamework's streaming behavior, you can do so with the `streamingMode` configuration.

```ts
export enum ComponentStreamingMode {
	/**
	 * This disables instance guard streaming, and will only run the instance guard once.
	 */
	Disabled,

	/**
	 * This will watch for any changes to the instance tree, and rerun the instance guards.
	 */
	Watching,

	/**
	 * This determines the appropriate streaming mode based on a couple of factors.
	 *
	 * If on the server, this will always behave like `Disabled`.
	 *
	 * If on the client, and the attached instance is an `Atomic` model, this will behave like `Disabled`.
	 *
	 * Otherwise, this behaves like `Watching`.
	 */
	Contextual,

	/**
	 * This is equivalent to {@link ComponentStreamingMode.Contextual Contextual}.
	 */
	Default = Contextual,
}
```

## Instance Guard
The `instanceGuard` is similar to `predicate`, but serves a slightly different purpose.

* On the server, an error will be thrown if a component is attempted to be created, but the `instanceGuard` fails.
* On the client, a connection will be created to wait for `DescendantsAdded` & `DescendantsRemoving` until the `instanceGuard` passes. This is because instances can be sent to the client in pieces and the whole thing might not have arrived yet.

Note: Using `instanceGuard` will override the automatically generated type guard, which is created when providing the `BaseComponent` with an Instance type!
```ts
@Component({
	tag: "Example",
	instanceGuard: Flamework.createGuard<any>()
})
export class ExampleComponent extends BaseComponent<{}, Model> implements OnStart {}
```

## Defaults
You can use `defaults` to specify the value of the Component's attributes if they were not set before creating the Component.

Normally, you must assign all the attributes to a Component otherwise it will not be created. If you specify the `defaults` though, the Component can be created without specifying those attributes.
```ts
interface Attributes {
	amount: number
}

@Component({
	tag: "Example",
	defaults: {
		"amount": 1
	}
})
export class ExampleComponent extends BaseComponent<Attributes, Part> implements OnStart {}
```

## Attributes
You can use `attributes` to specify custom type guards for attributes defined in your Component's attribute interface.

The example uses the [t package](https://www.npmjs.com/package/@rbxts/t) to specify the value of the `amount` attribute, which should only ever be a number between 1 and 5.
```ts
interface Attributes {
	amount: number
}

@Component({
	tag: "Example",
	attributes: {
		amount: t.numberConstrained( 1, 5 )
	}
})
export class ExampleComponent extends BaseComponent<Attributes> implements OnStart {}
```

## Refresh Attributes
(Default `true`)

Specifies if the Component should update its `attributes` when `SetAttribute` is called on the Component after it has been created.

If set to `false`, the Components attributes (`this.attributes.example`) will not be updated to the value set when using `SetAttribute`, after the Component has been created.

Note: Setting `refreshAttributes` to false will disable the `onAttributeChanged` handlers!
```ts
interface Attributes {
	amount: number
}

@Component({
	tag: "Example",
	refreshAttributes: false
})
export class ExampleComponent extends BaseComponent<Attributes, Part> implements OnStart {}
```

## Ancestor Whitelist/Blacklist
Flamework components, by default, will ignore all instances under `ServerStorage`, `ReplicatedStorage`, `StarterPack`, `StarterGui`, and `StarterPlayer`.
It is possible to override this default behavior using the `ancestorBlacklist` and `ancestorWhitelist` component configuration.

When a whitelist is provided, the component will only be created under the services specified. This also takes priority over the ancestor blacklist, effectively disabling any blacklist (including the default one listed above.)

When a blacklist is provided, the component will not be created under the services specified.

Ancestor configuration only affects `CollectionService` components and will not affect the scripting API.

```ts
@Component({
	tag: "ExampleComponent",
	ancestorBlacklist: [Lighting],
	ancestorWhitelist: [Workspace],
})
export class ExampleComponent extends BaseComponent {}
```

## Yield Warning
Flamework will warn after five seconds if a component cannot be attached to an instance (e.g if its instance guard does not pass.)

Generally, you will only encounter this warning when something has gone wrong (your instance is missing vital descendants, for example) but sometimes, you intend for components to not immediately be created, in which case you can configure the warning timeout using the `warningTimeout` configuration.

```ts
@Component({
	tag: "ExampleComponent",

	// Disable the warning entirely.
	warningTimeout: 0,

	// Warn only after 60 seconds have passed.
	warningTimeout: 60,
})
export class ExampleComponent extends BaseComponent {}
```
