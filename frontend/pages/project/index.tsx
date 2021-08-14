import { SyntheticEvent } from 'react';
import Button from '../../components/Button';
import Meta from '../../components/Meta';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/users/users.slice';
import { UserState } from '../../redux/users/users.interface';

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
				{user && <h2 className='title-sm'>{user.userName}</h2>}
				<div className='flex justify-between'>
					<Button
						label='Log out'
						color='red'
						variant='outlined'
						size='small'
						clickHandler={logoutHandler}
					/>
					<Button
						label='Edit profile'
						color='yellow'
						variant='outlined'
						size='small'
						clickHandler={editProfileHandler}
					/>
				</div>
			</div>
		</>
	);
};

export default index;
