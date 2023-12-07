import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
	{
		title: 'Extensible',
		description: (
			<>
				Flamework exposes most of its transformer behavior in the form of user macros, along with other types of compile type metadata.
			</>
		),
	},
	{
		title: 'Several Packages',
		description: (
			<>
				Flamework is split across several packages, so you can include only the parts you intend to use.
			</>
		),
	},
	{
		title: 'Safety',
		description: (
			<>
				Flamework's networking library supports automatically generating type guards, blocking invalid arguments.
			</>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--4')}>
			{/* <div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div> */}
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
