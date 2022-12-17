import React from 'react';

import {LogoGithub, ContentView, Link as LinkIcon} from '@carbon/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

import { env } from 'env/client.mjs';

const PortfolioSection: React.FC<{
	projects: {
		data: any[];
	}
}> = ({projects}) => {
	return (
		<section id='portfolio' className='min-h-screen py-5'>
			<h1 className='text-4xl font-semibold mb-5'>Portfolio</h1>
			<div style={{
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
				gridGap: '16px',
			}}>
				{
					projects &&
					projects?.data?.map(({attributes}: any, projIdx: any) => (
						<div className='bg-white p-4' key={projIdx}>
							<div className='w-full h-32 relative'>
								<Image
									className='object-cover'
									src={env.NEXT_PUBLIC_API_URI + attributes.thumbnail.data.attributes.formats.small.url}
									alt='Project thumbnail'
									fill />
							</div>
							<div className='px-4 pt-2'>
								<div className='flex gap-2 my-3'>
									{(attributes.tags as string).split(',').map((tag, tagIdx) => (
										<span
											key={tagIdx}
											className='rounded-full px-3 py-1 text-sm font-semibold text-gray-700'
											style={{background: `#${tag.split('#')[1]}`}}>
											{tag.split('#')[0]}
										</span>
									))}
								</div>
								<h2 className='text-xl font-semibold text-gray-800'>{attributes.title}</h2>
								<p className='text-gray-700'>
									{attributes.blog_post.data.attributes.short}
								</p>
								<div className='flex gap-2 my-3'>
									{
										attributes.links.split(', ').map((link: any, linkIdx: any) => {
											const [type, href] = link.match(/(?<=\[).+(?=\))/)[0].split('](');
											return <Link
												key={linkIdx}
												href={href}
												className='bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700'
												target='_blank'
												data-hover>
												{
													(() => {
														switch(type) {
														case 'github':
															return <LogoGithub />;
														case 'website':
															return <ContentView />;
														default:
															return <LinkIcon />;
														}
													})()
												}
											</Link>;
										})
									}
								</div>
							</div>
						</div>
					)) || <></>
				}
			</div>
		</section>
	);
};

export default PortfolioSection;