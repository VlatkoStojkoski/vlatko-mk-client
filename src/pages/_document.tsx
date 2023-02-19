import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/assets/img/og-image.jpg" />
				<meta name="twitter:card" content="summary_large_image" />
			</Head>
			<body className='bg-gradient-to-b from-cobalt-blue-900 to-cobalt-blue-700 text-white'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
