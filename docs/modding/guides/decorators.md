---
title: Decorators
---
This guide is for creating a custom decorator.

## Defining the decorator
Flamework has two kinds of decorators, meta decorators and normal decorators.

All Flamework decorators add the metadata necessary for the modding API, however, normal decorators also allow you to run a custom function afterwards. This function is passed information about where it was applied as well as the arguments passed into it.

You are also able to define metadata which will be generated when a class uses your decorator as shown in [the metadata docs](../metadata#how-do-i-request-metadata).

```ts
// Property Decorators
export const FieldDecorator = Modding.createMetaDecorator<[string]>("Property");
export const FieldDecorator = Modding.createDecorator<[string]>("Property", (descriptor, [name]) => {
	print("Decorated field", descriptor.isStatic, tostring(descriptor.object) + "." + descriptor.property);
	print("Passed in name:", name);
});

// Method Decorators
export const MethodDecorator = Modding.createMetaDecorator<[string]>("Method");
export const MethodDecorator = Modding.createDecorator<[string]>("Method", (descriptor, [name]) => {
	print("Decorated method", descriptor.isStatic, tostring(descriptor.object) + "." + descriptor.property + "()");
	print("Passed in name:", name);
});

// Class Decorators
export const NameDecorator = Modding.createMetaDecorator<[string]>("Class");
export const NameDecorator = Modding.createDecorator<[string]>("Class", (descriptor, [name]) => {
	print("Decorated object", descriptor.object);
	print("Passed in name:", name);
});

@NameDecorator("Peter")
class A {
	@FieldDecorator("John")
	public abc = 1;

	@FieldDecorator("Andrew")
	@MethodDecorator("Andrew")
	public method() {}
}
```

## Implementing the custom decorators
After defining the decorator and any metadata you want it to use, you can use the listeners API to implement it. It's recommended that you implement decorators in a service/controller so that they only occur after ignition.
```ts
@Service()
export class MyDecoratorService implements OnStart {
	onStart() {
		// Retrieve all constructors that are using the NameDecorator
		// You can do whatever you wish with the constructor from here
		// e.g construct an instance via Flamework's dependency resolution
		const constructors = Modding.getDecorators<typeof NameDecorator>();
		for (const { object, arguments: args } of constructors) {
			print(object, "is named", args[0]);
		}

		// Listen for new listeners that are using NameDecorator
		Modding.onListenerAdded<typeof NameDecorator>((object) => {
			// Retrieves the arguments from the decorator
			const decorator = Modding.getDecorator<typeof NameDecorator>(object);
			if (decorator) {
				const [name] = decorator.arguments;
				print(object, "is the child of", name);
			}

			// Retrieves all the FieldDecorators
			for (const [prop, decorator] of Modding.getPropertyDecorators<typeof FieldDecorator>(object)) {
				const [name] = decorator.arguments;
				print(object, "has prop", prop, "with name", name);
			}
		});
	}
}
```
