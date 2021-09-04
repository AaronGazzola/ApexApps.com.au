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
	logout,
	setClient
} from '../redux/users/users.slice';
import UserFeedback from './UserFeedback';
import { getProjects, setProject } from '../redux/projects/projects.slice';

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
		client
	} = useAppSelector(state => state.users);
	const { projects, project } = useAppSelector(state => state.projects);
	const [onMount, setOnMount] = useState(true);
	const screenIsXL: boolean = breakpoint === 'xl' || breakpoint === '2xl';

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

	// check for user and login on page load
	useEffect(() => {
		if (onMount) {
			// if first page load, check for user
			dispatch(getUser());
			setOnMount(false);
		} else if (isAuth && !user?.isVerified) {
			// if user is logged in but not verified, logout
			dispatch(logout());
			router.push('/login');
		} else if (isAuth) {
			// if user is not admin and no client is on user, set client to user
			if (user && !user?.isAdmin && !user.client)
				dispatch(setClient(user.clientName));
			// if admin, get users
			if (user?.isAdmin) dispatch(getUsers());
			// if logged in, redirect from header links to /project
			if (!onAuthRoute()) router.push('/project');
		} else if (!isAuth) {
			// if not logged in redirect from drawer links to /login
			if (onAuthRoute()) router.push('/login');
			dispatch(logout());
		}
	}, [isAuth]);

	// when users are updated, get user and users
	useEffect(() => {
		if (usersSuccess && user?.isAdmin) dispatch(getUsers());
		if (usersSuccess) dispatch(getUser());
	}, [usersSuccess]);

	// when client changes, get projects
	useEffect(() => {
		if (client) dispatch(getProjects());
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
			<Meta />
			<Header headerHeight={headerHeight} />
			<Drawer
				headerHeight={headerHeight}
				minDrawerWidth={minDrawerWidth}
				screenIsXL={screenIsXL}
			/>
			<UserFeedback />
			<main
				className='relative flex flex-col items-center h-min overflow-x-hidden pt-3 sm:pt-4'
				style={{
					minHeight: `calc((var(--vh) * 100) - ${
						headerHeight + footerHeight
					}px)`,
					width: screenIsXL
						? `calc(100vw - ${maxDrawerWidth * 2}px)`
						: `calc(100vw - ${
								minDrawerWidth * (breakpoint === 'xs' ? 1 : 2)
						  }px)`,
					marginLeft: screenIsXL ? maxDrawerWidth : minDrawerWidth,
					marginTop: headerHeight
				}}
			>
				{props.children}
			</main>
			<Footer footerHeight={footerHeight} />
		</>
	);
};

export default Layout;
