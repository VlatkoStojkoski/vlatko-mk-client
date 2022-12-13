import React from 'react';

const useMousePosition = () => {
	const [
		mousePosition,
		setMousePosition,
	] = React.useState<{ x: number, y: number }>({ x: -9999, y: -9999 });

	React.useEffect(() => {
		const updateMousePosition = (ev: globalThis.MouseEvent) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY });
		};

		const clearMousePosition = () => {
			setMousePosition({ x: -9999, y: -9999 });
		};

		window.addEventListener('mousemove', updateMousePosition);
		document.body.addEventListener('mouseleave', clearMousePosition);
		return () => {
			window.removeEventListener('mousemove', updateMousePosition);
			document.body.removeEventListener('mouseleave', clearMousePosition);
		};
	}, []);
	return mousePosition;
};
export default useMousePosition;