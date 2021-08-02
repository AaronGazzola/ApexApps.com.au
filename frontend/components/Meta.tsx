import Head from 'next/head';

interface MetaProps {
	title: string;
	keywords: string;
	description: string;
}

const Meta = (props: MetaProps) => {
	const { keywords, description, title } = props;
	return (
		<Head>
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Apex Apps | Web App Development',
	keywords:
		'web development, javascript, Apex Apps, Aaron Gazzola, web app, app, fullstack, full stack, full-stack, freelance, contract, developer',
	description:
		'Web application development by Aaron Gazzola. Apex Apps provides full stack JavaScript web app development - owned and operated by Australian software engineer and entrepreneur: Aaron Gazzola BSc(Hons)'
};

export default Meta;
