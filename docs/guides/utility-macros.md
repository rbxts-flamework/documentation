---
title: Utility Macros
---

<!---
	Order (omit if not necessary):
		Description
		Parameters
		Returns
-->

## `Flamework.addPaths`
```ts
function Flamework.addPaths(...paths: string[]): void
```
### Description
Preloads all modules under the paths passed into the function.

### Parameters
#### `...paths`
A list of filesystem paths to preload.

The paths are relative to the project directory however, if prefixed with `./`, you can make the path relative to the file it's in.

Globs are also supported (e.g `src/folder/*/client` or `src/folder/**/client`) however, when using globs, you can only preload entire folders and relative paths are disabled.

---
## `Flamework.id`
```ts
function Flamework.id<T>(): string;
```
### Description
Fetches the unique identifier Flamework uses for the type parameter `T`. These IDs are used to retrieve classes, specify metadata, etc.

### Returns
The generated ID for the type parameter `T`.

---
## `Flamework.implements`
```ts
function Flamework.implements<T>(obj: unknown): obj is T;
```

### Description
Checks if the passed in object implements the type parameter `T`. This checks at runtime using metadata attached by Flamework, which means it only works on Flamework classes.

### Parameters
#### `obj`
The object to check.

---
## `Flamework.createGuard`
```ts
function Flamework.createGuard<T>(): t.check<T>;
```

### Description
Creates a guard for the type parameter `T`.

Guards are generated in a way that mimicks how the type can be used in TypeScript which means generics will resolve to their constraints, (unsimplified) conditionals will resolve to a union between both true/false types, etc.

### Returns
The generated guard for type parameter `T`.

---
## `Flamework.hash`
```ts
function Flamework.hash(str: string, context: string = "@"): string;
```

### Description
Hashes a string literal. Hashes are randomly generated but only regenerated when compilation is restarted which guarantees they will be the same value everywhere they are used.

### Parameters
#### `str`
The string to hash.

#### `context`
The context which this string should be hashed. Two identical strings compiled under different contexts will result in different hashes. This is used to separate hashes used for different things (e.g networking uses the `remotes` context).

### Returns
The hashed string.
