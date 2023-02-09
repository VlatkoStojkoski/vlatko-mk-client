import React from 'react';

import {LogoGithub, ContentView, Link as LinkIcon} from '@carbon/icons-react';
import color from 'color';
import Image from 'next/image';
import Link from 'next/link';

import { env } from 'env/client.mjs';
import type { RouterOutputs } from 'utils/trpc';

const PortfolioSection: React.FC<{projects: RouterOutputs['projects']['getAll'] } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = 
	({projects, ...rest}) => {
		return (
			<section id='portfolio' className='min-h-screen py-5' {...rest}>
				<h1 className='text-4xl font-semibold mb-5'>Portfolio</h1>
				<div style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					gridGap: '16px',
				}}>
					{
						projects &&
						projects.data.map(({attributes}, projIdx) => (
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
										{(attributes.tags as string).split(',').map((tag, tagIdx) => {
											const hexCode = `#${tag.split('#')[1]}`;
											const textColor = color(hexCode).isDark() ? 'white' : 'black';

											return (
												<span
													key={tagIdx}
													className='rounded-full px-3 py-1 text-sm font-semibold'
													style={{background: hexCode, color: textColor}}>
													{tag.split('#')[0]}
												</span>
											);
										})}
									</div>
									<h2 className='text-xl font-semibold text-gray-800'>{attributes.title}</h2>
									<p className='text-gray-700'>
										{attributes.short}
									</p>
									<div className='flex gap-2 my-3'>
										{
											attributes.links.split(', ').map((link, linkIdx) => {
												const linkMatch = link.match(/(?<=\[).+(?=\))/);
												if (!linkMatch || !linkMatch[0]) return null;

												const [type, href] = linkMatch[0].split('](') as [string, string];
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