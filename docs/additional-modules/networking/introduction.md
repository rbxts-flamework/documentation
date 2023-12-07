---
title: Introduction
---
Flamework's networking is designed with ease of use and convenience in mind.

## Features
- [RemoteEvents](./remote-events)
	- One way communication between the server and client.
- [RemoteFunctions](./remote-functions)
	- Two way communication between the server and client.
- [Middleware](./middleware)
	- Modify, delay or drop requests on the receiver before being passed to handlers.
- Automatic type guards
	- Declare the event and let Flamework handle the rest ~~(except writing your code)~~!

## Naming
Networking events are named after the receiver. This means a `Client Event` is an event that the client will listen to while a `Server Event` is one that the server will listen to.

## Re-exporting
After you've defined your networking events and/or functions, you'll want to re-export the `server` and `client` fields from both.

This is not necessary but is highly recommended as it improves the developer experience. If you use the [roblox-ts vscode extension](https://marketplace.visualstudio.com/items?itemName=roblox-ts.vscode-roblox-ts) then the intellisense will hide the server objects on the client and vice-versa.

```ts
// Assumes your GlobalEvents/GlobalFunctions object is in shared/networking.ts
import { GlobalEvents } from "shared/networking";
import { GlobalFunctions } from "shared/networking";

// client/networking.ts
export const Events = GlobalEvents.client;
export const Functions = GlobalFunctions.client;

// server/networking.ts
export const Events = GlobalEvents.server;
export const Functions = GlobalFunctions.server;
```
