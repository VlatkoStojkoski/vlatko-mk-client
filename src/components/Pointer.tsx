'use client';
import React from 'react';

import { usePointerContext } from 'context/pointer';
import useMousePosition from 'hooks/useMousePositions';

const Pointer = () => {
	const {x, y} = useMousePosition();
	const [pointer, setPointer] = usePointerContext();

	React.useEffect(() => {
		const mouseDown = () => {
			setPointer('filled');
		};

		const mouseUp = () => {
			setPointer('normal');
		};

		window.addEventListener('mousedown', mouseDown);

		window.addEventListener('mouseup', mouseUp);
	}, []);

	React.useEffect(() => {
		const hoveringElements = document
			.elementsFromPoint(x, y)
			.filter((el) => (el as HTMLElement).dataset.hover || el.tagName === 'A');

		hoveringElements.map(el => el.addEventListener('mouseleave', () => {
			setPointer('normal');
		}));
		
		if (hoveringElements.length > 0) {
			setPointer('filled');
		}
	}, [x,y]);

	return (
		<div className={`pointer-container fixed z-50 w-screen h-screen top-0 left-0 pointer-events-none
										 ${pointer === 'filled' ? ' mix-blend-hard-light' : ''}`}>
			<div
				className={`border-stone-900 border-2 absolute top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2
										pointer-events-none`}
				style={{
					top:  `${y}px`,
					left: `${x}px`,
					width: '2rem',
					height: '2rem',
					backdropFilter: 'blur(5px) brightness(0.8)',
				}}>
				<div
					className={`bg-stone-900 absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none
											${pointer === 'filled' ? 'w-[calc(100%+2px)] h-[calc(100%+2px)]' : 'w-2 h-2'}`}
					style={{
						top: '50%',
						left: '50%',
						transition: 'all 100ms ease-in-out',
					}}></div>
			</div>
		</div>
	);
};

export default Pointer;