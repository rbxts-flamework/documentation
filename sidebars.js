/**
* Creating a sidebar enables you to:
- create an ordered group of docs
- render a sidebar for each doc of that group
- provide next/previous navigation

The sidebars can be generated from the filesystem, or explicitly defined here.

Create as many sidebars as you want.
*/

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	flamework: [
		"introduction",
		"installation",
		'frequently-asked',
		{
			type: 'category',
			label: 'Guides',
			items: [
				'guides/configuration',
				'guides/creating-a-singleton',
				'guides/dependencies',
				'guides/lifecycle-events',
				'guides/utility-macros',
				'guides/ignition',
			]
		},
		{
			type: 'category',
			label: 'Modules',
			collapsed: false,
			items: [
				{
					type: 'category',
					label: 'Networking',
					items: [
						'additional-modules/networking/introduction',
						'additional-modules/networking/remote-events',
						'additional-modules/networking/remote-functions',
						'additional-modules/networking/configuration',
						'additional-modules/networking/middleware',
						'additional-modules/networking/global-handlers',
						'additional-modules/networking/namespaces'
					],
				},
				{
					type: 'category',
					label: 'Components',
					items: [
						'additional-modules/components/creating-a-component',
						'additional-modules/components/scripting-api',
						'additional-modules/components/attributes',
						'additional-modules/components/inheritance',
						'additional-modules/components/configuration'
					],
				},
			]
		},
		{
			type: 'category',
			label: 'Modding',
			items: [
				'modding/introduction',
				'modding/metadata',
				'modding/reflection',
				{
					type: 'category',
					label: 'Guides',
					collapsed: false,
					items: [
						'modding/guides/listeners',
						'modding/guides/lifecycle-events',
						'modding/guides/decorators',
						'modding/guides/singletons',
						'modding/guides/dependency-resolution',
						'modding/guides/user-macros',
					]
				},
			]
		}
	]
};

export default sidebars;
