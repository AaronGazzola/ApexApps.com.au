import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { login } from '../redux/users/users.slice';

export default function Home() {
	const user = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(login({ username: 'example@example.com', password: '123456' }));
	}, [dispatch]);
	return <></>;
}
