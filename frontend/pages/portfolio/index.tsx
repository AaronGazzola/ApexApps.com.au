import Image from 'next/image';
import { useState } from 'react';
import Button from '../../components/Button';
import Meta from '../../components/Meta';
import SVG from '../../components/SVG';

const index = () => {
	const [playGif, setPlayGif] = useState(0);
	return (
		<>
			<Meta title='Portfolio | Apex Apps' />
			<h1 className='title'>Portfolio</h1>
			<div className='box w-full max-w-2xl relative'>
				<h2 className='title-sm text-xl font-medium sm:font-normal sm:text-2xl mb-0 sm:px-20 sm:mb-4'>
					Rainbow of emotions
				</h2>

				<a
					target='_blank'
					href='https://rainbowofemotions.app'
					rel='noopener noreferrer'
					className='mb-4 sm:mb-0 sm:absolute sm:top-3 sm:right-3'
				>
					<Button
						label='Visit app'
						type='button'
						variant='simple'
						size='small'
						buttonClasses=''
						color='green'
						endIcon={
							<SVG name='signPost' classes='fill-current text-green w-6 h-6' />
						}
					/>
				</a>
				<p className='box-text mb-4'>
					Rainbow of emotions is an interactive web application that enables
					people to identify and manage their emotions. The rainbow is fully
					customisable - add or change colours, images and even audio.
				</p>

				<div className='flex flex-col items-center w-full mb-4'>
					<div className='flex flex-col sm:flex-row sm:w-full sm:justify-around'>
						<ol className='pr-1 sm:px-2'>
							{[
								'Stripe payment integration',
								'Interactive animations',
								'Audio recording',
								'Image upload'
							].map(item => (
								<li key={item} className='flex items-start'>
									<div className='rounded-full bg-black w-1 h-1 mr-2 ml-2 mt-2'></div>
									<p className='font-medium text-sm'>{item}</p>
								</li>
							))}
						</ol>
						<ol className='sm:px-2'>
							{[
								'User authentication',
								'Extensive customisation',
								'Intuitive design',
								'Responsive on any screen'
							].map(item => (
								<li key={item} className='flex items-start'>
									<div className='rounded-full bg-black w-1 h-1 mr-2 ml-2 mt-2'></div>
									<p className='font-medium text-sm'>{item}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
				<div
					className={`relative group cursor-pointer w-full`}
					onClick={() => setPlayGif(prev => (prev === 1 ? 0 : 1))}
				>
					{playGif !== 1 && (
						<SVG
							name='playFill'
							classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100'
						/>
					)}
					<div className='rounded-2xl overflow-hidden w-full border'>
						{playGif === 1 ? (
							<Image
								src='/assets/gifs/rainbowofemotions.app.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						) : (
							<Image
								src='/assets/images/rainbow-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						)}
					</div>
				</div>
			</div>
			<div className='box w-full max-w-2xl relative'>
				<h2 className='title-sm text-xl font-medium sm:font-normal sm:text-2xl mb-0 sm:px-20 sm:mb-4'>
					Origami.cool
				</h2>

				<a
					target='_blank'
					href='https://www.origami.cool'
					rel='noopener noreferrer'
					className='mb-4 sm:mb-0 sm:absolute sm:top-3 sm:right-3'
				>
					<Button
						label='Visit app'
						type='button'
						variant='simple'
						size='small'
						buttonClasses=''
						color='green'
						endIcon={
							<SVG name='signPost' classes='fill-current text-green w-6 h-6' />
						}
					/>
				</a>
				<p className='box-text mb-4'>
					Origami.cool is an E-commerce web app for hand-folded origami models.
					Adnim users can add and edit products, view and manage orders and
					control user privelages.
				</p>

				<div className='flex flex-col items-center w-full mb-4'>
					<div className='flex flex-col sm:flex-row sm:w-full sm:justify-around'>
						<ol className='pr-1 sm:px-2'>
							{[
								'Paypal payment integration',
								'Secure checkout',
								'Add and edit products',
								'Manage users and orders'
							].map(item => (
								<li key={item} className='flex items-start'>
									<div className='rounded-full bg-black w-1 h-1 mr-2 ml-2 mt-2'></div>
									<p className='font-medium text-sm'>{item}</p>
								</li>
							))}
						</ol>
						<ol className='sm:px-2'>
							{[
								'User authentication',
								'Interactive animations',
								'Intuitive design',
								'Responsive on any screen'
							].map(item => (
								<li key={item} className='flex items-start'>
									<div className='rounded-full bg-black w-1 h-1 mr-2 ml-2 mt-2'></div>
									<p className='font-medium text-sm'>{item}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
				<div
					className={`relative group cursor-pointer w-full`}
					onClick={() => setPlayGif(prev => (prev === 2 ? 0 : 2))}
				>
					{playGif !== 2 && (
						<SVG
							name='playFill'
							classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-white w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100'
						/>
					)}
					<div className='rounded-2xl overflow-hidden w-full border'>
						{playGif === 2 ? (
							<Image
								src='/assets/gifs/origami.cool.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						) : (
							<Image
								src='/assets/images/origami-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default index;
