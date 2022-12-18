import { type AppType } from 'next/app';

import { trpc } from '../utils/trpc';

import '../styles/globals.scss';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Pointer from 'components/Pointer';
import { PointerProvider } from 'context/pointer';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <PointerProvider>
		<Navbar />
		<Pointer />
		<Component {...pageProps} />
		<Footer />
	</PointerProvider>;
};

export default trpc.withTRPC(MyApp);
