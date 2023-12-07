---
title: Attributes
---
Components support attributes out of the box! It'll even generate type guards for each attribute, automatically.

## Adding attributes to a component
Adding attributes to a component is very straightforward. Define an interface, pass it into BaseComponent, and voila!
```ts
interface Attributes {
	prop1: string,
	prop2: number,
}

@Component()
export class MyComponent extends BaseComponent<Attributes> implements OnStart {
	onStart() {
		print(this.attributes.prop1, this.attributes.prop2);
	}
};
```

## Default attributes
By default, Flamework will throw an error when a component is added to an instance which does not pass the attribute guards.
If you define default attributes, Flamework will simply ignore incorrect (or missing) attributes and replace them with the default.
```ts
@Component({
	defaults: {
		prop1: "My default string!",
		prop2: 02496
	}
})
```

## Refined type guards
The TypeScript type system can't always perfectly reflect the input you expect, which also means Flamework's type guard generation can't either.
If there's an attribute that requires a guard that can't be generated from the type, e.g a constrained number, you can manually specify your own guards.
Flamework will still use the generated guard for any prop that isn't specified.
```ts
@Component({
	attributes: {
		prop2: t.numberConstrained(1, 5)
	}
})
```

## Mutable attributes
The attributes object on components is mutable, so you can change the value and it'll change in both the component's copy and on the instance.
```ts
export class MyComponent extends BaseComponent<Attributes> implements OnStart {
	onStart() {
		print(this.attributes.prop2++);

		print(this.attributes.prop1);
		this.attributes.prop1 += "suffix!";
		print(this.attributes.prop1, this.instance.GetAttribute("prop1"));
	}
}
```

## Attribute Changes
If refreshAttributes is enabled, you can listen for changes to attributes on the component's instance.
Flamework will only fire the handlers if the new attribute's value is valid.

```ts
export class MyComponent extends BaseComponent<Attributes> implements OnStart {
	onStart() {
		this.onAttributeChanged("prop1", (value, oldValue) => {
			print("Value is now: ", value);
			print("Value was: ", oldValue);
		})
	}
}
```

## Disabling automatic attribute updates
By default, Flamework will listen for attribute changes. You can turn this behavior off, however this will also disable onAttributeChanged handlers.
```ts
@Component({
	refreshAttributes: false
})
```
