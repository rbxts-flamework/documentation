---
title: User Macros
---
User macros are custom Flamework-style macros that can be defined by user code. They allow you to tap into metadata about type parameters and the call site.

## Defining a user macro
You define a macro simply by using the `@metadata macro` jsdoc and using one of Flamework's utility types as a parameter. You can also pass down generics from other user macros into this macro by passing a Modding.Generic/Caller with the necessary metadata.

This can be defined on methods, classes (for `new A()`) and is also supported everywhere that the `@metadata` tag is, e.g in lifecycle events.
```ts
/** @metadata macro */
function macro<T>(abc?: Modding.Generic<T, "id">, xyz?: Modding.Caller<"line" | "char">) {
	assert(abc && xyz);

	print(abc.id, `${xyz.line}:${xyz.char}`);
}

macro<MyInterface>();
```

## Nesting user macros
If you have a user macro that you'd like to call from within another user macro, you can pass down the `Modding.Generic/Caller` objects as long as they have the necessary metadata.
```ts
/** @metadata macro */
function baseMacro<T>(abc?: Modding.Generic<T, "id">) {}

/** @metadata macro */
function newMacro<T>(param: string, abc?: Modding.Generic<T, "id" | "text">) {
	// do something with abc.text
	return baseMacro<T>(abc);
}
```

## Advanced User Macros

Flamework supports a more advanced form of user macros allowing you to perform arbitrary conditions, mapped types and similar at compile time.
This is achieved using the `Modding.Many` user macro API.

I've provided a list of syntax that you can use, but it is not exhaustive and Flamework can generate most types without any issues.

#### Exposing your macro metadata

In libraries, it is recommended that you specify macro metadata in an interface and expose it publicly.
This allows users to easily nest your macro inside of their own.
This can be an interface or a type alias, but remember to only use `Modding.Many` under the actual macro.

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
You can access generic metadata by using `Modding.Generic<T, M>`. `T` does not have to be a type parameter and could contain any type, e.g `keyof T` or `{ [k in keyof T]: string }`.

### id
The ID of the `T`.

### guard
An automatically generated type guard for `T`. This function is also typed as `t.check<T>` meaning you can use it without casting.

### text
The text equivalent of `T`.

## Callsite Metadata
You can access callsite metadata by using `Modding.Caller<M>`. Metadata about the source text ignores leading and trailing trivia.

### line
The line number that this call is on, starting at 1.

### char
The character that this call is on, starting at 1.

### width
The length of the expression's text.

### text
The text of the expression.

### uuid
A randomly generated universally unique identifier. This can be used to identify a specific callsite.
