import * as React from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import Footer from './Footer';
import { useAppSelector } from '../redux/hooks';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	// add 'resize' event listener to window to store window dimensions in redux store
	setScreenDimensions();
	const { breakpoint } = useAppSelector(state => state.utils);
	// set layout component dimensions
	const headerHeight = breakpoint === 'xs' ? 56 : 82;
	const footerHeight = 80;
	const minDrawerWidth = 36;
	return (
		<>
			<Meta />
			<Header headerHeight={headerHeight} />
			<Drawer headerHeight={headerHeight} minDrawerWidth={minDrawerWidth} />
			<main
				className='flex flex-col items-center'
				style={{
					height: `calc(100vh - ${headerHeight + footerHeight}px)`,
					width: `calc(100vw - ${
						minDrawerWidth * (breakpoint === 'xs' ? 1 : 2)
					}px)`,
					marginLeft: minDrawerWidth
				}}
			>
				{props.children}
			</main>
			<Footer footerHeight={footerHeight} />
		</>
	);
};

export default Layout;
