import React from 'react';

import type { InferGetServerSidePropsType} from 'next';
import { type NextPage } from 'next';
import Head from 'next/head';

import ContactSection from 'components/ContactSection';
import CreepyImage from 'components/CreepyImage';
import HomeSection from 'components/HomeSection';
import PortfolioSection from 'components/PortfolioSection';
import { trpcClient } from 'utils/trpc';

const Home: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({projects}) => {
	return (
		<>
			<Head>
				<title>Vlatko Stojkoski</title>
				<link rel='icon' href='/favicon.ico' />
				<meta property="og:title" content="Vlatko Stojkoski" />
				<meta name="description" content="Learn more about me and what I've worked on." />
				<meta property="og:url" content="https://vlatko.mk" />
			</Head>

			<CreepyImage />

			<main className='px-5'>
				<HomeSection />

				<PortfolioSection projects={projects} />

				<ContactSection />
			</main>
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
