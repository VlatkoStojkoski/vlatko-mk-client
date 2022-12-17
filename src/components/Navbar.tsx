'use client';
import { useState } from 'react';

import Link from 'next/link';

import { usePointerContext } from 'context/pointer';

const PAGE_CONF = [{
	name: 'home',
	href: '/#home',
},
{
	name: 'portfolio',
	href: '/#portfolio',
},
{
	name: 'contact',
	href: '#contact',
},
{
	name: 'blog',
	href: '/blog',
}];

const Navbar: React.FC = () => {
	const [active, setActive] = useState<string>('home');
	const [pointer, setPointer] = usePointerContext();

	return (
	 	<nav className={`bg-cobalt-blue-900 bg-opacity-80 w-100 text-slate-50 text-xl 
										 py-4 fixed top-0 left-0 w-full z-30 backdrop-blur-[2px]`}>
			<ul className='list-none flex flex-row gap-x-6 w-fit mx-auto'>
				{
					PAGE_CONF.map((item, index) => {
						return (
							<li key={index} data-hover>
								<Link 
									href={item.href} 
									className={item.name === active ? 'font-bold' : ''} 
									onClick={() => {
										setActive(item.name);
									}}
									scroll={false}
									onMouseOver={() => setPointer('filled')}
									onMouseLeave={() => setPointer('normal')}>
									{item.name}
								</Link>
							</li>
						);
					})
				}
			</ul>
		</nav>
	);
};

export default Navbar;