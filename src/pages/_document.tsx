import { Html, Head, Main, NextScript } from 'next/document';

import isMobile from 'utils/isMobile';

export default function Document() {
	return (
		<Html>
			<Head>
				<meta name="description" content="Vlatko Stojkoski" />
			</Head>
			<body className='bg-gradient-to-b from-cobalt-blue-900 to-cobalt-blue-700 text-white'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
