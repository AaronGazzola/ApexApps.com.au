import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Meta from '../../components/Meta';
import SVG from '../../components/SVG';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, getUsers } from '../../redux/users/users.slice';
import moment from 'moment';
import Modal from '../../components/Modal';
import EditProfileModal from '../../components/EditProfileModal';
import ClientModal from '../../components/ClientModal';

const index = () => {
	const dispatch = useAppDispatch();
	const {
		loading: usersLoading,
		user,
		users,
		success: usersSuccess,
		alert: usersAlert,
		error: usersError
	} = useAppSelector(state => state.users);
	const [formState, setFormState] = useState({
		clientName: '',
		projectName: '',
		projectDescription: '',
		startFrom: '16-Aug-21',
		startTo: '26-Aug-21',
		endFrom: '20-Dec-21',
		endTo: '1-Jan-22',
		costFrom: 10000,
		costTo: 10000
	});
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalType, setModalType] = useState('');

	const {
		clientName,
		projectName,
		projectDescription,
		startFrom,
		startTo,
		endFrom,
		endTo,
		costFrom,
		costTo
	} = formState;

	const client = users?.find(user => user.clientName === clientName);

	const changeHandler = (e: BaseSyntheticEvent) => {
		let value = e.target.value;
		switch (e.target.id) {
			case 'startFrom':
			case 'startTo':
			case 'endFrom':
			case 'endTo':
				value = moment(e.target.value).format('D-MMM-YY');
			default:
				break;
		}
		setFormState({
			...formState,
			[e.target.id]: value
		});
	};

	const logoutHandler = (e: SyntheticEvent) => {
		dispatch(logout());
	};
	const openModalhandler = (modalType: string) => {
		setModalIsOpen(true);
		setModalType(modalType);
	};

	const renderModalContent = (modalType: string) => {
		switch (modalType) {
			case 'editProfile':
				return <EditProfileModal />;
			case 'addClient':
				return <ClientModal />;
			case 'editClientName':
				return (
					<ClientModal clientName={clientName} id={client ? client._id : ''} />
				);
			default:
				return <></>;
		}
	};

	useEffect(() => {
		if (usersSuccess || usersAlert || usersError) setModalIsOpen(false);
	}, [usersSuccess, usersAlert, usersError]);

	useEffect(() => {
		if (user?.isAdmin && usersSuccess) dispatch(getUsers());
	}, [user?.isAdmin, usersSuccess]);

	useEffect(() => {
		if (user?.isAdmin && users?.length && (!clientName || usersSuccess)) {
			setFormState({
				...formState,
				clientName: users[0].clientName
			});
		}
	}, [user, users]);

	return (
		<>
			<Meta title='Your Project | Apex Apps' />
			<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				{renderModalContent(modalType)}
			</Modal>
			<h1 className='title'>Project</h1>
			<div className='box w-72 sm:w-80'>
				{usersLoading || !user ? (
					<>
						<div className='skeleton w-36 h-7 m-1'></div>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<div className='skeleton w-24 h-5 m-1'></div>
						<div className='w-min flex justify-between mt-1'>
							<div className='skeleton w-24 h-5'></div>
							<div className='skeleton w-24 h-5 ml-2'></div>
						</div>
						<div className='skeleton w-full h-8 mt-3'></div>
						<div className='w-full flex justify-between mt-1'>
							<div className='skeleton w-24 h-5'></div>
						</div>
					</>
				) : (
					<>
						<h2 className='title-sm text-gray-dark'>{user?.userName}</h2>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<h3 className='text-sm'>{user?.email}</h3>
						<div className='w-min flex justify-between mt-3'>
							<Button
								label='Log out'
								color='red'
								variant='simple'
								size='small'
								startIcon={<div className='w-2'></div>}
								endIcon={
									<div className='ml-1 w-4 h-4'>
										<SVG name='door' classes='w-full fill-current' />
									</div>
								}
								onClick={logoutHandler}
								buttonClasses='px-1 py-0.5'
							/>
							<Button
								label='Edit profile'
								color='yellow'
								variant='simple'
								size='small'
								onClick={() => openModalhandler('editProfile')}
								buttonClasses='ml-2 px-1 py-0.5'
								startIcon={<div className='w-2'></div>}
								endIcon={
									<div className='ml-1 w-4 h-4'>
										<SVG name='pencil' classes='w-full fill-current' />
									</div>
								}
							/>
						</div>
						{user.isAdmin && (
							<>
								<Input
									value={clientName}
									onChange={changeHandler}
									label='Client'
									type='select'
									id='clientName'
									fullWidth
									options={users?.map(user => user.clientName)}
									containerClasses='mt-4 '
									inputClasses=''
									labelTop
								/>
								<div className='mt-2 flex justify-between w-full'>
									{users?.length && (
										<Button
											label='Edit client name'
											color='yellow'
											variant='simple'
											size='small'
											buttonClasses='border py-0.5 px-1.5'
											onClick={() => openModalhandler('editClientName')}
										/>
									)}
									<Button
										label='Add client'
										color='green'
										variant='simple'
										size='small'
										buttonClasses='border py-0.5 px-1.5'
										onClick={() => openModalhandler('addClient')}
									/>
								</div>
							</>
						)}
						<Input
							value={projectName}
							onChange={changeHandler}
							label='Name of project'
							type='select'
							id='projectName'
							fullWidth
							options={['Project 1', 'Project 2']}
							containerClasses='mt-4'
							inputClasses=''
							labelTop
						/>
						<div className='mt-2 flex justify-between w-full'>
							<Button
								label='Edit project name'
								color='yellow'
								variant='simple'
								size='small'
								buttonClasses='border py-0.5 px-1.5'
							/>
							{user.isAdmin && (
								<Button
									label='Add project'
									color='green'
									variant='simple'
									size='small'
									buttonClasses='border py-0.5 px-1.5'
								/>
							)}
						</div>
					</>
				)}
			</div>
			<div className='box w-72 sm:w-3/4 lg:w-1/2 max-w-lg'>
				{usersLoading || !user ? (
					<>
						<div className='skeleton w-36 h-7 m-1'></div>
						<div className='skeleton w-full h-8 m-1'></div>
						<div className='flex w-full justify-end mt-1'>
							<div className='skeleton w-24 h-5'></div>
						</div>
					</>
				) : (
					<>
						<h2 className='title-sm'>Project Title</h2>
						<Input
							type='textarea'
							labelTop
							value={projectDescription}
							id='projectDescription'
							placeholder='Project description'
							onChange={changeHandler}
							label='Project description'
							validation={false}
						/>
						<div className='flex justify-end w-full mt-2'>
							<Button
								label='Update description'
								color='green'
								variant='simple'
								size='small'
								buttonClasses='border py-0.5 px-1.5'
							/>
						</div>
					</>
				)}
			</div>
			<div className='box w-72 sm:w-80'>
				{usersLoading || !user ? (
					<>
						<div className='skeleton w-36 h-7 mt-1 mb-3'></div>
						<div className='skeleton w-52 h-7 m-1'></div>
						<div className='skeleton w-52 h-7 m-1'></div>
						<div className='skeleton w-52 h-7 m-1'></div>
					</>
				) : (
					<>
						<h2 className='title-sm mb-3'>Project Estimate</h2>
						<p className='font-semibold text-gray-dark text-sm mb-1'>
							Start Between
						</p>
						<div className='relative flex w-full mb-4'>
							{user.isAdmin && (
								<>
									<input
										type='date'
										className='absolute top-0 right-1/2  w-12 h-full mr-7 opacity-0'
										id='startFrom'
										onChange={changeHandler}
									/>
									<input
										type='date'
										className='absolute top-0 left-1/2  w-12 h-full opacity-0'
										id='startTo'
										onChange={changeHandler}
									/>
								</>
							)}
							<p className='text-gray-dark w-1/2 pr-7 text-right'>
								{startFrom}
							</p>
							<SVG
								name='doubleArrow'
								classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
							/>
							<p className='text-gray-dark w-1/2 pl-7'>{startTo}</p>
						</div>
						<p className='font-semibold text-gray-dark text-sm mb-1'>
							End Between
						</p>
						<div className='relative flex w-full mb-4'>
							{user.isAdmin && (
								<>
									<input
										type='date'
										className='absolute top-0 right-1/2  w-12 h-full mr-7 opacity-0'
										id='endFrom'
										onChange={changeHandler}
									/>
									<input
										type='date'
										className='absolute top-0 left-1/2  w-12 h-full opacity-0'
										id='endTo'
										onChange={changeHandler}
									/>
								</>
							)}
							<p className='text-gray-dark w-1/2 pr-7 text-right'>{endFrom}</p>
							<SVG
								name='doubleArrow'
								classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
							/>
							<p className='text-gray-dark w-1/2 pl-7'>{endTo}</p>
						</div>
						<p className='font-semibold text-gray-dark text-sm mb-1'>
							Total cost between
						</p>
						<div className='relative flex w-full mb-2'>
							<p className='text-gray-dark w-1/2 pr-7 text-right'>
								${costFrom.toLocaleString('en-US')}
								<span className='text-xxxs font-semibold'>USD</span>
							</p>
							<SVG
								name='doubleArrow'
								classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
							/>
							<p className='text-gray-dark w-1/2 pl-7'>
								${costTo.toLocaleString('en-US')}
								<span className='text-xxxs font-semibold'>USD</span>
							</p>
						</div>
						{user.isAdmin && (
							<div className='flex justify-end w-full mt-2'>
								<Button
									label='Update estimate'
									color='green'
									variant='simple'
									size='small'
									buttonClasses='border py-0.5 px-1.5'
								/>
							</div>
						)}
					</>
				)}
			</div>
			{user && user.isAdmin && (
				<>
					<div className='box w-72 sm:w-80'>
						<h2 className='title-sm'>Client Signup Link</h2>
						<p className='mt-2 text-gray-dark'>ApexApps.dev/signup/123456789</p>
					</div>
					<Button
						label='Upload contract PDF'
						color='green'
						variant='simple'
						size='small'
						buttonClasses='border py-0.5 px-1.5'
					/>
				</>
			)}
		</>
	);
};

export default index;
