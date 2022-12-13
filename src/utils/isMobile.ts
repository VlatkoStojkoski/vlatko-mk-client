export default function isMobile() {
	if (typeof window === 'undefined') return false;
	console.log('window.innerWidth', window.innerWidth);
	console.log('is mobile', window.innerWidth <= 768);
	return window.innerWidth <= 768;
}