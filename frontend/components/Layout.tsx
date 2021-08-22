import React, { useEffect, useState } from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getUser, getUsers, logout } from '../redux/users/users.slice';
import UserFeedback from './UserFeedback';

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
	const { isAuth, user } = useAppSelector(state => state.users);
	const [onMount, setOnMount] = useState(true);

	// check for user and login on page load
	useEffect(() => {
		if (onMount) {
			// if first page load, check for user
			dispatch(getUser());
			setOnMount(false);
		} else if (isAuth && !user?.isVerified) {
			// if user is logged in but not verified, logout
			dispatch(logout());
		} else if (isAuth) {
			// if admin, get users
			if (user?.isAdmin) dispatch(getUsers());
			// if logged in, redirect from header links to /project
			if (router.pathname.startsWith('/signup')) router.push('/project');
			switch (router.pathname) {
				case '/':
				case '/portfolio':
				case '/contact':
				case '/login':
					router.push('/project');
					break;
				default:
					break;
			}
		} else if (!isAuth) {
			// if not logged in redirect from drawer links to /login
			switch (router.pathname) {
				case '/project':
				case '/timeline':
				case '/milestones':
				case '/proposal':
					router.push('/login');
					break;
				default:
					break;
			}
		}
	}, [isAuth, dispatch]);

	const screenIsXL: boolean = breakpoint === 'xl' || breakpoint === '2xl';
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
