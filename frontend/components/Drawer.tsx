import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUsersTrigger, toggleUserView } from '../redux/users/users.slice';
import DrawerLink from './DrawerLink';
import Logo from './Logo';
import SVG from './SVG';

interface drawerProps {
	headerHeight: number;
	minDrawerWidth: number;
	screenIsXL: boolean;
}

const initialNavItems = [
	{
		title: 'Project',
		path: '/project',
		icon: 'clipboard'
	},
	{
		title: 'Milestones',
		path: '/milestones',
		icon: 'checklist'
	},
	{
		title: 'Timeline',
		path: '/timeline',
		icon: 'watch'
	}
];

const Drawer = (props: drawerProps) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { headerHeight, minDrawerWidth, screenIsXL } = props;
	const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);
	const { isAuth, onTour, user, userView, trigger } = useAppSelector(
		state => state.users
	);
	const { breakpoint } = useAppSelector(state => state.utils);

	let navItems = initialNavItems;
	if (
		user?.isAdmin ||
		user?.client?.proposal ||
		router.pathname.startsWith('/proposal/')
	)
		navItems = [
			...initialNavItems,
			{
				title: 'Proposal',
				path: '/proposal',
				icon: 'card'
			}
		];

	// open drawer for one second
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (trigger === 'showDrawer') {
			setDrawerIsOpen(true);
			timer = setTimeout(() => {
				setDrawerIsOpen(false);
				dispatch(clearUsersTrigger());
			}, 1000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [trigger, dispatch]);

	// close drawer when click outside
	useEffect(() => {
		function handleClickOutside(event: TouchEvent | MouseEvent) {
			setDrawerIsOpen(false);
		}
		let main: HTMLElement | null = null;
		let header: HTMLElement | null = null;
		if (document !== null) {
			main = document.querySelector('main');
			header = document.querySelector('header');
		}
		if (
			main !== null &&
			header !== null &&
			main !== undefined &&
			header !== undefined
		) {
			main.addEventListener('mousedown', handleClickOutside);
			header.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			// Unbind the event listener on clean up
			if (
				main !== null &&
				header !== null &&
				main !== undefined &&
				header !== undefined
			) {
				main.removeEventListener('mousedown', handleClickOutside);
				header.removeEventListener('mousedown', handleClickOutside);
			}
		};
	}, []);

	return (
		<div
			className={`fixed top-0 left-0 w-min bg-blue-lightest select-none overflow-visible h-full z-20 ${
				isAuth && (drawerIsOpen || screenIsXL) ? 'shadow-2xl' : ''
			}`}
			style={{
				transform:
					isAuth && (drawerIsOpen || screenIsXL)
						? 'translateX(-12px)'
						: `translateX(calc(-100% + ${minDrawerWidth}px))`,
				transition: 'all 1s cubic-bezier( 0.68, -0.55, 0.265, 1.55 )',
				WebkitBackfaceVisibility: 'hidden'
			}}
		>
			{/* 
				// Logo
			*/}
			<div className={`relative w-full`} style={{ height: headerHeight }}>
				<div
					className={`flex w-full absolute top-0 left-0 justify-center transition-opacity duration-300 ${
						isAuth && (drawerIsOpen || screenIsXL) ? '' : 'opacity-0'
					}`}
				>
					<Logo variant={breakpoint === 'xs' ? 'drawer-sm' : 'drawer-lg'} />
				</div>

				<div
					className={`flex w-full absolute top-0 left-0 justify-end p-1 transition-opacity duration-300 ${
						isAuth && (drawerIsOpen || screenIsXL) ? 'opacity-0' : ''
					}`}
				>
					<Logo variant='drawer-xs' />
				</div>
			</div>
			{!screenIsXL && isAuth && (
				<div
					className='group flex justify-end items-center h-7 pr-1.5 cursor-pointer bg-blue-light hover:bg-blue-darkest'
					style={{ WebkitBackfaceVisibility: 'hidden' }}
					onClick={() => setDrawerIsOpen(prev => !prev)}
				>
					<SVG
						name='arrow'
						classes={`fill-current text-blue-darkest group-hover:text-white ${
							drawerIsOpen || screenIsXL ? 'transform -rotate-180' : ''
						}`}
						style={{
							transition:
								'transform 1s cubic-bezier( 0.68, -0.55, 0.265, 1.55 )',
							WebkitBackfaceVisibility: 'hidden'
						}}
					/>
				</div>
			)}
			{navItems.map(item => (
				<DrawerLink
					key={item.title}
					title={item.title}
					path={item.path}
					icon={item.icon}
					setDrawerIsOpen={setDrawerIsOpen}
				/>
			))}
			{user?.isAdmin && (
				<div
					className={`group flex justify-between p-1.5 pl-6 hover:bg-blue-darkest cursor-pointer text-blue-darkest`}
					onClick={
						breakpoint === 'xs'
							? () => {
									setDrawerIsOpen(false);
									dispatch(toggleUserView());
							  }
							: () => {
									dispatch(toggleUserView());
							  }
					}
					style={{ WebkitBackfaceVisibility: 'hidden' }}
				>
					<p
						className={`font-semibold mr-4 group-hover:text-white text-blue-darkest`}
					>
						User view
					</p>
					<SVG
						name={userView ? 'starFill' : 'star'}
						classes='fill-current group-hover:text-white'
					/>
				</div>
			)}
			<div
				className='w-full h-full'
				onClick={() => setDrawerIsOpen(prev => !prev)}
			></div>
		</div>
	);
};

export default Drawer;
