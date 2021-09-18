import React, { useCallback, useEffect, useState } from 'react';
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
	setClient,
	clearUsersTrigger,
	clearUsersRedirect
} from '../redux/users/users.slice';
import UserFeedback from './UserFeedback';
import {
	clearProjectsTrigger,
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
		noUser,
		users,
		redirect,
		trigger: usersTrigger
	} = useAppSelector(state => state.users);
	const {
		projects,
		project,
		trigger: projectsTrigger
	} = useAppSelector(state => state.projects);
	const screenIsXL: boolean = breakpoint === 'xl' || breakpoint === '2xl';
	const trigger = usersTrigger || projectsTrigger;

	const tourBannerHeight = 40;

	const logout = useCallback(() => {
		dispatch(usersLogout());
		dispatch(projectsLogout());
		dispatch(milestonesLogout());
	}, [dispatch]);

	const onAuthRoute = useCallback(() => {
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
	}, [router]);

	useEffect(() => {
		if (!onTour) dispatch(getUser());
	}, [onTour, dispatch]);

	useEffect(() => {
		if (isAuth) {
			if (user && !user?.isAdmin && !user.client)
				dispatch(setClient(user.clientName));
			if (user?.isAdmin && !client && users?.length)
				dispatch(setClient(users[0].clientName));
			if (!projects?.length) dispatch(getProjects());
			if (user?.isAdmin && !users?.length) dispatch(getUsers());
		} else {
			if (onAuthRoute() && noUser) {
				router.push('/login');
				logout();
			}
		}
	}, [
		isAuth,
		user,
		dispatch,
		logout,
		router,
		onAuthRoute,
		noUser,
		users,
		client,
		projects?.length
	]);

	useEffect(() => {
		if (
			onTour &&
			!onAuthRoute() &&
			router.pathname !== '/login' &&
			router.pathname !== '/tour'
		)
			logout();
	}, [router.pathname, logout, onAuthRoute, onTour]);

	useEffect(() => {
		if (redirect) {
			router.push(redirect);
			dispatch(clearUsersRedirect());
		}
	}, [redirect, router, dispatch]);

	useEffect(() => {
		if (trigger === 'getProjects') {
			dispatch(getProjects());
			dispatch(clearUsersTrigger());
		}
		if (trigger === 'setProject') {
			const projectFound = projects?.find(x => x._id === project?._id);
			if (!projectFound && projects?.length)
				dispatch(setProject(projects[0]._id));
			dispatch(clearProjectsTrigger());
		}
		if (trigger === 'getUsers') {
			dispatch(getUsers());
			dispatch(clearUsersTrigger());
		}
	}, [projects, dispatch, project?._id, trigger]);
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
