import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	// static async getInitialProps(ctx) {
	// 	const initialProps = await Document.getInitialProps(ctx);
	// 	return { ...initialProps };
	// }

	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' href='/favicon.ico' sizes='any' />
					<link rel='icon' href='/icon.svg' type='image/svg+xml' />
					<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
					<link rel='manifest' href='/manifest.json' />
					<link rel='stylesheet' href='/fonts.css' />
				</Head>
				<body className='font-body'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
