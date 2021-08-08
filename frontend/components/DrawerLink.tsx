import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface DrawerLinkProps {
	title: string;
	path: string;
	icon: React.ReactNode;
	setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerLink = (props: DrawerLinkProps) => {
	const { path, title, icon, setDrawerIsOpen } = props;
	const router = useRouter();
	const pathIsActive = router.pathname === path;
	return (
		<Link href={path}>
			<div
				className={`group flex justify-between p-1.5 pl-6 hover:bg-blue-darkest cursor-pointer ${
					pathIsActive ? 'bg-blue-darkest text-white' : 'text-blue-darkest'
				}`}
				onClick={() => setDrawerIsOpen(false)}
			>
				<p
					className={`font-semibold mr-4 group-hover:text-white ${
						pathIsActive ? 'text-white' : 'text-blue-darkest'
					}`}
				>
					{title}
				</p>
				{icon}
			</div>
		</Link>
	);
};

export default DrawerLink;
