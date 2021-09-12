import Image from 'next/image';
import { useEffect, useState } from 'react';
import SVG from '../components/SVG';
import { useAppSelector } from '../redux/hooks';

export default function Home() {
	const { breakpoint } = useAppSelector(state => state.utils);
	const [playGif, setPlayGif] = useState(0);

	return (
		<>
			<h1 className='title'>Apex Apps</h1>
			<div className='flex items-center w-72 mb-6 flex-wrap-reverse justify-center sm:w-auto'>
				<div className='mr-0 sm:mr-4 flex flex-col items-center'>
					<div
						className='relative w-72 sm:w-80 p-4 flex flex-col items-center'
						style={{ height: 112 }}
					>
						<p className='text-sm font-medium z-30'>
							Hi, I'm Aaron Gazzola, A Full-Stack Javascript Developer.
						</p>
						<p className='text-sm font-medium z-30'>
							I create elegant and powerful web applications - accessable on any
							device
						</p>
						{breakpoint === 'xs' ? (
							<>
								<div className='absolute top-0 left-1/2 transform rotate-45 rounded-tl-md w-11 h-11 shadow-lg -translate-y-1/2 -translate-x-1/2 bg-white'></div>
								<div className='absolute left-1/2 top-0 transform rotate-45 rounded-tl-md w-11 h-11 -translate-y-1/2 -translate-x-1/2 bg-white z-20'></div>
							</>
						) : (
							<>
								<div className='absolute right-0 top-1/2 transform rotate-45 rounded-tr-md w-11 h-11 shadow-lg translate-x-1/2 -translate-y-1/2 bg-white'></div>
								<div className='absolute right-0.5 top-1/2 transform rotate-45 rounded-tr-md w-11 h-11 translate-x-1/2 -translate-y-1/2 bg-white z-20'></div>
							</>
						)}
						<div className='absolute box top-0 left-0 w-72 sm:w-80 h-min z-10'>
							<p className='text-sm font-medium opacity-0'>
								Hi, I'm Aaron Gazzola, A Full-Stack Javascript Developer.
							</p>
							<p className='text-sm font-medium opacity-0'>
								I create elegant and powerful web applications - accessable on
								any device
							</p>
						</div>
					</div>
				</div>
				<div
					className='rounded-full overflow-hidden mb-4 sm:mb-0 shadow-xl'
					style={{
						width: breakpoint === 'xs' ? 160 : 180,
						height: breakpoint === 'xs' ? 160 : 180
					}}
				>
					<Image
						src='/assets/images/profile-dark.jpg'
						width={breakpoint === 'xs' ? 160 : 180}
						height={breakpoint === 'xs' ? 160 : 180}
						alt='Aaron Gazzola'
					/>
				</div>
			</div>
			<h2 className='title mt-4 sm:mt-2'>Portfolio</h2>
			<div className='flex flex-col sm:flex-row items-center w-full mb-6 justify-center max-w-6xl mt-2'>
				<div
					className={`p-2 relative group cursor-pointer w-full sm:w-1/2 transform `}
					onClick={() => setPlayGif(prev => (prev === 1 ? 0 : 1))}
				>
					{playGif !== 1 && (
						<SVG
							name='playFill'
							classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-white w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100'
						/>
					)}
					<div className='rounded-2xl shadow-lg overflow-hidden w-full border'>
						{playGif === 1 ? (
							<Image
								src='/assets/gifs/origami.cool.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						) : (
							<Image
								src='/assets/images/origami-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						)}
					</div>
				</div>
				<div
					className={`p-2 relative group cursor-pointer w-full sm:w-1/2 transform `}
					onClick={() => setPlayGif(prev => (prev === 2 ? 0 : 2))}
				>
					{playGif !== 2 && (
						<SVG
							name='playFill'
							classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100'
						/>
					)}
					<div className='rounded-2xl shadow-lg overflow-hidden w-full border'>
						{playGif === 2 ? (
							<Image
								src='/assets/gifs/rainbowofemotions.app.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						) : (
							<Image
								src='/assets/images/rainbow-screenshot.png'
								layout='responsive'
								width={1598}
								height={895}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
