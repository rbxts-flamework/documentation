"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[154],{4634:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var t=o(5893),r=o(1151);const a={title:"Migration"},l="Migrating to the beta",i={id:"migration",title:"Migration",description:"If you have an existing codebase that you want to migrate to the Flamework beta, you can follow these instructions.",source:"@site/docs/migration.md",sourceDirName:".",slug:"/migration",permalink:"/docs/migration",draft:!1,unlisted:!1,editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/docs/migration.md",tags:[],version:"current",frontMatter:{title:"Migration"}},s={},c=[{value:"Uninstall old Flamework",id:"uninstall-old-flamework",level:2},{value:"Update your transformer",id:"update-your-transformer",level:2},{value:"Install new Flamework packages",id:"install-new-flamework-packages",level:2},{value:"Configuring the @flamework org",id:"configuring-the-flamework-org",level:2},{value:"Configure tsconfig.json",id:"configure-tsconfigjson",level:3},{value:"Configure default.project.json",id:"configure-defaultprojectjson",level:3},{value:"Fixing your imports",id:"fixing-your-imports",level:2},{value:"Recompiling",id:"recompiling",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"migrating-to-the-beta",children:"Migrating to the beta"}),"\n",(0,t.jsx)(n.p,{children:"If you have an existing codebase that you want to migrate to the Flamework beta, you can follow these instructions."}),"\n",(0,t.jsxs)(n.p,{children:["If you do not have an existing codebase, please refer to ",(0,t.jsx)(n.a,{href:"/docs/installation",children:"the installation guide"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"uninstall-old-flamework",children:"Uninstall old Flamework"}),"\n",(0,t.jsx)(n.p,{children:"You should uninstall the @rbxts/flamework module as it is no longer used."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm uninstall @rbxts/flamework\n"})}),"\n",(0,t.jsx)(n.h2,{id:"update-your-transformer",children:"Update your transformer"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm i -D rbxts-transformer-flamework@latest\n"})}),"\n",(0,t.jsx)(n.h2,{id:"install-new-flamework-packages",children:"Install new Flamework packages"}),"\n",(0,t.jsx)(n.p,{children:"The networking and components modules of Flamework have been split into separate packages. These are not required to be installed, unless you are currently using them."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"npm i @flamework/core\nnpm i @flamework/networking # optional\nnpm i @flamework/components # optional\n"})}),"\n",(0,t.jsx)(n.h2,{id:"configuring-the-flamework-org",children:"Configuring the @flamework org"}),"\n",(0,t.jsx)(n.p,{children:"Flamework uses a custom npm org to host its packages, which requires additional configuration."}),"\n",(0,t.jsx)(n.h3,{id:"configure-tsconfigjson",children:"Configure tsconfig.json"}),"\n",(0,t.jsx)(n.p,{children:"You'll need to add the @flamework scope to your typeRoots."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'typeRoots: ["node_modules/@rbxts", "node_modules/@flamework"]\n'})}),"\n",(0,t.jsx)(n.h3,{id:"configure-defaultprojectjson",children:"Configure default.project.json"}),"\n",(0,t.jsxs)(n.p,{children:["Find the following json inside your ",(0,t.jsx)(n.code,{children:"default.project.json"})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'"node_modules": {\n\t"$path": "node_modules/@rbxts"\n}\n'})}),"\n",(0,t.jsx)(n.p,{children:"After you've found it, you'll want to replace it with the following json."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'"node_modules": {\n\t"$path": "node_modules/@rbxts",\n\t"@flamework": {\n\t\t"$path": "node_modules/@flamework"\n\t}\n}\n'})}),"\n",(0,t.jsx)(n.h2,{id:"fixing-your-imports",children:"Fixing your imports"}),"\n",(0,t.jsx)(n.p,{children:"Since Flamework is no longer a single package, you'll have to locate all imports and reimport from the correct module(s)."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'// previous\nimport { Component, BaseComponent, Flamework } from "@rbxts/flamework";\n\n// new\nimport { Flamework } from "@flamework/core";\nimport { Component, BaseComponent } from "@flamework/components";\n'})}),"\n",(0,t.jsx)(n.h2,{id:"recompiling",children:"Recompiling"}),"\n",(0,t.jsxs)(n.p,{children:["Whenever updating/changing any Flamework packages or the transformer, you should always do a full recompile by deleting your ",(0,t.jsx)(n.code,{children:"out"})," directory. Not doing a full recompile could result in undefined behavior."]})]})}function u(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},1151:(e,n,o)=>{o.d(n,{Z:()=>i,a:()=>l});var t=o(7294);const r={},a=t.createContext(r);function l(e){const n=t.useContext(a);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(a.Provider,{value:n},e.children)}}}]);