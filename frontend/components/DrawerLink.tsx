import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/hooks';
import SVG from './SVG';

interface DrawerLinkProps {
	title: string;
	path: string;
	icon: string;
	setDrawerIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DrawerLink = (props: DrawerLinkProps) => {
	const { path, title, icon, setDrawerIsOpen } = props;
	const router = useRouter();
	const pathIsActive = router.pathname === path;
	const { breakpoint } = useAppSelector(state => state.utils);
	const { isAuth } = useAppSelector(state => state.users);
	return (
		<Link href={!isAuth ? '/login' : path} passHref>
			<div
				className={`group flex justify-between p-1.5 pl-6 hover:bg-blue-darkest cursor-pointer ${
					pathIsActive ? 'bg-blue-darkest text-white' : 'text-blue-darkest'
				}`}
				onClick={() => setDrawerIsOpen(false)}
				style={{ WebkitBackfaceVisibility: 'hidden' }}
			>
				<p
					className={`font-semibold mr-4 group-hover:text-white ${
						pathIsActive ? 'text-white' : 'text-blue-darkest'
					}`}
					style={{ WebkitBackfaceVisibility: 'hidden' }}
				>
					{title}
				</p>
				<SVG
					name={isAuth ? icon : 'lock'}
					classes='fill-current group-hover:text-white'
				/>
			</div>
		</Link>
	);
};

export default DrawerLink;
