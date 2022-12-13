import { type AppType } from 'next/app';

import { trpc } from '../utils/trpc';

import '../styles/globals.scss';
import { PointerProvider } from 'context/pointer';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <PointerProvider>
		<Component {...pageProps} />
	</PointerProvider>;
};

export default trpc.withTRPC(MyApp);
