'use client';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

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
	href: '/#contact',
},
{
	name: 'blog',
	href: '/blog',
	scroll: true,
}];

const Navbar: React.FC = () => {
	const [active, setActive] = useState<string | null>(null);
	const [pointer, setPointer] = usePointerContext();
	const router = useRouter();

	useEffect(() => {
		const changeActive = (url: string) => setActive(PAGE_CONF.find(item => item.href === url)?.name || 'home');
		changeActive(router.asPath);
		router.events.on('routeChangeComplete', changeActive);
	}, []);

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
										router.events.emit('routeChangeComplete', item.href);
									}}
									scroll={item.scroll || false}
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