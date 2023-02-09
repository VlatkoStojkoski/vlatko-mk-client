import { type AppType } from 'next/app';

import { trpc } from '../utils/trpc';

import '../styles/globals.scss';
import Footer from 'components/Footer';
import NavbarType from 'components/Navbar';
import Pointer from 'components/Pointer';
import { NavbarProvider } from 'context/navbar';
import { PointerProvider } from 'context/pointer';

const MyApp: AppType = ({ Component, pageProps }) => {
	return <NavbarProvider>
		<PointerProvider>
			<NavbarType />
			<Pointer />
			<Component {...pageProps} />
			<Footer />
		</PointerProvider>
	</NavbarProvider>;
};

export default trpc.withTRPC(MyApp);
