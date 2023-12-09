"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[9907],{1703:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=t(5893),d=t(1151);const i={title:"Middleware"},a=void 0,s={id:"additional-modules/networking/middleware",title:"Middleware",description:"Middlewares are functions that get called before the listener to any event or function. It's able to drop requests, delay requests or change the parameters and return value prior to listeners being called. Flamework does not bundle any middleware by default.",source:"@site/docs/additional-modules/networking/middleware.md",sourceDirName:"additional-modules/networking",slug:"/additional-modules/networking/middleware",permalink:"/docs/additional-modules/networking/middleware",draft:!1,unlisted:!1,editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/docs/additional-modules/networking/middleware.md",tags:[],version:"current",frontMatter:{title:"Middleware"},sidebar:"flamework",previous:{title:"Configuration",permalink:"/docs/additional-modules/networking/configuration"},next:{title:"Global Handlers",permalink:"/docs/additional-modules/networking/global-handlers"}},o={},l=[{value:"Defining a custom middleware",id:"defining-a-custom-middleware",level:2},{value:"Middleware Types",id:"middleware-types",level:3},{value:"RemoteEvent Middleware",id:"remoteevent-middleware",level:3},{value:"RemoteFunction Middleware",id:"remotefunction-middleware",level:3},{value:"Using middleware",id:"using-middleware",level:2}];function c(e){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.p,{children:"Middlewares are functions that get called before the listener to any event or function. It's able to drop requests, delay requests or change the parameters and return value prior to listeners being called. Flamework does not bundle any middleware by default."}),"\n",(0,r.jsx)(n.p,{children:"Example use cases for middleware:"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"Stricter type checks (for types that can't be represented via TypeScript, e.g constrained numbers)"}),"\n",(0,r.jsx)(n.li,{children:"Rate limiting (drop or delay requests that go over a certain threshold)"}),"\n",(0,r.jsx)(n.li,{children:"Blocking unauthorized requests before they reach the listener"}),"\n",(0,r.jsx)(n.li,{children:"Logging"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"defining-a-custom-middleware",children:"Defining a custom middleware"}),"\n",(0,r.jsx)(n.p,{children:"The following middleware passes requests based on a % chance."}),"\n",(0,r.jsx)(n.p,{children:"Middleware pass in an event object containing some metadata about the event. This includes the name, global name and whether the middleware is attached to a function or event."}),"\n",(0,r.jsx)(n.h3,{id:"middleware-types",children:"Middleware Types"}),"\n",(0,r.jsxs)(n.p,{children:["When you want to define middleware for a RemoteEvent, you can use the ",(0,r.jsx)(n.code,{children:"Networking.EventMiddleware<I>"})," type.",(0,r.jsx)("br",{}),"\nThe ",(0,r.jsx)(n.code,{children:"I"})," parameter defines what inputs your middleware accepts and can't be applied to events that don't satisfy the specified type."]}),"\n",(0,r.jsxs)(n.p,{children:["When you want to define middleware for a RemoteFunction, you can use the ",(0,r.jsx)(n.code,{children:"Networking.FunctionMiddleware<I, O>"})," type.",(0,r.jsx)("br",{}),"\nThe ",(0,r.jsx)(n.code,{children:"I"})," parameter works the same as RemoteEvents.",(0,r.jsx)("br",{}),"\nThe ",(0,r.jsx)(n.code,{children:"O"})," parameter defines what output your middleware accepts and can't be applied to functions that don't satisfy the specified type."]}),"\n",(0,r.jsxs)(n.p,{children:["If you don't care about types the parameter or output is, you can use a generic which will be inferred when the middleware is used, as shown below. You can also use the ",(0,r.jsx)(n.code,{children:"any"})," type to avoid having to define a generic, but this is not recommended."]}),"\n",(0,r.jsx)(n.h3,{id:"remoteevent-middleware",children:"RemoteEvent Middleware"}),"\n",(0,r.jsx)(n.p,{children:"The processNext function is used to tell Flamework to process the next middleware or fire listeners if there's none left."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'function randomChanceMiddleware<I extends Array<unknown>>(chances: number): Networking.EventMiddleware<I> {\n\treturn (processNext, event) => {\n\t\tprint("Loaded middleware for", event.name);\n\t\treturn (player, ...args) => {\n\t\t\tif (math.random() < chances / 100) {\n\t\t\t\tprocessNext(player, ...args);\n\t\t\t}\n\t\t};\n\t};\n}\n'})}),"\n",(0,r.jsx)(n.h3,{id:"remotefunction-middleware",children:"RemoteFunction Middleware"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"processNext"})," function is used to tell Flamework to process the next middleware or handler. It returns a promise containing the result of the next handler."]}),"\n",(0,r.jsxs)(n.p,{children:["Your middleware as well as ",(0,r.jsx)(n.code,{children:"processNext"})," can return ",(0,r.jsx)(n.code,{children:"Networking.Skip"})," which tells the sender that this request was cancelled. If your middleware uses the result from ",(0,r.jsx)(n.code,{children:"processNext"}),", it should check if the value is ",(0,r.jsx)(n.code,{children:"Networking.Skip"})," and forward that value if it is."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:'function randomChanceMiddleware<I extends Array<unknown>, O>(chances: number): Networking.FunctionMiddleware<I, O> {\n\treturn (processNext, event) => {\n\t\tprint("Loaded middleware for", event.name);\n\t\treturn async (player, ...args) => {\n\t\t\tif (math.random() < chances / 100) {\n\t\t\t\treturn processNext(player, ...args);\n\t\t\t}\n\t\t\treturn Networking.Skip;\n\t\t};\n\t};\n}\n'})}),"\n",(0,r.jsx)(n.h2,{id:"using-middleware",children:"Using middleware"}),"\n",(0,r.jsxs)(n.p,{children:["To use a middleware, you simply register it in your ",(0,r.jsx)(n.code,{children:"createServer"}),"/",(0,r.jsx)(n.code,{children:"createClient"})," call as shown below."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"export const Events = GlobalEvents.createServer(\n\t{\n\t\t// Inbound middleware, called by the receiver prior to firing any connections.\n\t\tmiddleware: {\n\t\t\tmyServerEvent: [randomChanceMiddleware(50)],\n\t\t}\n\t}\n);\n"})})]})}function u(e={}){const{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>a});var r=t(7294);const d={},i=r.createContext(d);function a(e){const n=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:a(e.components),r.createElement(i.Provider,{value:n},e.children)}}}]);