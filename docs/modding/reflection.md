---
title: Reflection
---
Flamework comes with a reflection library which is where all generated metadata is stored.

## General API
Flamework follows [this proposal](https://rbuckton.github.io/reflect-metadata/) for its design.
<details>
<summary>API</summary>

```ts
// define metadata on an object or property
Reflect.defineMetadata(metadataKey, metadataValue, target);
Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);

// check for presence of a metadata key on the prototype chain of an object or property
let result = Reflect.hasMetadata(metadataKey, target);
let result = Reflect.hasMetadata(metadataKey, target, propertyKey);

// check for presence of an own metadata key of an object or property
let result = Reflect.hasOwnMetadata(metadataKey, target);
let result = Reflect.hasOwnMetadata(metadataKey, target, propertyKey);

// get metadata value of a metadata key on the prototype chain of an object or property
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, target, propertyKey);

// get metadata value of an own metadata key of an object or property
let result = Reflect.getOwnMetadata(metadataKey, target);
let result = Reflect.getOwnMetadata(metadataKey, target, propertyKey);

// get all metadata keys on the prototype chain of an object or property
let result = Reflect.getMetadataKeys(target);
let result = Reflect.getMetadataKeys(target, propertyKey);

// get all own metadata keys of an object or property
let result = Reflect.getOwnMetadataKeys(target);
let result = Reflect.getOwnMetadataKeys(target, propertyKey);

// delete metadata from an object or property
let result = Reflect.deleteMetadata(metadataKey, target);
let result = Reflect.deleteMetadata(metadataKey, target, propertyKey);
```
</details>

## Flamework API
This is the flamework specific APIs added to the reflection library.

### Reflect.getProperties / Reflect.getOwnProperties
```ts
function Reflect.getProperties(obj: object): string[]
```
This function gets the name of every property which has metadata attached.

## `identifier`
The Reflect library treats `identifier` differently from other metadata. It populates some lookup maps, such as `Modding.getObjectFromId`, and also guarantees uniqueness. You should not assign this manually as Flamework will assign it automatically.
