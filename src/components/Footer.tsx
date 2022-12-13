import React from 'react';

const Footer = () => {
	return (
		<footer className='flex items-center justify-center w-full h-24 border-t'>
			<p className='text-sm'>
				© {new Date().getFullYear()} Vlatko Stojkoski
			</p>
		</footer>
	);
};

export default Footer;