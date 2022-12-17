import { type AppType } from 'next/app';

import { trpc } from '../utils/trpc';

import '../styles/globals.scss';
import ContactSection from 'components/ContactSection';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import Pointer from 'components/Pointer';
import { PointerProvider } from 'context/pointer';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <PointerProvider>
		<Navbar />
		<Pointer />
		<Component {...pageProps} />
		<ContactSection />
		<Footer />
	</PointerProvider>;
};

export default trpc.withTRPC(MyApp);
