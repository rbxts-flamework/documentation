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

## Re-exporting
After you've defined your networking events and/or functions, you'll want to export the created `server` and `client` objects in separate files.

If you use the [roblox-ts vscode extension](https://marketplace.visualstudio.com/items?itemName=roblox-ts.vscode-roblox-ts) then the intellisense will hide the server objects on the client and vice-versa.

This will also allow you to hide server-specific configuration (such as generated type guards or middleware) from the client, for additional security.

```ts
// Assumes your GlobalEvents/GlobalFunctions object is in shared/networking.ts
import { GlobalEvents } from "shared/networking";
import { GlobalFunctions } from "shared/networking";

// client/networking.ts
export const Events = GlobalEvents.createClient();
export const Functions = GlobalFunctions.createClient();

// server/networking.ts
export const Events = GlobalEvents.createServer();
export const Functions = GlobalFunctions.createServer();
```
