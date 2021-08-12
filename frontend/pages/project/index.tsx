import { SyntheticEvent } from 'react';
import Button from '../../components/Button';
import Meta from '../../components/Meta';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/users/users.slice';

const index = () => {
	const dispatch = useAppDispatch();
	const { loading: usersLoading } = useAppSelector(state => state.users);

	const logoutHandler = (e: SyntheticEvent) => {
		dispatch(logout());
	};
	return (
		<>
			<Meta title='Contact Aaron | Apex Apps' />
			<div>
				<p>Project</p>
				<Button
					label='Log out'
					color='red'
					variant='outlined'
					size='small'
					clickHandler={logoutHandler}
					loading={usersLoading}
				/>
			</div>
		</>
	);
};

export default index;
