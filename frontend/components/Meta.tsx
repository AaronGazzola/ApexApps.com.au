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
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			<meta
				property='og:image'
				content='https://apexapps.com.au/assets/images/fb_image_xl.png'
			/>
			<meta property='og:url' content='https://www.apexapps.com.au' />
			<meta property='og:site_name' content='Apex Apps' />
			<meta name='twitter:image:alt' content={title} />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Apex Apps | Web App Development',
	keywords:
		'web development, javascript, Apex Apps, Aaron Gazzola, web app, app, fullstack, full stack, full-stack, freelance, contract, developer',
	description:
		'Web application development by Aaron Gazzola. Apex Apps provides full stack JavaScript web app development - owned and operated by Australian software engineer: Aaron Gazzola BSc(Hons)'
};

export default Meta;
