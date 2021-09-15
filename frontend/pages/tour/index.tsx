import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { milestonesTour } from '../../redux/milestones/milestones.slice';
import { projectsTour } from '../../redux/projects/projects.slice';
import { userTour } from '../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		dispatch(userTour());
		dispatch(milestonesTour());
		dispatch(projectsTour());
		router.push('/project');
	}, [dispatch, router]);
	return <></>;
};

export default Index;
