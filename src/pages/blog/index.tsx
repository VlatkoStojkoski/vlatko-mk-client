import React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import type { InferGetServerSidePropsType, NextPage } from 'next/types';

import { trpcClient } from 'utils/trpc';

const Blog: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({blogPosts}) => {
	console.log(blogPosts);

	return (
		<>
			<Head>
				<title>Blog 📑 | Vlatko Stojkoski</title>
				<meta property="og:title" content="Vlatko Stojkoski's Blog 📑" />
				<meta name="description" content="Visit my blog and read stuff I've recently learned and would like to share with the world." />
				<meta property="og:url" content="https://vlatko.mk/blog" />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='px-5 pt-20 min-h-screen max-w-3xl mx-auto mb-10'>
				<h1 className='text-5xl font-bold mb-6 text-center'>Blog posts</h1>
				<div className='flex flex-col gap-5'>
					{
						blogPosts.data.map((blogPost, blogPostIdx) => (
							<Link key={blogPostIdx} href={`/blog/${blogPost.attributes.slug}`} className="text-gray-700 hover:underline" data-hover>
								<div className='bg-white shadow-lg p-5'>
									<h2 className='text-black text-2xl font-heading font-bold mb-2'>{blogPost.attributes.title}</h2>
									<p className='text-gray-700 font-normal text-base'>{blogPost.attributes.short}</p>
								</div>
							</Link>
						))
					}
				</div>
			</main>
		</>
	);
};

export const getServerSideProps = async () => {
	const data = await trpcClient.blogPosts.getAll.query();

	return {
		props: {
			blogPosts: data,
		},
	};
};

export default Blog;