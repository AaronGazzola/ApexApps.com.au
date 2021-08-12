import React, { useEffect } from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppSelector } from '../redux/hooks';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/users/users.slice';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	// add 'resize' event listener to window to store window dimensions in redux store
	setScreenDimensions();
	const router = useRouter();
	const dispatch = useDispatch();
	const { breakpoint } = useAppSelector(state => state.utils);
	const { isAuth, redirect: userRedirect } = useAppSelector(
		state => state.users
	);

	// check for user and login on page load
	// prevent redirect from initial logged out state by storing pathname on the get user action, and redirecting on api response
	useEffect(() => {
		if (!isAuth && !userRedirect) {
			dispatch(getUser(router.pathname));
		} else if (!!userRedirect) {
			router.push(userRedirect);
		} else if (isAuth) {
			switch (router.pathname) {
				case '/login':
					router.push('/project');
				default:
					break;
			}
		} else {
			switch (router.pathname) {
				case '/project':
				case '/timeline':
				case '/milestones':
				case '/proposal':
					router.push('/');
				default:
					break;
			}
		}
	}, [isAuth, dispatch]);

	// set layout component dimensions
	const headerHeight = breakpoint === 'xs' ? 56 : 82;
	const footerHeight = 112;
	const minDrawerWidth = 36;
	const maxDrawerWidth = 147;
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
			<main
				className='relative flex flex-col items-center h-min'
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
