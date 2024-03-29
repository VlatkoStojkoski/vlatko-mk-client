import React, { useEffect } from 'react';

import hljs from 'highlight.js';
import Head from 'next/head';
import Link from 'next/link';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next/types';

import 'highlight.js/styles/github.css';

import { trpcClient } from 'utils/trpc';

const Blog: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({blogPost}) => {
	console.log(blogPost);

	useEffect(() => {
		hljs.highlightAll();
	}, []);

	return (
		<>
			<Head>
				<title>{blogPost.attributes.title} | Vlatko Stojkoski</title>
				<meta property="og:title" content={`Read "${blogPost.attributes.title}" by Vlatko Stojkoski`} />
				<meta name="description" content={blogPost.attributes.short} />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{(() => {console.log(blogPost.attributes);})()}

			<main className='px-5 pt-28 pb-32 min-h-screen max-w-4xl mx-auto'>
				<h1 className='text-4xl sm:text-5xl font-bold mb-6 underline'>{blogPost.attributes.title}</h1>
				<div id='blog-content'>
					{
						JSON.parse(blogPost.attributes.content).blocks.map((block: any, blockIdx: number) => (
							<div key={blockIdx}>
								{
									block.type === 'paragraph' ? (
										<p className='text-lg mt-2' dangerouslySetInnerHTML={{__html: block.data.text}}></p>
									) : 
										block.type === 'header' ? (
											<h2 className='text-2xl sm:text-3xl font-bold mt-8' dangerouslySetInnerHTML={{__html: block.data.text}}></h2>
										) :
											block.type === 'code' ? (
												<pre className='mt-2'>
													<code>
														{block.data.code}
													</code>
												</pre>
											) : 
												block.type === 'quote' ? (
													<blockquote className='mt-2 px-2'>
														<p className='text-lg italic' dangerouslySetInnerHTML={{__html: block.data.text}}></p>
														<p className='text-sm underline mt-1' dangerouslySetInnerHTML={{__html: block.data.caption}}></p>
													</blockquote>
												) : null
								}
							</div>
						))
					}
				</div>
			</main>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({query}) => {
	const slug = query.slug;

	if (typeof slug !== 'string') {
		return {
			notFound: true,
		};
	}

	const data = await trpcClient.blogPosts.getBySlug.query({
		slug,
	});

	if (!data) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			blogPost: data,
		},
	};
};

export default Blog;