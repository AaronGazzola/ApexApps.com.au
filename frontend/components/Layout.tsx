import React, { useEffect, useState } from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import {
	getUser,
	getUsers,
	usersLogout,
	setClient
} from '../redux/users/users.slice';
import UserFeedback from './UserFeedback';
import {
	getProjects,
	projectsLogout,
	setProject
} from '../redux/projects/projects.slice';
import { milestonesLogout } from '../redux/milestones/milestones.slice';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	// add 'resize' event listener to window to store window dimensions in redux store
	setScreenDimensions();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const {
		breakpoint,
		headerHeight,
		footerHeight,
		minDrawerWidth,
		maxDrawerWidth
	} = useAppSelector(state => state.utils);
	const {
		isAuth,
		user,
		success: usersSuccess,
		client,
		onTour,
		noUser
	} = useAppSelector(state => state.users);
	const { projects, project } = useAppSelector(state => state.projects);
	const screenIsXL: boolean = breakpoint === 'xl' || breakpoint === '2xl';

	const [onMount, setOnMount] = useState(true);

	const tourBannerHeight = 40;

	const logout = () => {
		dispatch(usersLogout());
		dispatch(projectsLogout());
		dispatch(milestonesLogout());
	};

	const onAuthRoute = () => {
		if (router.pathname.startsWith('/signup')) return false;
		switch (router.pathname) {
			case '/':
			case '/portfolio':
			case '/contact':
			case '/login':
				return false;
			case '/project':
			case '/timeline':
			case '/milestones':
			case '/proposal':
				return true;
			default:
				break;
		}
	};

	useEffect(() => {
		if (onMount && !onTour) dispatch(getUser());
		if (isAuth && !onMount) {
			if (user && !user?.isAdmin && !user.client)
				dispatch(setClient(user.clientName));

			if (user?.isAdmin) dispatch(getUsers());
		} else if (!isAuth && !onMount) {
			if (onAuthRoute()) {
				router.push('/login');
				logout();
			}
		}
		setOnMount(false);
	}, [isAuth, noUser]);

	// on navigate, if no stored user,
	useEffect(() => {
		if ((noUser || (user && (!isAuth || !user.isVerified))) && onAuthRoute()) {
			logout();
			router.push('/login');
		}
		if (onTour && !onAuthRoute()) logout();
	}, [router.pathname, noUser]);

	// when users are updated, get user and users
	useEffect(() => {
		if (usersSuccess && user?.isAdmin) dispatch(getUsers());
		if (usersSuccess) dispatch(getUser());
		if (usersSuccess?.startsWith('Welcome')) router.push('/project');
	}, [usersSuccess]);

	// when client changes, get projects
	useEffect(() => {
		if (client && !onTour) dispatch(getProjects());
	}, [client]);

	// when projects change, if project is not found on projects, set project to first in array
	useEffect(() => {
		const projectFound = projects?.find(x => x._id === project?._id);
		if (!projectFound && projects?.length) {
			dispatch(setProject(projects[0]._id));
		}
	}, [projects]);

	return (
		<>
			<Header headerHeight={headerHeight} tourBannerHeight={tourBannerHeight} />
			<Drawer
				headerHeight={headerHeight}
				minDrawerWidth={minDrawerWidth}
				screenIsXL={screenIsXL}
			/>
			<UserFeedback />
			<main
				className='relative flex flex-col items-center h-min overflow-x-hidden pt-3 sm:pt-4 px-2'
				style={{
					minHeight: `calc((var(--vh) * 100) - ${
						headerHeight + footerHeight + (onTour ? tourBannerHeight : 0)
					}px)`,
					width: screenIsXL
						? `calc(100% - ${maxDrawerWidth * 2}px)`
						: `calc(100% - ${minDrawerWidth}px)`,
					marginLeft: screenIsXL ? maxDrawerWidth : minDrawerWidth,
					marginTop: headerHeight + (onTour ? tourBannerHeight : 0)
				}}
			>
				{props.children}
			</main>
			<Footer footerHeight={footerHeight} />
		</>
	);
};

export default Layout;
