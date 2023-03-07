'use client';
import Link from 'next/link';

import useScrollPosition from 'hooks/useScrollPosition';

const links = [
	{
		icon: (
			<svg width="48px" height="48px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_87_7153)"/>
				<rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_87_7153)"/>
				<rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_87_7153)"/>
				<path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"/>
				<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"/>
				<defs>
					<radialGradient id="paint0_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
						<stop stop-color="#B13589"/>
						<stop offset="0.79309" stop-color="#C62F94"/>
						<stop offset="1" stop-color="#8A3AC8"/>
					</radialGradient>
					<radialGradient id="paint1_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
						<stop stop-color="#E0E8B7"/>
						<stop offset="0.444662" stop-color="#FB8A2E"/>
						<stop offset="0.71474" stop-color="#E2425C"/>
						<stop offset="1" stop-color="#E2425C" stop-opacity="0"/>
					</radialGradient>
					<radialGradient id="paint2_radial_87_7153" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
						<stop offset="0.156701" stop-color="#406ADC"/>
						<stop offset="0.467799" stop-color="#6A45BE"/>
						<stop offset="1" stop-color="#6A45BE" stop-opacity="0"/>
					</radialGradient>
				</defs>
			</svg>
		),
		href: 'https://instagram.com/flatko',
	},

	{
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="48px" height="48px">
				<path d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z" fill="#0177b5"/><path d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z" fill="#fff"/>
			</svg>
		),
		href: 'https://www.linkedin.com/in/vlatkos',
	},

	{
		icon: (
			<svg width="48px" height="48px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
				<path fill="#1877F2" d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"/><path fill="#ffffff" d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"/>
			</svg>
		),
		href: 'https://www.facebook.com/vlatko.stojkoski.5',
	},
	
	{
		icon: (
			<svg width="48px" height="48px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
				<path fill="#000000" fill-rule="evenodd" d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" clip-rule="evenodd"/>
			</svg>
		),
		href: 'https://github.com/VlatkoStojkoski',
	},

	{
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="48px" height="48px" viewBox="0 0 48 48">
				<path fill="#E53935" d="M2,46 L2,2 L46,2 L46,46 L2,46 Z M10,10 L10,36.9960315 L23.6401086,36.9960315 L23.6401086,15.6290394 L31.5885714,15.6290394 L31.5885714,37 L37,37 L37,10 L10,10 Z"/>
			</svg>
		),
		href: 'https://www.npmjs.com/~daishoarch',
	},
];

const Socials: React.FC = () => {
	const scroll = useScrollPosition();

	return (
	 	<nav className={`transition-all duration-75 ease-in bg-white w-full sm:w-fit text-slate-50 text-xl p-3 sm:p-4 fixed z-30
											bottom-0 left-1/2 -translate-x-1/2 md:top-1/2 md:right-0 md:left-auto md:translate-x-0 md:-translate-y-1/2
											${
		scroll > 100 ? 'translate-y-full md:translate-x-full' : ''
		}`}>
			<ul className='list-none flex flex-row md:flex-col gap-3 sm:gap-4 w-fit mx-auto'>
				{
					links.map((link, index) => (
						<li key={index}>
							<Link href={link.href}>
								{link.icon}
							</Link>
						</li>
					))
				}
			</ul>
		</nav>
	);
};

export default Socials;