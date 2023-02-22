import React, { useState } from 'react';

import {LogoGithub, ContentView, Link as LinkIcon, LogoYoutube} from '@carbon/icons-react';
import color from 'color';
import Image from 'next/image';
import Link from 'next/link';

import { env } from 'env/client.mjs';
import type { RouterOutputs} from 'utils/trpc';
import { trpc } from 'utils/trpc';

const PortfolioSection: React.FC<{
	projects: RouterOutputs['projects']['getAll'],
	tags: RouterOutputs['tags']['getAll'],
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = 
	({projects, tags, ...rest}) => {
		const { mutate: getByTags, data: projectsByTags } = trpc.projects.getBySlugs.useMutation();
		const [ selectedTags, setSelectedTags ] = useState<string[] | null>(null);

		return (
			<section id='portfolio' className='min-h-screen py-5' {...rest}>
				<h1 className='text-4xl font-semibold mb-3'>Portfolio</h1>
				<select
					className={`block text-[#fff] rounded-[5px] text-lg p-1 px-3 bg-toucan-800 active:bg-toucan-900
						shadow-[inset_2px_2px_3px_rgba(255,255,255,0.6),inset_-2px_-2px_3px_rgba(0,0,0,0.6)]`}
					style={{
						backgroundImage: 'linear-gradient(to top left,rgba(0,0,0,0.2),rgba(0,0,0,0.2) 30%,rgba(0,0,0,0))',
					}}
					onChange={e => {
						const selectedTag = e.target.value;
						const currSelectedTags = [...(selectedTags || []), selectedTag];
						setSelectedTags(currSelectedTags);
						getByTags({
							tags: currSelectedTags || [],
						});
					}}>
					<option value=''>Select a tag...</option>
					{
						tags &&
						tags.data.map(({attributes}, tagIdx) => (
							<option key={tagIdx} value={attributes.name}>{attributes.name}</option>
						))
					}
				</select>
				{
					selectedTags && (
						<div className='flex flex-wrap gap-2 mt-2'>
							{
								selectedTags.map((tag, tagIdx) => (
									<div
										key={tagIdx}
										className='flex items-center gap-2 px-3 py-1 rounded-lg bg-toucan-800 text-white'
										style={{
											backgroundImage: 'linear-gradient(to top left,rgba(0,0,0,0.2),rgba(0,0,0,0.2) 30%,rgba(0,0,0,0))',
										}}>
										{tag}
										<svg className='ml-1' width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-hover
											onClick={
												() => {
													const currSelectedTags = [...selectedTags];
													currSelectedTags.splice(tagIdx, 1);
													setSelectedTags(currSelectedTags);
													getByTags({
														tags: currSelectedTags || [],
													});
												}
											}>
											<path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>	
									</div>
								))
							}
						</div>
					)
				}
				<div className='mt-8' style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
					gridGap: '16px',
				}}>
					{
						((selectedTags ? (projectsByTags && projectsByTags.data) : (projects && projects.data)) || [])
							.map(({attributes}, projIdx) => (
								<div key={projIdx} className='flex flex-col justify-between bg-white p-4'>
									<div className="">
										<div className='w-full h-32 relative'>
											<Image
												className='object-cover'
												src={env.NEXT_PUBLIC_API_URI + attributes.thumbnail.data.attributes.formats.small.url}
												alt='Project thumbnail'
												fill />
										</div>
										<div className='px-4 pt-2'>
											<div className='my-3'>
												{attributes.tags.data.map(({attributes: tag}, tagIdx) => {
													const textColor = color(tag.color).isDark() ? 'white' : 'black';

													return (
														<span
															key={tagIdx}
															className='inline-block rounded-full px-3 py-1 mr-2 mb-2 text-sm font-body'
															style={{background: tag.color, color: textColor}}>
															{tag.name}
														</span>
													);
												})}
											</div>
											<Link key={projIdx} href={attributes.links?.[0]?.[1] || '#'} target='_blank'>
												<h2 className='text-xl font-heading font-semibold text-gray-800'>{attributes.title}</h2>
												<p className='font-body font-normal text-gray-600'>
													{attributes.short}
												</p>
											</Link>
										</div>
									</div>

									<div className='flex gap-2 my-3 px-4'>
										{
											attributes.links.map(([type, href], linkIdx) => {
												if(!href)
													return <></>;

												return <Link
													key={linkIdx}
													href={href}
													className={`${linkIdx === 0 ? 'bg-violet-700 text-white' : 'bg-gray-200 text-gray-700'} px-3 py-1 text-sm font-semibold`}
													target='_blank'
													data-hover>
													{
														(() => {
															switch(type) {
															case 'github':
																return <LogoGithub />;
															case 'website':
																return <ContentView />;
															case 'youtube':
																return <LogoYoutube />;
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
							)) || <></>
					}
				</div>
			</section>
		);
	};

export default PortfolioSection;