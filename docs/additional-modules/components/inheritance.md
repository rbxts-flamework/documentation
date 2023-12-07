---
title: Inheritance
---

You may want your components to inherit behavior defined in other components.
You can extend your component as normal, and everything will work as expected.

However, simply extending your component does not allow you to add new attributes, narrow existing attributes, or change the instance type.
If you'd like to do any of the above, you'll have to define type parameters with the initial constraint to pass into BaseComponent.

Assuming you have the following class that you'd like to extend,
```ts
interface SuperAttributes {
	prop1: string,
	prop2: number,
}

@Component()
class SuperComponent extends BaseComponent<SuperAttributes, Model> {}
```

You could do the following instead, which will allow you to add and narrow attributes in your child component.
```ts
interface SuperAttributes {
	prop1: string,
	prop2: number,
}

@Component()
class SuperComponent<A extends SuperAttributes, I extends Model> extends BaseComponent<A, I> {}
```

You can then simply replace BaseComponent with your SuperComponent when defining a new component.
```ts
interface ChildAttributes {
	prop1: "a" | "b" | "c",
	prop2: number,
}

@Component()
class ChildComponent extends SuperComponent<ChildAttributes, Model & { part: BasePart }> {}
```
