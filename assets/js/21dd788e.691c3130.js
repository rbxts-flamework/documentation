"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[3978],{8207:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>s,toc:()=>d});var o=t(5893),i=t(1151);const a={title:"Configuration"},r=void 0,s={id:"additional-modules/networking/configuration",title:"Configuration",description:"Flamework remotes support additional configuration that can be passed to the createServer/createClient methods.",source:"@site/docs/additional-modules/networking/configuration.md",sourceDirName:"additional-modules/networking",slug:"/additional-modules/networking/configuration",permalink:"/docs/additional-modules/networking/configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/docs/additional-modules/networking/configuration.md",tags:[],version:"current",frontMatter:{title:"Configuration"},sidebar:"flamework",previous:{title:"Remote Functions",permalink:"/docs/additional-modules/networking/remote-functions"},next:{title:"Middleware",permalink:"/docs/additional-modules/networking/middleware"}},l={},d=[{value:"RemoteEvents",id:"remoteevents",level:2},{value:"RemoteFunctions",id:"remotefunctions",level:2}];function c(e){const n={code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:["Flamework remotes support additional configuration that can be passed to the ",(0,o.jsx)(n.code,{children:"createServer"}),"/",(0,o.jsx)(n.code,{children:"createClient"})," methods."]}),"\n",(0,o.jsx)(n.p,{children:"The server and client have separate configuration, so make sure to update both when necessary."}),"\n",(0,o.jsx)(n.h2,{id:"remoteevents",children:"RemoteEvents"}),"\n",(0,o.jsx)(n.p,{children:"The following configuration is available for remote events."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"export interface EventCreateConfiguration<T> {\n\t/**\n\t * Disables input validation, allowing any value to pass.\n\t * Defaults to `false`\n\t */\n\tdisableIncomingGuards: boolean;\n\n\t/**\n\t * Emit a warning whenever a guard fails.\n\t * This is enabled only in studio by default.\n\t */\n\twarnOnInvalidGuards: boolean;\n\n\t/**\n\t * The middleware for each event.\n\t */\n\tmiddleware: EventMiddlewareList<T>;\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"remotefunctions",children:"RemoteFunctions"}),"\n",(0,o.jsx)(n.p,{children:"The following configuration is available for remote functions."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"export interface FunctionCreateConfiguration<T> {\n\t/**\n\t * Disables input validation, allowing any value to pass.\n\t * Defaults to `false`\n\t */\n\tdisableIncomingGuards: boolean;\n\n\t/**\n\t * Emit a warning whenever a guard fails.\n\t * This is enabled only in studio by default.\n\t */\n\twarnOnInvalidGuards: boolean;\n\n\t/**\n\t * The default timeout for outgoing requests.\n\t * Defaults to `10`\n\t */\n\tdefaultTimeout: number;\n\n\t/**\n\t * The middleware for each event.\n\t */\n\tmiddleware: FunctionMiddlewareList<T>;\n}\n"})})]})}function u(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>s,a:()=>r});var o=t(7294);const i={},a=o.createContext(i);function r(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);