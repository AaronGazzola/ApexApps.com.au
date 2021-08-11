import { useState } from 'react';
import DrawerLink from './DrawerLink';
import Logo from './Logo';

interface drawerProps {
	headerHeight: number;
	minDrawerWidth: number;
	screenIsXL: boolean;
}

const navItems = [
	{
		title: 'Summary',
		path: '/summary',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='-5 -2 24 24'
				width='24'
				height='24'
				preserveAspectRatio='xMinYMin'
				className='fill-current group-hover:text-white'
			>
				<path d='M5 2v2h4V2H5zm6 0h1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zm0 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2H2v14h10V4h-1zM4 8h6a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h6a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
			</svg>
		)
	},
	{
		title: 'Timeline',
		path: '/timeline',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='-4 -1 24 24'
				width='24'
				height='24'
				preserveAspectRatio='xMinYMin'
				className='fill-current group-hover:text-white'
			>
				<path d='M9 10h2a1 1 0 0 1 0 2H8a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v3zM4 4.07V3a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1.07A7.997 7.997 0 0 1 16 11a7.997 7.997 0 0 1-4 6.93V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1.07A7.997 7.997 0 0 1 0 11a7.997 7.997 0 0 1 4-6.93zm2-.818A8.014 8.014 0 0 1 8 3c.69 0 1.36.088 2 .252V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v.252zm0 15.496V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.252a8.047 8.047 0 0 1-4 0zM8 17A6 6 0 1 0 8 5a6 6 0 0 0 0 12z'></path>
			</svg>
		)
	},
	{
		title: 'Milestones',
		path: '/milestones',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='-2 -2 24 24'
				width='24'
				height='24'
				preserveAspectRatio='xMinYMin'
				className='fill-current group-hover:text-white'
			>
				<path d='M6 0h8a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6V6a6 6 0 0 1 6-6zm0 2a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H6zm6 7h3a1 1 0 0 1 0 2h-3a1 1 0 0 1 0-2zm-2 4h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zm0-8h5a1 1 0 0 1 0 2h-5a1 1 0 1 1 0-2zm-4.172 5.243L7.95 8.12a1 1 0 1 1 1.414 1.415l-2.828 2.828a1 1 0 0 1-1.415 0L3.707 10.95a1 1 0 0 1 1.414-1.414l.707.707z'></path>
			</svg>
		)
	},
	{
		title: 'Proposal',
		path: '/proposal',
		icon: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='-2 -5 24 24'
				width='24'
				height='24'
				preserveAspectRatio='xMinYMin'
				className='fill-current group-hover:text-white'
			>
				<path d='M2 0h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 2v10h16V2H2zm9 2h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zm0 3h5a1 1 0 0 1 0 2h-5a1 1 0 0 1 0-2zM4 4h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z'></path>
			</svg>
		)
	}
];

const Drawer = (props: drawerProps) => {
	const { headerHeight, minDrawerWidth, screenIsXL } = props;
	const [drawerIsOpen, setDrawerIsOpen] = useState<boolean>(false);

	return (
		<div
			className='fixed top-0 left-0 w-min bg-blue-lightest select-none overflow-visible h-full z-10'
			style={{
				transform:
					drawerIsOpen || screenIsXL
						? 'translateX(-12px)'
						: `translateX(calc(-100% + ${minDrawerWidth}px))`,
				transition: 'transform 1s cubic-bezier( 0.68, -0.55, 0.265, 1.55 )',
				WebkitBackfaceVisibility: 'hidden'
			}}
		>
			<div className={`relative w-full`} style={{ height: headerHeight }}>
				<div
					className={`flex w-full absolute top-0 left-0 justify-center transition-opacity duration-300 ${
						drawerIsOpen || screenIsXL ? '' : 'opacity-0'
					}`}
				>
					<Logo variant='drawer-lg' />
				</div>

				<div
					className={`flex w-full absolute top-0 left-0 justify-end p-1 transition-opacity duration-300 ${
						drawerIsOpen || screenIsXL ? 'opacity-0' : ''
					}`}
				>
					<Logo variant='drawer-sm' />
				</div>
			</div>
			{!screenIsXL && (
				<div
					className='group flex justify-end items-center h-7 pr-1.5 cursor-pointer bg-blue-light hover:bg-blue-darkest'
					style={{ WebkitBackfaceVisibility: 'hidden' }}
					onClick={() => setDrawerIsOpen(prev => !prev)}
				>
					<svg
						className={`fill-current text-blue-darkest group-hover:text-white ${
							drawerIsOpen || screenIsXL ? 'transform -rotate-180' : ''
						}`}
						xmlns='http://www.w3.org/2000/svg'
						viewBox='-5 -5 24 24'
						width='24'
						height='24'
						preserveAspectRatio='xMinYMin'
						style={{
							transition:
								'transform 1s cubic-bezier( 0.68, -0.55, 0.265, 1.55 )',
							WebkitBackfaceVisibility: 'hidden'
						}}
					>
						<path d='M10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z'></path>
					</svg>
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
		</div>
	);
};

export default Drawer;
