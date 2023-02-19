'use client';
import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { flushSync } from 'react-dom';

import type { NavbarContextType} from 'context/navbar';
import { useNavbarContext , Navbar as NavbarType} from 'context/navbar';
import { usePointerContext } from 'context/pointer';
import useScrollPosition from 'hooks/useScrollPosition';
import { isInRange } from 'utils/numbers';

type ActiveName = NavbarContextType['0']['active'];

type LinksType = {
	name: ActiveName,
	href: string,
	scroll?: boolean
}[]

const links: LinksType = [{
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
	const [pointer, setPointer] = usePointerContext();
	const [navbar, setNavbar] = useNavbarContext();
	const scrollPostion = useScrollPosition();
	const router = useRouter();

	return (
	 	<nav className={`bg-cobalt-blue-900 bg-opacity-80 w-100 text-slate-50 text-xl 
										 py-4 fixed top-0 left-0 w-full z-30 backdrop-blur-[2px]`}>
			<ul className='list-none flex flex-row gap-x-6 w-fit mx-auto'>
				{
					links.map((item, index) => {
						return (
							<li key={index} data-hover>
								<Link 
									href={item.href} 
									className={item.name === navbar.active ? 'font-bold' : 'font-normal'} 
									onClick={() => {
										setNavbar((prev) => ({ ...prev, active: item.name }));
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