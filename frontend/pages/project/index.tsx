import moment from 'moment';
import React, {
	BaseSyntheticEvent,
	ChangeEvent,
	SyntheticEvent,
	useState
} from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Meta from '../../components/Meta';
import SVG from '../../components/SVG';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { usersLogout, setClient } from '../../redux/users/users.slice';
import Modal from '../../components/Modal';
import EditProfileModal from '../../components/ProfileModal';
import ClientModal from '../../components/ClientModal';
import ProjectModal from '../../components/ProjectModal';
import ConfirmModal from '../../components/ConfirmModal';
import EstimateModal from '../../components/EstimateModal';
import {
	deleteProject,
	getProjects,
	projectsLogout,
	setProject,
	uploadContract
} from '../../redux/projects/projects.slice';
import { useRouter } from 'next/router';
import { milestonesLogout } from '../../redux/milestones/milestones.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		client,
		loading: usersLoading,
		user,
		users,
		userView
	} = useAppSelector(state => state.users);
	const {
		loading: projectsLoading,
		project,
		projects
	} = useAppSelector(state => state.projects);
	const loading = usersLoading || projectsLoading || !user;

	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [modalType, setModalType] = useState('');

	const setClientHandler = (e: BaseSyntheticEvent) => {
		dispatch(setClient(e.target.value));
		dispatch(getProjects());
	};

	const setProjectHandler = (e: BaseSyntheticEvent) => {
		const foundProject = projects?.find(
			project => project.title === e.target.value
		);
		if (foundProject) dispatch(setProject(foundProject._id));
	};

	const logoutHandler = (e: SyntheticEvent) => {
		dispatch(usersLogout());
		dispatch(milestonesLogout());
		dispatch(projectsLogout());
		router.push('/login');
	};
	const openModalhandler = (modalType: string) => {
		setModalIsOpen(true);
		setModalType(modalType);
	};

	const fileUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files === null) return;
		dispatch(uploadContract(e.target.files[0]));
	};

	const renderModalContent = (modalType: string) => {
		switch (modalType) {
			case 'editProfile':
				return <EditProfileModal />;
			case 'addClient':
				return <ClientModal />;
			case 'editClientName':
				return <ClientModal clientName={client?.clientName} />;
			case 'addProject':
				return <ProjectModal type='add' />;
			case 'editProject':
				return (
					<ProjectModal
						type='edit'
						title={project?.title}
						description={project?.description}
					/>
				);
			case 'deleteProject':
				return (
					<ConfirmModal
						confirmFunction={() => dispatch(deleteProject())}
						cancelFunction={() => setModalIsOpen(false)}
						type='delete'
						content={project?.title}
					/>
				);
			case 'editEstimate':
				return <EstimateModal />;
			default:
				return <></>;
		}
	};

	return (
		<>
			<Meta title='Your Project | Apex Apps' />
			<Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
				{renderModalContent(modalType)}
			</Modal>
			<h1 className='title'>Project</h1>
			<div className='box w-full max-w-md'>
				{loading ? (
					<>
						<div className='skeleton w-36 h-7 m-1'></div>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<div className='skeleton w-24 h-5 m-1'></div>
						<div className='w-min flex justify-between mt-1'>
							<div className='skeleton w-24 h-5'></div>
							<div className='skeleton w-24 h-5 ml-2'></div>
						</div>
						<div className='skeleton w-full h-8 mt-3'></div>
					</>
				) : (
					<>
						<h2 className='title-sm font-medium text-gray-dark w-full break-words text-center'>
							{user?.userName}
						</h2>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<h3 className='text-sm text-gray-dark font-medium w-full break-words text-center'>
							{user?.email}
						</h3>
						<div className='w-min flex justify-between mt-3'>
							<Button
								label='Log out'
								color='red'
								variant='simple'
								size='small'
								startIcon={<div className='w-2'></div>}
								endIcon={
									<div className='w-6 h-6 -mb-1'>
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
									<div className='-mb-0.5 w-6 h-6'>
										<SVG name='pencil' classes='w-full fill-current' />
									</div>
								}
							/>
						</div>
						{user?.isAdmin && !userView && (
							<>
								<Input
									value={user?.client?.clientName}
									onChange={setClientHandler}
									label='Client'
									type='select'
									id='client'
									fullWidth
									options={users?.map(user => user.clientName)}
									containerClasses='mt-4 '
									inputClasses=''
									labelTop
								/>
								<div className='mt-2 flex justify-between w-full'>
									{user?.client && (
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
							value={project?.title}
							onChange={setProjectHandler}
							label='Select project'
							type='select'
							id='project'
							fullWidth
							options={projects?.map(project => project.title)}
							containerClasses='mt-4'
							inputClasses=''
							labelTop
						/>
						{user?.isAdmin && !userView && (
							<div className='mt-2 flex justify-between w-full'>
								<Button
									label='Delete project'
									color='red'
									variant='simple'
									size='small'
									buttonClasses='border py-0.5 px-1.5'
									onClick={() => openModalhandler('deleteProject')}
								/>
								<Button
									label='Add project'
									color='green'
									variant='simple'
									size='small'
									buttonClasses='border py-0.5 px-1.5'
									onClick={() => openModalhandler('addProject')}
								/>
							</div>
						)}
					</>
				)}
			</div>
			{user?.isAdmin && !client?.isVerified && !userView && (
				<div className='box w-72 sm:w-96'>
					<h2 className='title-sm'>Client Signup Link</h2>
					<p className='mt-2 text-gray-dark font-medium text-center'>
						ApexApps.com.au/signup/
						<br />
						{client?._id}
					</p>
				</div>
			)}
			<div className='text-box sm:px-6'>
				{loading ? (
					<>
						<div className='skeleton w-36 h-7 m-1'></div>
						<div className='skeleton w-full h-8 m-1'></div>
						<div className='flex w-full justify-end mt-1'>
							<div className='skeleton w-24 h-5'></div>
						</div>
					</>
				) : (
					<>
						<h2 className='box-title break-words'>{project?.title}</h2>
						<p
							className={`box-text my-2 ${
								!project?.description ? 'italic text-gray-dark' : ''
							}`}
						>
							{project?.description
								? project?.description
										.split('<br/>')
										.map((paragraph, index) => (
											<React.Fragment key={index}>
												{paragraph}
												<br />
											</React.Fragment>
										))
								: 'Click "Edit project" to add a project description'}
						</p>
						<div className='flex justify-end w-full mt-2'>
							<Button
								label='Edit project'
								color='yellow'
								variant='simple'
								size='small'
								buttonClasses='border py-0.5 px-1.5'
								onClick={() => openModalhandler('editProject')}
							/>
						</div>
					</>
				)}
			</div>
			{loading ? (
				<div className='box w-full max-w-xs'>
					<div className='skeleton w-36 h-7 mt-1 mb-3'></div>
					<div className='skeleton w-52 h-7 m-1'></div>
					<div className='skeleton w-52 h-7 m-1'></div>
					<div className='skeleton w-52 h-7 m-1'></div>
				</div>
			) : project?.estimate?.costFrom || (user?.isAdmin && !userView) ? (
				<div className='box w-full relative max-w-xs'>
					<h2 className='title-sm mb-3'>Project Estimate</h2>
					<p className='font-bold text-gray-dark text-sm mb-1'>Start Between</p>
					<div className='relative flex w-full mb-4' style={{ minHeight: 20 }}>
						<p className=' w-1/2 pr-7 text-right'>
							{moment(project?.estimate?.startFrom).format('D-MMM-YY')}
						</p>
						<SVG
							name='doubleArrow'
							classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
						/>
						<p className=' w-1/2 pl-7'>
							{moment(project?.estimate?.startTo).format('D-MMM-YY')}
						</p>
					</div>
					<p className='font-semibold text-gray-dark text-sm mb-1'>
						End Between
					</p>
					<div className='relative flex w-full mb-4' style={{ minHeight: 20 }}>
						<p className='w-1/2 pr-7 text-right'>
							{moment(project?.estimate?.endFrom).format('D-MMM-YY')}
						</p>
						<SVG
							name='doubleArrow'
							classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
						/>
						<p className='w-1/2 pl-7'>
							{moment(project?.estimate?.endTo).format('D-MMM-YY')}
						</p>
					</div>
					<p className='font-semibold text-gray-dark text-sm mb-1'>
						Total cost between
					</p>
					<div className='relative flex w-full mb-2'>
						<p className=' w-1/2 pr-7 text-right'>
							${project?.estimate?.costFrom?.toLocaleString('en-US')}
							<span className='text-xxs font-semibold'>
								{project?.estimate?.currency}
							</span>
						</p>
						<SVG
							name='doubleArrow'
							classes='fill-current text-gray-light transform -rotate-45 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
						/>
						<p className=' w-1/2 pl-7'>
							${project?.estimate?.costTo?.toLocaleString('en-US')}
							<span className='text-xxs font-semibold'>
								{project?.estimate?.currency}
							</span>
						</p>
					</div>
					<p className='w-full text-center text-sm italic font-medium text-gray-dark mt-4'>
						Estimated values may vary from actual cost and duration of
						development
					</p>
					{user?.isAdmin && (
						<div className='flex justify-end w-full mt-2'>
							<Button
								label='Edit estimate'
								color='yellow'
								variant='simple'
								size='small'
								buttonClasses='mt-1 border py-0.5 px-1.5'
								onClick={() => openModalhandler('editEstimate')}
							/>
						</div>
					)}
				</div>
			) : (
				<></>
			)}
			{user?.isAdmin && !userView && (
				<Button
					type='file'
					label='Upload contract PDF'
					color='green'
					variant='simple'
					buttonClasses='border py-0.5 px-1.5'
					onChange={fileUploadHandler}
					endIcon={
						project?.contractUploaded ? (
							<SVG name='checkMark' classes='fill-current text-green' />
						) : null
					}
				/>
			)}
			{project?.contractUploaded && (
				<a
					href={`${
						process.env.NODE_ENV === 'development'
							? 'http://localhost:5000/api/projects/contract/'
							: `${process.env.BASE_URL}/api/projects/contract/`
					}${project?._id}`}
					rel='noreferrer noopener'
					target='_blank'
				>
					<Button
						label='Download contract'
						color='green'
						type='button'
						variant='simple'
						buttonClasses='border py-0.5 px-1.5'
					/>
				</a>
			)}
		</>
	);
};

export default Index;
