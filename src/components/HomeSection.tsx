import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { type PointerContextType, usePointerContext } from 'context/pointer';

const DashesSVG = () => (
	<svg className='inline-block' width="18" height="18" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M36 16H69L49 112H16L36 16Z" fill="white"/>
		<path d="M79 16H112L92 112H59L79 16Z" fill="white"/>
	</svg>
);

const HomeSection = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => {
	const [pointer, setPointer] = usePointerContext() as PointerContextType;

	return (
		<section id='home' className='flex min-h-screen flex-col items-center justify-center text-center' {...props}>
			<div className='relative'>
				<Image src='/assets/img/ufo.gif' className='absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2' alt='UFO animation' width={100} height={100} />
				<h1 className='text-5xl sm:text-6xl font-bold'>
					Vlatko Stojkoski
				</h1>
			</div>
			<p className='mt-3 text-2xl'>
				<DashesSVG />
				<span className='mx-2'>web developer</span>
				<DashesSVG />
			</p>
			<div className='flex flex-col mt-10 space-y-3'>
				<Link href='/#contact' className='text-2xl font-bold text-blue-500 hover:text-blue-600' scroll={false}>
					<button 
						type='button' 
						className={`bg-white text-toucan-900 border-toucan-900 border-2 text-lg text-center px-5 py-2.5
												hover:translate-x-[4px] hover:translate-y-[4px] shadow-brutal filter-none
												hover:shadow-brutal-closer hover:bg-neutral-200`}
						onMouseOver={() => setPointer('filled')}
						onMouseLeave={() => setPointer('normal')}>
						Get in touch
					</button>
				</Link>
			</div>
		</section>
	);
};

export default HomeSection;