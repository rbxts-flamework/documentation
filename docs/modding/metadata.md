---
title: Metadata
---

This page explains Flamework's metadata system as well as the various metadata Flamework exposes. If you'd like to use the metadata Flamework generates, see the [Reflect api](./reflection).

If there is metadata that you'd like Flamework to generate but it currently doesn't, feel free to open an issue on the [Flamework repo](https://github.com/rbxts-flamework/core/issues).

## Why do I have to specify metadata?
One of Flamework's major goals is to be built upon. To achieve this, Flamework exposes lots of compile-time information to your code, but this metadata can add a lot of bloat if it is unused.

Specifying the metadata allows Flamework to generate as little bloat as possible, as you only generate what your code requires.

## How do I request metadata?

Flamework uses the `@metadata` jsdoc tag for metadata. You can place this tag on decorators, interface members or directly on the node. All requested metadata will get combined as shown in the following code.
```ts
/**
 * Generates metadata for users of this decorator.
 * @metadata flamework:parameter_names
 */
const Decorator = Modding.createMetaDecorator("Class");

/**
 * Generates metadata for implementors of this interface.
 * @metadata flamework:parameters
 */
interface MyInterface {
	/**
	 * Generates metadata for implementations of this method.
	 * @metadata flamework:parameter_guards
	 */
	method(...args: unknown[]): void;
}

/**
 * Generates metadata for the parent of this comment.
 * @metadata flamework:implements
 */
@Decorator()
class A implements MyInterface {
	constructor(param1: string) {}
	method(param1: string) {}
}
```

The example above uses plain text metadata, however, Flamework also supports link metadata. Link metadata allows you to reference a symbol/type in the `@metadata` tag. A caveat with link metadata is that it must be exported in packages otherwise TypeScript will not be able to find the referenced symbol.
```ts
type ConstructorConstraint = new () => defined;

/**
 * @metadata {@link ConstructorConstraint constraint}
 */
@Decorator()
class A {
	// ERROR!
	constructor(arg1: string) {}
}
```

## Universal Metadata
This lists all metadata that are valid on classes and fields.

---

### \{@link \[Reference] constraint}
This is a link metadata that allows you to specify a constraint that the field, or class, must follow. This is useful for statically ensuring that you are able to construct classes, call methods, etc.

## Class Metadata
This is all the metadata that can be generated on a class declaration.

Classes with constructors also support all [method metadata](#method-metadata).

---

### identifier
This generates the `identifier` metadata which is a unique identifier that refers specifically to this class.

This is only necessary on roblox-ts decorators as Flamework decorators automatically include this metadata.

### flamework:implements `string[]`
:::info
This metadata is required for lifecycle events. If you want to use lifecycle events, you must request this metadata.
:::

Specifies all the implemented interfaces using their Flamework IDs.

## Field Metadata
This is all the metadata that can be generated on a field (method or property).

---

### flamework:return_type `string`
Specifies the ID of the method's return type or a property's type.

### flamework:return_guard `t.check`
Generates a type guard for the return type of this method or the type of this property.

## Method Metadata
This is all the metadata that can be generated on a method or class (of its constructor).

---

### flamework:parameters `string[]`
:::info
This metadata is required by Flamework's dependency resolution. If you want to use Flamework's dependency resolution, you must request this metadata.
:::
Specifies the ID of every parameter.

### flamework:parameter_names `string[]`
Specifies the name of every parameter. If a binding is used then the name will be `_binding_`.

### flamework:parameter_guards `t.check[]`
Generates a type guard for every parameter.
