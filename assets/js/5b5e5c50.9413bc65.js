"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[8720],{8157:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var t=r(5893),o=r(1151);const i={title:"December 19th Release",authors:"fireboltofdeath"},s=void 0,l={permalink:"/blog/2022/12/19/flamework-release",editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/blog/2022-12-19-flamework-release.md",source:"@site/blog/2022-12-19-flamework-release.md",title:"December 19th Release",description:"Change Log",date:"2022-12-19T00:00:00.000Z",formattedDate:"December 19, 2022",tags:[],readingTime:3.32,hasTruncateMarker:!0,authors:[{name:"fireboltofdeath",title:"Maintainer",url:"https://github.com/Fireboltofdeath",imageURL:"https://avatars.githubusercontent.com/u/24422634?v=4",key:"fireboltofdeath"}],frontMatter:{title:"December 19th Release",authors:"fireboltofdeath"},unlisted:!1,prevItem:{title:"Flamework v1.0.0-beta.20",permalink:"/blog/2023/04/13/flamework-release"},nextItem:{title:"June 9th Components Release",permalink:"/blog/2022/06/09/flamework-release"}},a={authorsImageUrls:[void 0]},d=[{value:"Change Log",id:"change-log",level:2},{value:"Transformer",id:"transformer",level:3},{value:"Core",id:"core",level:3},{value:"Components",id:"components",level:3},{value:"Networking",id:"networking",level:3}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"change-log",children:"Change Log"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://github.com/rbxts-flamework/core/commits/master",children:"@flamework/core"}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/rbxts-flamework/components/commits/master",children:"@flamework/components"}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/rbxts-flamework/networking/commits/master",children:"@flamework/networking"}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/rbxts-flamework/transformer/commits/master",children:"rbxts-transformer-flamework"})]}),"\n",(0,t.jsx)(n.h3,{id:"transformer",children:"Transformer"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"#runtime-metadata",children:"Added runtime metadata"})}),"\n",(0,t.jsx)(n.li,{children:"Add support for some namespaced enums in guard generation"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"core",children:"Core"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Added a warning for calling the ",(0,t.jsx)(n.code,{children:"Dependency"})," macro prior to ignition and during preloading."]}),"\n",(0,t.jsxs)(n.li,{children:["Added support for file globs with ",(0,t.jsx)(n.code,{children:"addPaths"})," by using ",(0,t.jsx)(n.code,{children:'addPaths({ glob: "file" }, ..)'})]}),"\n",(0,t.jsxs)(n.li,{children:["Fixed incorrect ",(0,t.jsx)(n.code,{children:"Modding.resolveSingleton"})," return type."]}),"\n",(0,t.jsxs)(n.li,{children:["Singletons are now generic and you can define your own","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Using the ",(0,t.jsx)(n.code,{children:"flamework:singleton"})," metadata and ",(0,t.jsx)(n.code,{children:"flamework:loadOrder"})," metadata"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Singletons are now topologically sorted based on dependencies.","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["This should remove the need for specifying ",(0,t.jsx)(n.code,{children:"loadOrder"})," in all but rare cases."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"components",children:"Components"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Fixed a bug that caused components to lag when streaming models in and out."}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"#component-dependencies",children:"Components now support dependencies"})}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"networking",children:"Networking"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["RemoteFunctions now have custom timeouts with the ",(0,t.jsx)(n.code,{children:"invokeWithTimeout"})," method."]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"#networking-configuration",children:"You can now provide configuration to your networking."})}),"\n",(0,t.jsx)(n.li,{children:"RemoteEvents now use Roblox's networking queue which will not fire events until after there is a listener."}),"\n",(0,t.jsx)(n.li,{children:"Rest arguments are now properly supported."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>l,a:()=>s});var t=r(7294);const o={},i=t.createContext(o);function s(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);