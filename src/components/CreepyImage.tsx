import React from 'react';

import Image from 'next/image';

const CreepyImage = () => {
	const leftEye = React.useRef<HTMLDivElement>(null);
	const rightEye = React.useRef<HTMLDivElement>(null);
	const container = React.useRef<HTMLDivElement>(null);
	const hoverElement = React.useRef<HTMLDivElement>(null);
	
	React.useEffect(() => {
		const listener = (e: MouseEvent) => {
			if(!leftEye.current || !rightEye.current) return;

			const eyes = [leftEye.current, rightEye.current];

			eyes.forEach((eye, eyeIdx) => {
				const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
				const y = window.scrollY + eye.getBoundingClientRect().top + eye.clientHeight / 2;

				const radian = Math.atan2(e.pageX - x, e.pageY - y);
				const rotate = radian * (180 / Math.PI) * -1 + 270;
				eye.style.transform = 'translate(-80%, -50%) rotate(' + rotate + 'deg)';
			});
		};

		document.addEventListener('mousemove', listener);

		const bringImageDown = () => {
			if(!container.current) return;

			const scale = Math.max(0.8, 1 - (window.scrollY / (window.innerHeight * 1)));
			container.current.style.transform = `scale(${scale})`;

			const bottom = Math.max(-120, Math.min(0, -window.scrollY / 2));
			container.current.style.bottom = `${bottom}px`;

			const left = Math.max(0, Math.min(0, -window.scrollY / 2));
			container.current.style.left = `${left}px`;
		};

		window.addEventListener('scroll', bringImageDown);

		const bringImageUp = () => {
			if(!container.current) return;

			container.current.style.transform = 'scale(1)';
			container.current.style.bottom = '0';
		};

		hoverElement.current?.addEventListener('mouseenter', bringImageUp);
		hoverElement.current?.addEventListener('mouseleave', bringImageDown);
	}, []);

	return (
		<div className='creepy-image-container fixed -bottom-0 left-0 z-20 overflow-hidden aspect-square md:w-64 transition-all' ref={container}>
			<div
				className='absolute bottom-0 left-1/2 -translate-x-1/2 z-[22] h-1/2 w-5/6'
				ref={hoverElement}>
			</div>
			
			<Image
				className='object-cover z-20 pointer-events-none'
				src='/assets/img/selfie_no_eyes.png'
				alt='Picture of me'
				fill />

			<div className={`bg-white absolute z-10 top-[46.88%] left-[33.02%]
												 w-[8.59%] h-[2.73%]`}>
				<div
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
											bg-black w-[60%] aspect-square rounded-full`}
					style={{transformOrigin: '80% center 0'}}
					ref={leftEye}></div>
			</div>

			<div className={`bg-white absolute z-10 top-[46.88%] left-[56.25%]
												 w-[8.59%] h-[2.73%]`}>
				<div
					className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
											bg-black w-[60%] aspect-square rounded-full`}
					style={{transformOrigin: '80% center 0'}}
					ref={rightEye}></div>
			</div>
		</div>
	);
};

export default CreepyImage;