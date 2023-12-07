---
title: User Macros
---
User macros are macros that can be defined by user code. They allow you to tap into metadata about type parameters and the call site.

## Defining a user macro
You define a macro simply by using the `@metadata macro` tag and using one of Flamework's macro types as a parameter.

User macros can be defined on classes (constructors), methods, and plain functions.

If you'd like users to be able to pass arguments to a macro argument, you are able to use a union.
Whenever Flamework encounters a macro argument with a union, it will use the first macro type it encounters, or ignore the argument if a user has passed one.

Certain Flamework macros use this behavior to allow users to pass strings where Flamework would otherwise generate an ID, such as `id?: string | Modding.Generic<T, "id">`.

```ts
/** @metadata macro */
function macro<T>(abc?: Modding.Generic<T, "id">, xyz?: Modding.CallerMany<"line" | "char">) {
	assert(abc && xyz);

	print(abc, `${xyz.line}:${xyz.char}`);
}

macro<MyInterface>();
```

## Nesting user macros
If you have a user macro that you'd like to call from within another user macro, you will need to include the macro's metadata in your signature, and pass it down.

With `Modding.GenericMany` and `Modding.CallerMany`, you can include additional metadata and it can still be passed down.
For more complex macros, it is recommended to export your macro's metadata so that consumers can use your macro in their own.

```ts
type BaseMacroMetadata<T> = Modding.GenericMany<T, "id" | "text">;

/** @metadata macro */
function baseMacro<T>(abc?: BaseMacroMetadata<T>) {}

/** @metadata macro */
function newMacro<T>(param: string, macro?: BaseMacroMetadata<T>) {
	return baseMacro<T>(macro);
}
```

## Advanced User Macros

Flamework supports a more advanced form of user macros allowing you to perform arbitrary conditions, mapped types and similar at compile time.
This is achieved using the `Modding.Many` user macro API.

I've provided a list of syntax that you can use, but it is not exhaustive and Flamework can generate most types without any issues.

#### Exposing your macro metadata

In libraries, it is recommended that you specify macro metadata in an interface and expose it publicly.
This allows users to easily nest your macro inside of their own.

```ts
export interface DoSomethingMacro<T> {}

declare function doSomething<T>(metadata?: Modding.Many<DoSomethingMacro<T>>);
```

### Objects / Tuples

You can provide an object or a tuple to `Modding.Many` and Flamework will generate an identical value when the function is called, for example:

```ts
declare function macro<T>(metadata?: Modding.Many<{ a: Modding.Generic<T, "id">, b: Modding.Caller<"uuid"> }>);
declare function macro<T>(metadata?: Modding.Many<[Modding.Generic<T, "id">, Modding.Caller<"uuid">]>);
```

### Arrays

Besides tuples, Flamework also supports generating arrays using de-unification.
This means that you are able to turn a union (e.g `keyof T`) into an array of all constituents.

```ts
declare function macro<T>(keysOfT?: Modding.Many<(keyof T)[]>);
```

### Mapped types

You are able to use mapped types to generate derivatives of an object which can be used to fetch additional information about members of a type.

```ts
declare function macro<T>(guardsForEachMember?: Modding.Many<{ [k in keyof T]: Modding.Generic<T[k], "guard"> }>);
```

### Literals / Conditionals

You can use conditional types to simulate if statements at compile-time.
Flamework supports generating most literal values such as numbers, strings, booleans and undefined.

```ts
declare function macro<T>(isString?: Modding.Many<T extends string ? true : false>);
```

## Utility types

Flamework provides some additional utility types besides `Modding.Generic` and `Modding.Caller` which you can find here.

### Modding.Hash

`Modding.Hash` allows you to generate a UUID based off a string (and an optional context.)

### Modding.Obfuscate

This behaves identically to `Modding.Hash` except it is only enabled when Flamework obfuscation is enabled.

### Modding.TupleLabels

This retrieves the labels of a tuple and can be used in conjunction with `Parameters<T>` to retrieve parameter names from a function type.

## Generic Metadata
Generic metadata exposes some built-in Flamework functions for types, such as guard generation and ID generation.
The input does not have to be a type parameter, and you can use it on any types, such as a mapped type.

This metadata can be accessed through `Modding.Generic<T, M>` where `T` is the target type, and `M` is a string literal for the name of the metadata.

Whilst `Modding.Generic` can only retrieve one metadata at a time, `Modding.GenericMany` can generate an object given a union of metadata, e.g `"id" | "text"`.

```ts
interface GenericMetadata<T> {
	/**
	 * The ID of the type.
	 */
	id: string;

	/**
	 * A string equivalent of the type, such as the one displayed in your code editor.
	 */
	text: string;

	/**
	 * A generated guard for the type.
	 */
	guard: t.check<T>;
}
```

## Callsite Metadata
You can access callsite metadata by using `Modding.Caller<M>`. Metadata about the source text ignores leading and trailing trivia.

Whilst `Modding.Caller` can only retrieve one metadata at a time, `Modding.CallerMany` can generate an object given a union of metadata, e.g `"line" | "character"`.

```ts
	interface CallerMetadata {
		/**
		 * The starting line of the expression.
		 */
		line: number;

		/**
		 * The char at the start of the expression relative to the starting line.
		 */
		character: number;

		/**
		 * The width of the expression.
		 * This includes the width of multiline statements.
		 */
		width: number;

		/**
		 * A unique identifier that can be used to identify exact callsites.
		 * This can be used for hooks.
		 */
		uuid: string;

		/**
		 * The source text for the expression.
		 */
		text: string;
	}
```
