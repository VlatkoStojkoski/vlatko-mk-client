import React from 'react';

import { usePointerContext } from 'context/pointer';

const ContactSection = () => {
	const [email, setEmail] = React.useState('');
	const [subject, setSubject] = React.useState('');
	const [message, setMessage] = React.useState('');
	const [pointer, setPointer] = usePointerContext();
	
	return (
		<section id='contact' className='flex items-center justify-center flex-col min-h-[80vh] max-w-[600px] mx-auto py-5'>
			<div className='flex flex-col items-center justify-center text-center mb-4'>
				<h1 className='text-5xl sm:text-6xl font-bold'>
					Contact
				</h1>
				<p className='mt-3 text-2xl'>
					Feel free to contact me
				</p>
			</div>
			<form className='space-y-4 w-full'>
				<div>
					<label htmlFor='email' className='block mb-2 text-sm font-medium text-white'>Your email</label>
					<input
						type='email' 
						value={email} 
						onChange={(e) => setEmail(e.target.value)} 
						id='email' 
						className={`shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-primary-500
												focus:border-primary-500 block w-full p-2.5`}
						placeholder='name@email.com'
						required />
				</div>
				<div>
					<label htmlFor='subject' className='block mb-2 text-sm font-medium text-white'>Subject</label>
					<input
						type='text'
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						id='subject'
						className={`block p-3 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 shadow-sm 
											focus:ring-primary-500 focus:border-primary-500`}
						placeholder='Let me know how I can help you'
						required />
				</div>
				<div className='sm:col-span-2'>
					<label htmlFor='message' className='block mb-2 text-sm font-medium text-white'>Your message</label>
					<textarea
						id='message'
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={5}
						className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 shadow-sm border border-gray-300
												focus:ring-primary-500 focus:border-primary-500`}
						placeholder='Leave a comment...'></textarea>
				</div>
				<button
					type='submit'
					className={`py-3 px-5 text-sm font-medium text-center bg-toucan-900 text-white bg-primary-700 sm:w-fit hover:bg-primary-80
											focus:ring-4 focus:outline-none focus:ring-primary-300 mx-auto`}
					onMouseOver={() => setPointer('filled')}
					onMouseOut={() => setPointer('normal')}>
					Send message
				</button>
			</form>
		</section>
	);
};

export default ContactSection;