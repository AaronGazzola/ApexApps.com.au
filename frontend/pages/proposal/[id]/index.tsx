import Meta from '../../../components/Meta';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Button from '../../../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getProposalById } from '../../../redux/users/users.slice';
import SVG from '../../../components/SVG';

const Index = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const { loading, proposal } = useAppSelector(state => state.users);
	const { breakpoint } = useAppSelector(state => state.utils);
	const proposalId = typeof id === 'string' ? id : '';
	const [playGif, setPlayGif] = useState(0);
	useEffect(() => {
		if (proposalId) dispatch(getProposalById(proposalId));
	}, [proposalId, dispatch]);

	return (
		<>
			<Meta title='Proposal | Apex Apps' />
			<h1 className='title'>Project Proposal</h1>
			<div
				className='flex items-center w-ful mb-10 flex-wrap-reverse justify-center sm:w-auto px-2'
				style={{ maxWidth: breakpoint === 'xs' ? 450 : '' }}
			>
				<div className='mr-0 sm:mr-4 flex flex-col items-center'>
					<div
						className='relative w-full sm:w-80 p-4 flex flex-col'
						style={{ height: 112 }}
					>
						<p className='text-sm font-medium z-30'>
							Hi, I&apos;m Aaron Gazzola, an Australian{' '}
							<span className='whitespace-nowrap'>full-stack</span> Javascript
							Developer.
						</p>
						<p className='text-sm font-medium z-30'>
							I create elegant and powerful web applications - accessible on any
							device.
						</p>
						{breakpoint === 'xs' ? (
							<>
								<div className='absolute top-0 left-1/2 transform rotate-45 rounded-tl-md w-11 h-11 shadow-lg -translate-y-1/2 -translate-x-1/2 bg-white'></div>
								<div className='absolute left-1/2 top-0 transform rotate-45 rounded-tl-md w-11 h-11 -translate-y-1/2 -translate-x-1/2 bg-white z-20'></div>
							</>
						) : (
							<>
								<div className='absolute right-0 top-1/2 transform rotate-45 rounded-tr-md w-11 h-11 shadow-lg translate-x-1/2 -translate-y-1/2 bg-white'></div>
								<div className='absolute right-0.5 top-1/2 transform rotate-45 rounded-tr-md w-11 h-11 translate-x-1/2 -translate-y-1/2 bg-white z-20'></div>
							</>
						)}
						<div className='absolute box top-0 left-0 w-full sm:w-80 h-min z-10'>
							<p className='text-sm font-medium opacity-0'>
								Hi, I&apos;m Aaron Gazzola, an Australian{' '}
								<span className='whitespace-nowrap'>full-stack</span> Javascript
								Developer.
							</p>
							<p className='text-sm font-medium opacity-0'>
								I create elegant and powerful web applications - accessible on
								any device.
							</p>
						</div>
					</div>
					<Button
						label='More about Apex Apps'
						variant='simple'
						color='green'
						buttonClasses='border border-green px-1.5 py-0.5 mt-12 sm:mt-4'
						type='link'
						path='/'
					/>
				</div>
				<div
					className='rounded-full overflow-hidden mb-4 sm:mb-0 shadow-xl'
					style={{
						width: breakpoint === 'xs' ? 160 : 180,
						height: breakpoint === 'xs' ? 160 : 180
					}}
				>
					<Image
						src='/assets/images/profile-dark.jpg'
						width={breakpoint === 'xs' ? 160 : 180}
						height={breakpoint === 'xs' ? 160 : 180}
						alt='Aaron Gazzola'
					/>
				</div>
			</div>
			{loading ? (
				<>
					<div className='skeleton w-64 h-8 mb-4'></div>
					<div className='box w-full sm:max-w-lg'>
						<div className='skeleton w-60 h-7 mb-3'></div>
						<div className='flex flex-col items-left w-full'>
							<div className='skeleton w-11/12 h-4 mb-2 '></div>
							<div className='skeleton w-10/12 h-4 mb-2 '></div>
							<div className='skeleton w-8/12 h-4 mb-6 '></div>
							<div className='skeleton w-12/12 h-4 mb-2 '></div>
							<div className='skeleton w-4/12 h-4 '></div>
						</div>
					</div>
					<div className='box w-full sm:max-w-lg'>
						<div className='skeleton w-60 h-7 mb-3'></div>
						<div className='flex flex-col items-left w-full'>
							<div className='skeleton w-5/12 h-4 mb-2 '></div>
							<div className='skeleton w-10/12 h-4 mb-2 '></div>
							<div className='skeleton w-8/12 h-4 mb-6 '></div>
							<div className='skeleton w-8/12 h-4 mb-4 '></div>
							<div className='skeleton w-11/12 h-4 mb-2 '></div>
							<div className='skeleton w-6/12 h-4 '></div>
						</div>
					</div>
				</>
			) : (
				<>
					<h1 className='title mb-4'>{proposal?.title}</h1>
					{proposal?.sections?.map((section, index) => (
						<div className='text-box w-full max-w-xl' key={index}>
							<h2 className='box-title'>{section.title}</h2>
							<p className='box-text'>
								{section.content.split('<br/>').map((paragraph, index) => (
									<React.Fragment key={index}>
										{paragraph}
										<br />
									</React.Fragment>
								))}
							</p>
							{section.buttonLink && section.buttonLabel && (
								<a
									href={section.buttonLink}
									target='_blank'
									rel='noreferrer noopener'
									className='w-full'
								>
									<Button
										label={section.buttonLabel}
										type='button'
										color='green'
										variant='simple'
										buttonClasses='border border-green px-1.5 py-0.5 mt-4'
										fullWidth
									/>
								</a>
							)}
						</div>
					))}
					{proposal?.videoLink && (
						<div className='w-full sm:px-8 max-w-4xl'>
							<div className='box full p-4 relative'>
								<h2 className='title-sm mb-2 sm:mb-4'>Personal introduction</h2>
								<div
									className='w-full relative'
									style={{ paddingTop: '56.25%' }}
								>
									<div className='flex items-center justify-center absolute top-0 left-0 right-0 bottom-0'>
										<div className='border-blue-darkest w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
									</div>
									<iframe
										className='absolute top-0 left-0 w-full h-full z-10'
										width='560'
										height='315'
										src={
											proposal?.videoLink?.startsWith(
												'https://www.youtube.com/embed'
											)
												? proposal?.videoLink
												: `https://www.youtube.com/embed/${proposal?.videoLink}`
										}
										title='Personal introduction video'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
									></iframe>
								</div>
							</div>
						</div>
					)}
					<div className='box w-full max-w-2xl border-blue-darkest border mt-4'>
						<h1 className='title'>Apex Apps Dashboard</h1>
						<p className='px-4 pt-1'>
							As a client at Apex Apps, you will gain access to a personalised
							project dashboard. Track development progress, view your project
							timeline and receive scheduled updates - all in one place.
						</p>
						<Button
							label='Explore the dashboard'
							type='link'
							path='/tour'
							variant='simple'
							size='large'
							buttonClasses=' pl-3 pr-2 py-0.5 mt-3 mb-2 border-2 border-green font-semibold'
							color='green'
							endIcon={
								<SVG
									name='map'
									classes='fill-current text-green ml-1 mt-0.5 w-7 h-7'
								/>
							}
						/>
						<div className='w-full p-2 cursor-pointer'>
							<div
								className={`relative group cursor-pointer  transform rounded-2xl shadow-lg overflow-hidden border`}
								style={{ paddingTop: '56%' }}
								onClick={() => setPlayGif(prev => (prev === 1 ? 0 : 1))}
							>
								{playGif !== 1 ? (
									<SVG
										name='playFill'
										classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue-darkest w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100 z-20'
									/>
								) : (
									<>
										<div className='flex items-center justify-center top-0 left-0 right-0 bottom-0 absolute z-10'>
											<div className='border-blue-darkest w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
										</div>
										<SVG
											name='mute'
											classes='absolute bottom-2 right-2 fill-current text-gray z-30'
										/>
									</>
								)}
								<div
									className={`w-full absolute top-0 left-0 z-20 ${
										playGif === 1 ? 'opacity-100' : 'opacity-0'
									}`}
								>
									<Image
										alt='animated gif of Apex Apps project dashboard'
										src='/assets/gifs/apexapps.com.au.gif'
										layout='responsive'
										width={1598}
										height={895}
									/>
								</div>
								<div className={`w-full absolute top-0 left-0`}>
									<Image
										alt='scrennshot of Apex Apps project dashboard'
										src='/assets/images/apex-screenshot.jpg'
										layout='responsive'
										width={1598}
										height={895}
									/>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<Button
				label="Let's chat!"
				size='large'
				variant='contained'
				color='green'
				type='link'
				path='/contact'
				buttonClasses='py-1.5 px-20 mt-2 sm:mt-4'
			/>
		</>
	);
};

export default Index;
