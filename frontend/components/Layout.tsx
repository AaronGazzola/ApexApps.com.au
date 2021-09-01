import React, { useEffect, useState } from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import {
	getUser,
	getUsers,
	logout,
	setClient
} from '../redux/users/users.slice';
import UserFeedback from './UserFeedback';
import { getProjects, setProject } from '../redux/projects/projects.slice';
import { getMilestones } from '../redux/milestones/milestones.slice';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	// add 'resize' event listener to window to store window dimensions in redux store
	setScreenDimensions();
	const router = useRouter();
	const dispatch = useDispatch();
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

	const authRoutes = () => {
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
			if (authRoutes()) dispatch(getUser());
			setOnMount(false);
		} else if (isAuth && !user?.isVerified) {
			// if user is logged in but not verified, logout
			dispatch(logout());
		} else if (isAuth) {
			// if no client and user is not admin, set client to user
			if (user && !user?.client && !user?.isAdmin) {
				dispatch(setClient(user.clientName));
			}
			// if user is admin and client does not match user.client, set client to user.client
			if (
				user &&
				user?.isAdmin &&
				user?.client?._id !== client?._id &&
				user?.client?.clientName
			) {
				dispatch(setClient(user?.client?.clientName));
			}
			// if admin, get users
			if (user?.isAdmin) dispatch(getUsers());
			// if logged in, redirect from header links to /project
			if (!authRoutes()) router.push('/project');
		} else if (!isAuth) {
			// if not logged in redirect from drawer links to /login
			if (authRoutes()) router.push('/login');
		}
	}, [isAuth]);

	// if client !== user.client, set user.client

	// when users are updated, get users
	useEffect(() => {
		if (usersSuccess && user?.isAdmin) dispatch(getUsers());
	}, [usersSuccess]);

	// when client changes, get projects
	useEffect(() => {
		if (user?.client) dispatch(getProjects());
	}, [user?.client]);

	// when projects change, if active project is not in projects, set project to first in array
	useEffect(() => {
		const projectFound = projects?.find(x => x._id === project?._id);
		if (projects?.length && !projectFound)
			dispatch(setProject(projects?.[0]._id));
		if (user?.project) dispatch(getMilestones());
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
