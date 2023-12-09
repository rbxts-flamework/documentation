"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[9557],{1519:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>t});var s=i(5893),o=i(1151);const r={title:"Configuration"},l=void 0,c={id:"guides/configuration",title:"Configuration",description:"Flamework allows you to configure both transformer behavior and runtime behavior using configuration files, in tsconfig.json and flamework.json respectively.",source:"@site/docs/guides/configuration.md",sourceDirName:"guides",slug:"/guides/configuration",permalink:"/docs/guides/configuration",draft:!1,unlisted:!1,editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/docs/guides/configuration.md",tags:[],version:"current",frontMatter:{title:"Configuration"},sidebar:"flamework",previous:{title:"Frequently Asked",permalink:"/docs/frequently-asked"},next:{title:"Creating a Singleton",permalink:"/docs/guides/creating-a-singleton"}},d={},t=[{value:"Runtime Configuration",id:"runtime-configuration",level:2},{value:"<code>profiling</code>",id:"profiling",level:3},{value:"<code>logLevel</code>",id:"loglevel",level:3},{value:"<code>disableDependencyWarnings</code>",id:"disabledependencywarnings",level:3},{value:"Transformer Configuration",id:"transformer-configuration",level:2},{value:"<code>noSemanticDiagnostics</code>",id:"nosemanticdiagnostics",level:3},{value:"<code>obfuscation</code>",id:"obfuscation",level:3},{value:"<code>idGenerationMode</code>",id:"idgenerationmode",level:3},{value:"full",id:"full",level:4},{value:"obfuscated",id:"obfuscated",level:4},{value:"short / tiny",id:"short--tiny",level:4},{value:"<code>hashPrefix</code>",id:"hashprefix",level:3}];function a(e){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["Flamework allows you to configure both transformer behavior and runtime behavior using configuration files, in ",(0,s.jsx)(n.code,{children:"tsconfig.json"})," and ",(0,s.jsx)(n.code,{children:"flamework.json"})," respectively."]}),"\n",(0,s.jsx)(n.h2,{id:"runtime-configuration",children:"Runtime Configuration"}),"\n",(0,s.jsxs)(n.p,{children:["Flamework allows you to configure runtime behavior through a ",(0,s.jsx)(n.code,{children:"flamework.json"})," file."]}),"\n",(0,s.jsx)(n.h3,{id:"profiling",children:(0,s.jsx)(n.code,{children:"profiling"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"true"})," in studio, otherwise ",(0,s.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This option enables microprofiler tags and memory categories for Flamework's built in lifecycle events."}),"\n",(0,s.jsx)(n.h3,{id:"loglevel",children:(0,s.jsx)(n.code,{children:"logLevel"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"none"})]}),"\n",(0,s.jsxs)(n.li,{children:["Valid values: ",(0,s.jsx)(n.code,{children:"none"}),", ",(0,s.jsx)(n.code,{children:"verbose"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This allows you to configure the logging level for Flamework."}),"\n",(0,s.jsx)(n.h3,{id:"disabledependencywarnings",children:(0,s.jsx)(n.code,{children:"disableDependencyWarnings"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["This setting disables warnings emitted by Flamework when you use the ",(0,s.jsx)(n.code,{children:"Dependency"})," macro prior to ",(0,s.jsx)(n.code,{children:"Flamework.ignite()"})]}),"\n",(0,s.jsx)(n.h2,{id:"transformer-configuration",children:"Transformer Configuration"}),"\n",(0,s.jsxs)(n.p,{children:["These settings control the behavior of Flamework's transformer and are configured under ",(0,s.jsx)(n.code,{children:"rbxts-transformer-flamework"}),"'s configuration in ",(0,s.jsx)(n.code,{children:"tsconfig.json"})]}),"\n",(0,s.jsx)(n.h3,{id:"nosemanticdiagnostics",children:(0,s.jsx)(n.code,{children:"noSemanticDiagnostics"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This setting allows you to disable Flamework's TypeScript type checking which can improve compile times.\nThis can result in instability as Flamework's behavior is undefined when there are outstanding type errors."}),"\n",(0,s.jsx)(n.h3,{id:"obfuscation",children:(0,s.jsx)(n.code,{children:"obfuscation"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"This setting enables Flamework's obfuscation which will shorten and randomize internal IDs, networking names and similar."}),"\n",(0,s.jsx)(n.h3,{id:"idgenerationmode",children:(0,s.jsx)(n.code,{children:"idGenerationMode"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Defaults to ",(0,s.jsx)(n.code,{children:"obfuscated"})," when obfuscation is enabled, otherwise defaults to ",(0,s.jsx)(n.code,{children:"full"})]}),"\n",(0,s.jsxs)(n.li,{children:["Valid values: ",(0,s.jsx)(n.code,{children:"full"}),", ",(0,s.jsx)(n.code,{children:"obfuscated"}),", ",(0,s.jsx)(n.code,{children:"short"}),", ",(0,s.jsx)(n.code,{children:"tiny"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"You most likely do not need to change this."}),"\n",(0,s.jsxs)(n.p,{children:["There are 4 options and this will change how Flamework's identifiers are generated.\nYou should only use ",(0,s.jsx)(n.code,{children:"full"})," in packages (which means you also should not use ",(0,s.jsx)(n.code,{children:"obfuscation"})," in packages.)"]}),"\n",(0,s.jsx)(n.h4,{id:"full",children:"full"}),"\n",(0,s.jsx)(n.p,{children:"These are mostly unique IDs without any randomization."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Game projects: ",(0,s.jsx)(n.code,{children:"server/services/myService@MyService"})]}),"\n",(0,s.jsxs)(n.li,{children:["Packages: ",(0,s.jsx)(n.code,{children:"@rbxts/my-package:server/services/myService@MyService"})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"obfuscated",children:"obfuscated"}),"\n",(0,s.jsx)(n.p,{children:"These IDs have no debug information but can include package names."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Game projects: ",(0,s.jsx)(n.code,{children:"aZx"})]}),"\n",(0,s.jsxs)(n.li,{children:["Packages: ",(0,s.jsx)(n.code,{children:"@rbxts/my-package:aZx"})]}),"\n"]}),"\n",(0,s.jsx)(n.h4,{id:"short--tiny",children:"short / tiny"}),"\n",(0,s.jsxs)(n.p,{children:["These IDs are similar to ",(0,s.jsx)(n.code,{children:"obfuscated"}),", except they contain some debug information.\nThe random text is used to guarantee uniqueness."]}),"\n",(0,s.jsxs)(n.p,{children:["Short and tiny are similar except ",(0,s.jsx)(n.code,{children:"tiny"})," will not include the file name (the ",(0,s.jsx)(n.code,{children:"myService@"}),")"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Game projects (short): ",(0,s.jsx)(n.code,{children:"myService@MyService{aZx}"})]}),"\n",(0,s.jsxs)(n.li,{children:["Game projects (tiny): ",(0,s.jsx)(n.code,{children:"MyService{aZx}"})]}),"\n",(0,s.jsxs)(n.li,{children:["Packages (short): ",(0,s.jsx)(n.code,{children:"@rbxts/my-package:myService@MyService{aZx}"})]}),"\n",(0,s.jsxs)(n.li,{children:["Packages (tiny): ",(0,s.jsx)(n.code,{children:"@rbxts/my-package:MyService{aZx}"})]}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"hashprefix",children:(0,s.jsx)(n.code,{children:"hashPrefix"})}),"\n",(0,s.jsx)(n.p,{children:"Defaults to package name"}),"\n",(0,s.jsx)(n.p,{children:"This changes the prefix used for IDs generated by packages."})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>c,a:()=>l});var s=i(7294);const o={},r=s.createContext(o);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);