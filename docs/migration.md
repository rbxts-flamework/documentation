---
title: Migration
---

# Migrating to the beta
If you have an existing codebase that you want to migrate to the Flamework beta, you can follow these instructions.

If you do not have an existing codebase, please refer to [the installation guide](/docs/installation).

## Uninstall old Flamework
You should uninstall the @rbxts/flamework module as it is no longer used.
```bash
npm uninstall @rbxts/flamework
```

## Update your transformer
```bash
npm i -D rbxts-transformer-flamework@latest
```

## Install new Flamework packages
The networking and components modules of Flamework have been split into separate packages. These are not required to be installed, unless you are currently using them.
```bash
npm i @flamework/core
npm i @flamework/networking # optional
npm i @flamework/components # optional
```

## Configuring the @flamework org
Flamework uses a custom npm org to host its packages, which requires additional configuration.

### Configure tsconfig.json
You'll need to add the @flamework scope to your typeRoots.

```json
typeRoots: ["node_modules/@rbxts", "node_modules/@flamework"]
```

### Configure default.project.json

Find the following json inside your `default.project.json`
```json
"node_modules": {
	"$path": "node_modules/@rbxts"
}
```

After you've found it, you'll want to replace it with the following json.
```json
"node_modules": {
	"$path": "node_modules/@rbxts",
	"@flamework": {
		"$path": "node_modules/@flamework"
	}
}
```

## Fixing your imports
Since Flamework is no longer a single package, you'll have to locate all imports and reimport from the correct module(s).

```ts
// previous
import { Component, BaseComponent, Flamework } from "@rbxts/flamework";

// new
import { Flamework } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
```

## Recompiling
Whenever updating/changing any Flamework packages or the transformer, you should always do a full recompile by deleting your `out` directory. Not doing a full recompile could result in undefined behavior.
