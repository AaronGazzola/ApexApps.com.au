import Meta from '../../../components/Meta';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Button from '../../../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getProposalById } from '../../../redux/users/users.slice';

const index = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const { user, loading, proposal } = useAppSelector(state => state.users);
	const { breakpoint } = useAppSelector(state => state.utils);
	const proposalId = typeof id === 'string' ? id : '';

	useEffect(() => {
		if (proposalId) dispatch(getProposalById(proposalId));
	}, [proposalId]);

	return (
		<>
			<Meta title='Proposal | Apex Apps' />
			<h1 className='title'>Project Proposal</h1>
			<div className='flex items-center w-72 mb-6 flex-wrap-reverse justify-center sm:w-auto'>
				<div className='mr-0 sm:mr-4 flex flex-col items-center'>
					<div className='box w-72 sm:w-80 h-min'>
						<p className='text-sm font-medium'>
							Hi, I'm Aaron Gazzola, A Full-Stack Javascript Developer.
						</p>
						<p className='text-sm font-medium'>
							I create elegant and powerful web applications - accessable on any
							device
						</p>
					</div>
					<Button
						label='More about Apex Apps'
						variant='simple'
						color='green'
						buttonClasses='border border-green px-1.5 py-0.5'
						size='small'
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
			{loading || !proposal ? (
				<>
					<div className='skeleton w-72 h-8 mb-4'></div>
					<div className='box w-72 sm:max-w-lg sm:w-full'>
						<div className='skeleton w-60 h-7 mb-3'></div>
						<div className='flex flex-col items-left w-full'>
							<div className='skeleton w-11/12 h-4 mb-2 '></div>
							<div className='skeleton w-10/12 h-4 mb-2 '></div>
							<div className='skeleton w-8/12 h-4 mb-6 '></div>
							<div className='skeleton w-12/12 h-4 mb-2 '></div>
							<div className='skeleton w-4/12 h-4 '></div>
						</div>
					</div>
					<div className='box w-72 sm:max-w-lg sm:w-full'>
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
						<div className='text-box p-4' key={index}>
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
										size='small'
										buttonClasses='border border-green px-1.5 py-0.5 mt-4'
										fullWidth
									/>
								</a>
							)}
						</div>
					))}
					{proposal?.videoLink && (
						<div className='w-full sm:px-8'>
							<div className='box full p-4'>
								<h2 className='title-sm mb-2 sm:mb-4'>Personal introduction</h2>
								<div
									className='w-full relative'
									style={{ paddingTop: '56.25%' }}
								>
									<iframe
										className='absolute top-0 left-0 w-full h-full'
										width='560'
										height='315'
										src={
											proposal.videoLink?.startsWith(
												'https://www.youtube.com/embed'
											)
												? proposal.videoLink
												: `https://www.youtube.com/embed/${proposal.videoLink}`
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

export default index;