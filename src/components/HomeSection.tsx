import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { type PointerContextType, usePointerContext } from 'context/pointer';

const HomeSection = () => {
	const [pointer, setPointer] = usePointerContext() as PointerContextType;

	return (
		<section id='home' className='flex min-h-screen flex-col items-center justify-center text-center'>
			<h1 className='text-5xl sm:text-6xl font-bold'>
					Vlatko Stojkoski
			</h1>
			<p className='mt-3 text-2xl'>
					web developer
			</p>
			<div className='flex flex-col mt-10 space-y-3'>
				<Link href='/#contact' className='text-2xl font-bold text-blue-500 hover:text-blue-600' scroll={false}>
					<button 
						type='button' 
						className={`bg-white text-toucan-900 border-toucan-900 border-2 text-base text-center px-5 py-2.5
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