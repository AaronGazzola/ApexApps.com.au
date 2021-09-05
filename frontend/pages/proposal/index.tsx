import Meta from '../../components/Meta';
import Input from '../../components/Input';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from '../../components/Button';
import SVG from '../../components/SVG';
import {
	addProposal,
	deleteProposal,
	editProposal,
	getClientProposal,
	getProposals,
	resetProposal,
	setProposal
} from '../../redux/users/users.slice';
import ConfirmModal from '../../components/ConfirmModal';
import Modal from '../../components/Modal';

interface Section {
	title: string;
	content: string;
	buttonLabel: string;
	buttonLink: string;
}

const index = () => {
	const dispatch = useAppDispatch();
	const {
		user,
		isAuth,
		loading,
		proposal,
		proposals,
		success: usersSuccess
	} = useAppSelector(state => state.users);

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
		const sectionsCopy = [...sections];
		sectionsCopy[index][field] = e.currentTarget.value;
		setState({
			...state,
			sections: sectionsCopy
		});
	};

	const changeCheckedHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const target = e.currentTarget;
		let value = target.checked;
		setState({
			...state,
			[target.id]: value
		});
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

	// if admin, get all proposals
	// if proposal exists on client, get this proposal
	useEffect(() => {
		if (user?.isAdmin) dispatch(getProposals());
		if (user?.client?.proposal) {
			setState({
				...state,
				currentClient: true
			});
		}
	}, [isAuth]);

	//if proposal changes, set state to proposal content
	useEffect(() => {
		if (proposal)
			setState({
				...state,
				title: proposal.title || '',
				videoLink: proposal.videoLink || '',
				sections: proposal.sections || '',
				currentClient: proposal?._id === user?.client?.proposal?._id
			});
	}, [proposal]);

	// when change current client
	// set proposal to client proposal, or new proposal
	useEffect(() => {
		if (
			currentClient &&
			user?.client?.proposal &&
			proposal?._id !== user?.client?.proposal._id
		) {
			dispatch(getClientProposal());
		} else if (user?.isAdmin && !currentClient) {
			dispatch(resetProposal());
		}
	}, [currentClient]);

	// if proposal deleted, reset state
	useEffect(() => {
		if (usersSuccess === 'Proposal deleted') dispatch(resetProposal());
	}, [usersSuccess]);

	return (
		<>
			<Meta title='Proposal | Apex Apps' />
			<h1 className='title'>Proposal</h1>
			{user?.isAdmin ? (
				<>
					<Modal
						isOpen={modalState.isOpen}
						onClose={() => setModalState({ ...modalState, isOpen: false })}
					>
						{renderModalContent(modalState.type)}
					</Modal>
					<form onSubmit={submitHandler} className='flex flex-col items-center'>
						<div className='box w-72 sm:w-80'>
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
								<div className='flex justify-end'>
									<Button
										size='small'
										color='red'
										variant='simple'
										label='Delete proposal'
										buttonClasses='border-2 border-red px-1.5 py-1 mt-4'
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
						<Button
							type='button'
							size='large'
							variant='simple'
							color='green'
							onClick={() => addSectionHandler(0)}
							endIcon={
								<div className='w-6 h-6'>
									<SVG
										name='add'
										classes='fill-current text-green w-full h-full'
									/>
								</div>
							}
							buttonClasses='mb-4'
						/>
						{sections.map((section: Section, index: number) => (
							<React.Fragment key={index}>
								<div className='box w-72 sm:w-80 relative'>
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
										type='text'
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
								<Button
									type='button'
									size='large'
									variant='simple'
									color='green'
									onClick={() => addSectionHandler(index + 1)}
									endIcon={
										<div className='w-6 h-6'>
											<SVG
												name='add'
												classes='fill-current text-green w-full h-full'
											/>
										</div>
									}
									buttonClasses='mb-4'
								/>
							</React.Fragment>
						))}
						<div className='box w-72 sm:w-80'>
							<h2 className='title-sm'>Intro video</h2>
							<Input
								type='text'
								label='Vido link'
								value={videoLink}
								id={`videoLink`}
								validation={false}
								onChange={changeHandler}
								containerClasses='mt-2'
								placeholder='Video link'
							/>
						</div>
						<Button
							type='submit'
							variant='contained'
							color='green'
							label='Save changes'
							size='large'
							fullWidth
							buttonClasses='px-2 py-1 mt-2'
							loading={loading}
						/>
					</form>
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default index;
