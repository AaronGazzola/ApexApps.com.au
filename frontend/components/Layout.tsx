import * as React from 'react';
import Meta from './Meta';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	return (
		<>
			<Meta />
			{props.children}
		</>
	);
};

export default Layout;
