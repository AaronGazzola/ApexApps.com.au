import * as React from 'react';
import Meta from './Meta';
import Header from './Header';
import setScreenDimensions from '../hooks/setScreenDimensions';
import Drawer from './Drawer';
import { useAppSelector } from '../redux/hooks';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	// add 'resize' event listener to window to store window dimensions in redux store
	setScreenDimensions();
	const { breakpoint } = useAppSelector(state => state.utils);
	const headerHeight = breakpoint === 'xs' ? 56 : 82;
	return (
		<>
			<Meta />
			<Header headerHeight={headerHeight} />
			<Drawer headerHeight={headerHeight} />
			{props.children}
		</>
	);
};

export default Layout;
