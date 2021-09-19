import Meta from '../../components/Meta';
import Input from '../../components/Input';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import {
	addProposal,
	clearUsersTrigger,
	deleteProposal,
	editProposal,
	getClientProposal,
	getProposals,
	resetProposal,
	setProposal
} from '../../redux/users/users.slice';
import ConfirmModal from '../../components/ConfirmModal';
import Modal from '../../components/Modal';
import Image from 'next/image';

interface Section {
	title: string;
	content: string;
	buttonLabel: string;
	buttonLink: string;
}

const Index = () => {
	const dispatch = useAppDispatch();
	const { user, userView, loading, proposal, proposals, trigger } =
		useAppSelector(state => state.users);
	const { breakpoint } = useAppSelector(state => state.utils);

	const initialState = {
		currentClient: false,
		title: '',
		videoLink: '',
		sections: [
			{
				title: '',
				content: '',
				buttonLabel: '',
				buttonLink: ''
			}
		]
	};

	const [playGif, setPlayGif] = useState(0);
	const [state, setState] = useState(initialState as { [index: string]: any });
	const { currentClient, title, sections, videoLink } = state;
	const [modalState, setModalState] = useState({
		isOpen: false,
		content: '',
		type: '',
		index: 0
	});

	let proposalOptions = ['New proposal'];
	if (proposals?.length)
		proposalOptions = [
			...proposalOptions,
			...proposals?.map(proposal => `${proposal.title} - ${proposal._id}`)
		];

	const changeHandler = (
		e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = e.currentTarget;
		let value = target.value;
		let sectionsCopy = [...sections];
		setState({
			...state,
			[target.id]: value,
			sections: sectionsCopy
		});
	};

	const changeSectionHandler = (
		e: React.FormEvent<HTMLInputElement | HTMLSelectElement>,
		{ index, field }: { index: number; field: string }
	) => {
		const sectionCopy = { ...sections[index] };
		sectionCopy[field] = e.currentTarget.value;
		const sectionsCopy = [...sections];
		sectionsCopy[index] = sectionCopy;
		setState({
			...state,
			sections: sectionsCopy
		});
	};

	const changeCheckedHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		let value = target.checked;
		if (value) {
			dispatch(getClientProposal());
			setState(prev => ({ ...prev, currentClient: value }));
		} else {
			dispatch(resetProposal());
			setState(prev => ({
				...prev,
				currentClient: value
			}));
		}
	};

	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		const submitProposal = {
			title,
			sections,
			videoLink,
			currentClient
		};
		if (!proposal?._id) {
			dispatch(addProposal(submitProposal));
		} else if (proposal) {
			dispatch(
				editProposal({
					proposal: submitProposal,
					proposalId: proposal._id ? proposal._id : ''
				})
			);
		}
	};

	const addSectionHandler = (index: number) => {
		const newSections = [...state.sections];
		newSections.splice(index, 0, {
			title: '',
			content: '',
			buttonLabel: '',
			buttonLink: ''
		});
		setState({
			...state,
			sections: newSections
		});
	};

	const setProposalHandler = (e: React.FormEvent<HTMLSelectElement>) => {
		if (e.currentTarget.value === 'New proposal') {
			setState(initialState);
			dispatch(resetProposal());
			return;
		}
		dispatch(setProposal(e.currentTarget.value.slice(-24)));
	};

	const renderModalContent = (modalType: string) => {
		switch (modalType) {
			case 'deleteProposal':
				return (
					<ConfirmModal
						confirmFunction={() =>
							dispatch(deleteProposal(proposal?._id || ''))
						}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
						type='delete'
						content={modalState.content}
					/>
				);
			case 'deleteSection':
				return (
					<ConfirmModal
						confirmFunction={() => {
							const sectionsCopy = [...state.sections];
							sectionsCopy.splice(modalState.index, 1);
							setState({
								...state,
								sections: sectionsCopy
							});
							setModalState({
								...modalState,
								isOpen: false
							});
						}}
						cancelFunction={() =>
							setModalState({ ...modalState, isOpen: false })
						}
						type='delete'
						content={`Section ${modalState.index + 1}`}
					/>
				);
			default:
				return <></>;
		}
	};

	useEffect(() => {
		if (user?.isAdmin && !proposals?.length) dispatch(getProposals());
	}, [user?.isAdmin, dispatch, proposals?.length]);

	useEffect(() => {
		if (user && !user.isAdmin && !proposal) dispatch(getClientProposal());
	}, [user, proposal, dispatch]);

	useEffect(() => {
		if (trigger === 'setProposalState') {
			setState(prev => ({
				...prev,
				title: proposal?.title || '',
				videoLink: proposal?.videoLink || '',
				sections: proposal?.sections || [
					{
						title: '',
						content: '',
						buttonLabel: '',
						buttonLink: ''
					}
				]
			}));
			dispatch(clearUsersTrigger());
		}
	}, [proposal, user?.client?.proposal, dispatch, trigger]);

	useEffect(() => {
		if (trigger === 'resetProposal') {
			dispatch(resetProposal());
		}
	}, [trigger, dispatch]);

	return (
		<>
			<Meta title='Proposal | Apex Apps' />
			<h1 className='title'>Project Proposal</h1>
			{user?.isAdmin && !userView ? (
				<>
					<Modal
						isOpen={modalState.isOpen}
						onClose={() => setModalState({ ...modalState, isOpen: false })}
					>
						{renderModalContent(modalState.type)}
					</Modal>
					<form
						onSubmit={submitHandler}
						className='flex flex-col items-center w-full'
					>
						<div className='box w-full max-w-md'>
							<div className='flex justify-center'>
								<Input
									type='checkbox'
									label='Current Client'
									value={currentClient}
									id='currentClient'
									validation={false}
									onChange={changeCheckedHandler}
								/>
							</div>
							<Input
								type='select'
								options={proposalOptions}
								label='Select Proposal'
								value={
									proposal
										? `${proposal.title} - ${proposal._id}`
										: 'New proposal'
								}
								id='selectProposal'
								validation={false}
								onChange={setProposalHandler}
								containerClasses='mt-4'
							/>
							{proposal?._id && (
								<>
									<div className='flex justify-end w-full'>
										<Button
											size='small'
											color='red'
											variant='simple'
											label='Delete proposal'
											buttonClasses='px-1.5 py-1 mt-2'
											onClick={() =>
												setModalState({
													...modalState,
													isOpen: true,
													type: 'deleteProposal',
													content: title
												})
											}
										/>
									</div>
									<div className='border border-gray-light rounded-md p-2 w-full flex flex-col items-center'>
										<p className='font-semibold text-sm text-gray-dark'>
											Proposal link:
										</p>
										<p className='text-sm'>
											apexapps.com.au/proposal/
											<br />
											{proposal._id}
										</p>
									</div>
								</>
							)}
							<Input
								type='text'
								label='Title'
								value={title}
								id='title'
								validation={false}
								onChange={changeHandler}
								containerClasses='mt-2'
								placeholder='Title'
							/>
						</div>

						<SVG
							onClick={() => addSectionHandler(0)}
							name='add'
							classes='fill-current text-green w-6 h-6'
						/>
						{sections.map((section: Section, index: number) => (
							<React.Fragment key={index}>
								<div className='box w-full max-w-md relative'>
									<SVG
										name='close'
										classes={`absolute left-3 top-4 fill-current text-red w-8 h-8 z-10 cursor-pointer`}
										onClick={() =>
											setModalState({
												...modalState,
												isOpen: true,
												type: 'deleteSection',
												index
											})
										}
									/>
									<h2 className='title-sm'>Section {index + 1}</h2>
									<Input
										type='text'
										label='Title'
										value={sections[index].title}
										id={`section${index + 1}title`}
										validation={false}
										onChange={(
											e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
										) => changeSectionHandler(e, { index, field: 'title' })}
										containerClasses='mt-2'
										placeholder='Title'
									/>
									<Input
										type='textarea'
										label='Content'
										value={sections[index].content}
										id={`section${index + 1}content`}
										validation={false}
										onChange={(
											e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
										) => changeSectionHandler(e, { index, field: 'content' })}
										containerClasses='mt-2'
										placeholder='Content'
									/>
									<Input
										type='text'
										label='Button label'
										value={sections[index].buttonLabel}
										id={`section${index + 1}buttonLabel`}
										validation={false}
										onChange={(
											e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
										) =>
											changeSectionHandler(e, { index, field: 'buttonLabel' })
										}
										containerClasses='mt-2'
										placeholder='Button label'
									/>
									<Input
										type='text'
										label='Button link'
										value={sections[index].buttonLink}
										id={`section${index + 1}buttonLink`}
										validation={false}
										onChange={(
											e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
										) =>
											changeSectionHandler(e, { index, field: 'buttonLink' })
										}
										containerClasses='mt-2'
										placeholder='Button link'
									/>
								</div>
								<SVG
									onClick={() => addSectionHandler(index + 1)}
									name='add'
									classes='fill-current text-green w-6 h-6'
								/>
							</React.Fragment>
						))}
						<div className='box w-full max-w-md'>
							<h2 className='title-sm'>Intro video</h2>
							<Input
								type='text'
								label='Video link'
								value={videoLink}
								id={`videoLink`}
								validation={false}
								onChange={changeHandler}
								containerClasses='mt-2'
								placeholder='Video link'
								helperText='Enter string following /embed/...'
							/>
						</div>
						<Button
							type='submit'
							variant='contained'
							color='green'
							label='Save changes'
							size='large'
							buttonClasses='px-4 py-1 mt-2'
							loading={loading}
						/>
					</form>
				</>
			) : (
				<>
					<div
						className='flex items-center w-ful mb-6 flex-wrap-reverse justify-center sm:w-auto px-2'
						style={{ maxWidth: breakpoint === 'xs' ? 450 : '' }}
					>
						<div className='mr-0 sm:mr-4 flex flex-col items-center'>
							<div
								className='relative w-full sm:w-80 p-4 flex flex-col'
								style={{ height: 112 }}
							>
								<p className='text-sm font-medium z-30'>
									Hi, I&apos;m Aaron Gazzola, A Full-Stack Javascript Developer.
								</p>
								<p className='text-sm font-medium z-30'>
									I create elegant and powerful web applications - accessible on
									any device.
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
										Hi, I&apos;m Aaron Gazzola, A Full-Stack Javascript
										Developer.
									</p>
									<p className='text-sm font-medium opacity-0'>
										I create elegant and powerful web applications - accessible
										on any device.
									</p>
								</div>
							</div>
							<Button
								label='More about Apex Apps'
								variant='simple'
								color='green'
								buttonClasses='border border-green px-1.5 py-0.5 mt-8 sm:mt-4'
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
					{loading || !user?.client?.proposal ? (
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
								<div className='text-box w-full max-w-xl p-6' key={index}>
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
										<h2 className='title-sm mb-2 sm:mb-4'>
											Personal introduction
										</h2>
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
									As a client at Apex Apps, you will gain access to a
									personalised project dashboard. Track development progress,
									view your project timeline and receive scheduled updates - all
									in one place.
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
			)}
		</>
	);
};

export default Index;
