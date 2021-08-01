import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getUser, login } from '../redux/users/users.slice';

export default function Home() {
	const { isAuth, token } = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(
			login({
				username: 'example@example.com',
				password: '123456'
			})
		);
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) {
			dispatch(getUser());
		}
	}, [dispatch, isAuth]);
	return <></>;
}
