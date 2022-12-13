import React from 'react';

import type { InferGetServerSidePropsType} from 'next';
import { type NextPage } from 'next';
import Head from 'next/head';

import ContactSection from 'components/ContactSection';
import CreepyImage from 'components/CreepyImage';
import Footer from 'components/Footer';
import HomeSection from 'components/HomeSection';
import Navbar from 'components/Navbar';
import Pointer from 'components/Pointer';
import PortfolioSection from 'components/PortfolioSection';
import { trpcClient } from 'utils/trpc';

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({projects}) => {
	return (
		<>
			<Head>
				<title>Vlatko Stojkoski</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Navbar />

			<CreepyImage />

			<Pointer />

			<main className='px-5'>
				<HomeSection />

				<PortfolioSection projects={projects} />

				<ContactSection />
			</main>

			<Footer />
		</>
	);
};

export const getServerSideProps = async () => {
	const data = await trpcClient.projects.getAll.query();

	return {
		props: {
			projects: data,
		},
	};
};

export default Home;
