import { SyntheticEvent } from 'react';
import Button from '../../components/Button';
import Meta from '../../components/Meta';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/users/users.slice';

const index = () => {
	const dispatch = useAppDispatch();
	const { loading: usersLoading, user } = useAppSelector(state => state.users);

	const logoutHandler = (e: SyntheticEvent) => {
		dispatch(logout());
	};
	const editProfileHandler = (e: SyntheticEvent) => {};
	return (
		<>
			<Meta title='Your Project | Apex Apps' />
			<h1 className='title'>Project</h1>
			<div className='box-xs sm:box-sm'>
				{usersLoading || !user ? (
					<>
						<div className='skeleton w-36 h-7 m-1'></div>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<div className='skeleton w-24 h-5 m-1'></div>
					</>
				) : (
					<>
						<h2 className='title-sm text-gray-dark'>{user?.userName}</h2>
						<hr className='w-52 h-0.5 bg-gray-300 mb-1' />
						<h3 className='text-sm'>{user?.email}</h3>
					</>
				)}
				<div className='w-full flex justify-between'>
					<Button
						label='Log out'
						color='red'
						variant='outlined'
						size='small'
						onClick={logoutHandler}
						className='border py-0.5 px-1'
					/>
					<Button
						label='Edit profile'
						color='yellow'
						variant='outlined'
						size='small'
						onClick={editProfileHandler}
						className='border py-0.5 px-1'
					/>
				</div>
			</div>
		</>
	);
};

export default index;
