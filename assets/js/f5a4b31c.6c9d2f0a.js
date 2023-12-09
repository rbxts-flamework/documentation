"use strict";(self.webpackChunkflamework=self.webpackChunkflamework||[]).push([[5679],{9152:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>d});var o=t(5893),i=t(1151);const r={title:"Inheritance"},s=void 0,a={id:"additional-modules/components/inheritance",title:"Inheritance",description:"You may want your components to inherit behavior defined in other components.",source:"@site/docs/additional-modules/components/inheritance.md",sourceDirName:"additional-modules/components",slug:"/additional-modules/components/inheritance",permalink:"/docs/additional-modules/components/inheritance",draft:!1,unlisted:!1,editUrl:"https://github.com/rbxts-flamework/documentation/tree/master/docs/additional-modules/components/inheritance.md",tags:[],version:"current",frontMatter:{title:"Inheritance"},sidebar:"flamework",previous:{title:"Attributes",permalink:"/docs/additional-modules/components/attributes"},next:{title:"Configuration",permalink:"/docs/additional-modules/components/configuration"}},c={},d=[];function l(e){const n={code:"code",p:"p",pre:"pre",...(0,i.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"You may want your components to inherit behavior defined in other components.\nYou can extend your component as normal, and everything will work as expected."}),"\n",(0,o.jsx)(n.p,{children:"However, simply extending your component does not allow you to add new attributes, narrow existing attributes, or change the instance type.\nIf you'd like to do any of the above, you'll have to define type parameters with the initial constraint to pass into BaseComponent."}),"\n",(0,o.jsx)(n.p,{children:"Assuming you have the following class that you'd like to extend,"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"interface SuperAttributes {\n\tprop1: string,\n\tprop2: number,\n}\n\n@Component()\nclass SuperComponent extends BaseComponent<SuperAttributes, Model> {}\n"})}),"\n",(0,o.jsx)(n.p,{children:"You could do the following instead, which will allow you to add and narrow attributes in your child component."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"interface SuperAttributes {\n\tprop1: string,\n\tprop2: number,\n}\n\n@Component()\nclass SuperComponent<A extends SuperAttributes, I extends Model> extends BaseComponent<A, I> {}\n"})}),"\n",(0,o.jsx)(n.p,{children:"You can then simply replace BaseComponent with your SuperComponent when defining a new component."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:'interface ChildAttributes {\n\tprop1: "a" | "b" | "c",\n\tprop2: number,\n}\n\n@Component()\nclass ChildComponent extends SuperComponent<ChildAttributes, Model & { part: BasePart }> {}\n'})})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var o=t(7294);const i={},r=o.createContext(i);function s(e){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),o.createElement(r.Provider,{value:n},e.children)}}}]);