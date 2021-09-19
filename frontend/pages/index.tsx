import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Discuss from '../components/Discuss';
import Button from '../components/Button';
import SVG from '../components/SVG';
import { useAppSelector } from '../redux/hooks';
import Link from 'next/link';
import Design from '../components/Design';
import Develop from '../components/Develop';
import Deploy from '../components/Deploy';
import Meta from '../components/Meta';

export default function Home() {
	const { breakpoint } = useAppSelector(state => state.utils);
	const [playGif, setPlayGif] = useState(0);
	const [animateDiscuss, setAnimateDiscuss] = useState(false);
	const [animateDesign, setAnimateDesign] = useState(false);
	const [animateDevelop, setAnimateDevelop] = useState(false);
	const [animateDeploy, setAnimateDeploy] = useState(false);
	const discussRef = useRef<HTMLDivElement>(null);
	const designRef = useRef<HTMLDivElement>(null);
	const developRef = useRef<HTMLDivElement>(null);
	const deployRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const isInWindow = (
			ref: React.RefObject<HTMLDivElement>,
			spaceAround = 0
		) => {
			if (!ref?.current?.offsetTop || !ref?.current?.offsetHeight) return;
			return (
				ref?.current?.offsetTop + 150 > window.scrollY - spaceAround &&
				ref?.current?.offsetTop + ref?.current?.offsetHeight + 150 <
					window.scrollY + window.innerHeight + spaceAround
			);
		};

		const scrollHandler = () => {
			const spaceAround = breakpoint === 'xs' ? 150 : 100;
			setAnimateDiscuss(!!isInWindow(discussRef, spaceAround));
			setAnimateDesign(!!isInWindow(designRef, spaceAround));
			setAnimateDevelop(!!isInWindow(developRef, spaceAround));
			setAnimateDeploy(!!isInWindow(deployRef, spaceAround));
		};
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, [breakpoint]);

	return (
		<>
			<Meta />
			<h1 className='title'>Apex Apps</h1>
			<div
				className='flex items-center w-ful mb-6 flex-wrap-reverse justify-center sm:w-auto px-2'
				style={{ maxWidth: breakpoint === 'xs' ? 450 : '' }}
			>
				<div className='mr-0 sm:mr-4 flex flex-col items-center'>
					<div
						className='relative w-full sm:w-80 p-4 flex flex-col'
						style={{ height: 112 }}
					>
						<p className='text-sm font-medium z-30'>
							Hi, I&apos;m Aaron Gazzola, A Full-Stack Javascript Developer.
						</p>
						<p className='text-sm font-medium z-30'>
							I create elegant and powerful web applications - accessable on any
							device.
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
						<div className='absolute box top-0 left-0 w-full sm:w-80 h-min z-10'>
							<p className='text-sm font-medium opacity-0'>
								Hi, I&apos;m Aaron Gazzola, A Full-Stack Javascript Developer.
							</p>
							<p className='text-sm font-medium opacity-0'>
								I create elegant and powerful web applications - accessable on
								any device.
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
						alt='Profile image of Aaron Gazzola from Apex Apps'
						src='/assets/images/profile-dark.jpg'
						width={breakpoint === 'xs' ? 160 : 180}
						height={breakpoint === 'xs' ? 160 : 180}
					/>
				</div>
			</div>
			<h1 className='title'>Portfolio</h1>
			<div className='flex flex-col sm:flex-row items-center w-full mb-0 justify-center max-w-6xl mt-2'>
				<div className='w-full sm:w-1/2 pb-2 sm:px-2'>
					<div
						className={`relative group cursor-pointer  transform rounded-2xl shadow-lg overflow-hidden border`}
						style={{ paddingTop: '56%' }}
						onClick={() => setPlayGif(prev => (prev === 1 ? 0 : 1))}
					>
						{playGif !== 1 ? (
							<SVG
								name='playFill'
								classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-white w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100 z-20'
							/>
						) : (
							<>
								<div className='flex items-center justify-center top-0 left-0 right-0 bottom-0 absolute z-10'>
									<div className='border-white w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
								</div>
								<SVG
									name='mute'
									classes='absolute bottom-2 right-2 fill-current text-gray z-30'
								/>
							</>
						)}
						<div
							className={`w-full absolute top-0 left-0 z-20 ${
								playGif === 1 ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<Image
								alt='animated gif of origami.cool web app'
								src='/assets/gifs/origami.cool.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
						<div className={`w-full absolute top-0 left-0`}>
							<Image
								alt='screenshot of origami.cool web app'
								src='/assets/images/origami-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
					</div>
				</div>
				<div className='w-full sm:w-1/2 pb-2 sm:px-2'>
					<div
						className={`relative group cursor-pointer  transform rounded-2xl shadow-lg overflow-hidden border`}
						style={{ paddingTop: '56%' }}
						onClick={() => setPlayGif(prev => (prev === 2 ? 0 : 2))}
					>
						{playGif !== 2 ? (
							<SVG
								name='playFill'
								classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue-darkest w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100 z-20'
							/>
						) : (
							<>
								<div className='flex items-center justify-center top-0 left-0 right-0 bottom-0 absolute z-10'>
									<div className='border-blue-darkest w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
								</div>
								<SVG
									name='mute'
									classes='absolute bottom-2 right-2 fill-current text-gray z-30'
								/>
							</>
						)}
						<div
							className={`w-full absolute top-0 left-0 z-20 ${
								playGif === 2 ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<Image
								alt='animated gif of rainbowofemotions.app web app'
								src='/assets/gifs/rainbowofemotions.app.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
						<div className={`w-full absolute top-0 left-0`}>
							<Image
								alt='screenshot of rainbowofemotions.app web app'
								src='/assets/images/rainbow-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
					</div>
				</div>
			</div>
			<Button
				label='View portfolio'
				type='link'
				path='/portfolio'
				variant='simple'
				size='medium'
				buttonClasses=' px-1.5 py-1'
				color='green'
				endIcon={
					<SVG
						name='images'
						classes='fill-current text-green ml-1 mt-0.5 w-7 h-7'
					/>
				}
			/>
			<div className='box w-full max-w-2xl border-blue-darkest border mt-4'>
				<h1 className='title'>Apex Apps Dashboard</h1>
				<p className='px-4 pt-1'>
					As a client at Apex Apps, you will gain access to a personalised
					project dashboard. Track development progress, view your project
					timeline and receive scheduled updates - all in one place.
				</p>
				<Button
					label='Explore the dashboard'
					type='link'
					path='/tour'
					variant='simple'
					size='large'
					buttonClasses=' pl-3 pr-2 py-0.5 mt-3 mb-2 border-2 border-green font-semibold'
					color='green'
					endIcon={
						<SVG
							name='map'
							classes='fill-current text-green ml-1 mt-0.5 w-7 h-7'
						/>
					}
				/>
				<div className='w-full p-2 cursor-pointer'>
					<div
						className={`relative group cursor-pointer  transform rounded-2xl shadow-lg overflow-hidden border`}
						style={{ paddingTop: '56%' }}
						onClick={() => setPlayGif(prev => (prev === 3 ? 0 : 3))}
					>
						{playGif !== 3 ? (
							<SVG
								name='playFill'
								classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue-darkest w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100 z-20'
							/>
						) : (
							<>
								<div className='flex items-center justify-center top-0 left-0 right-0 bottom-0 absolute z-10'>
									<div className='border-blue-darkest w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
								</div>
								<SVG
									name='mute'
									classes='absolute bottom-2 right-2 fill-current text-gray z-30'
								/>
							</>
						)}
						<div
							className={`w-full absolute top-0 left-0 z-20 ${
								playGif === 3 ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<Image
								alt='animated gif of Apex Apps project dashboard'
								src='/assets/gifs/apexapps.com.au.gif'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
						<div className={`w-full absolute top-0 left-0`}>
							<Image
								alt='scrennshot of Apex Apps project dashboard'
								src='/assets/images/apex-screenshot.jpg'
								layout='responsive'
								width={1598}
								height={895}
							/>
						</div>
					</div>
				</div>
			</div>

			<h1 className='title mt-6'>Reviews</h1>
			<div className='relative'>
				<p className='absolute top-0 left-0 text-blue-light text-5xl tracking-tighter transform rotate-180 m-1.5'>
					,,
				</p>
				<p className='absolute bottom-0 right-0 text-blue-light text-5xl tracking-tighter transform m-0.5 -translate-y-1/2 -translate-x-1/2'>
					,,
				</p>
				<div className='box w-full pb-2'>
					<p className='box-text p-1'>
						Even though Aaron appeared to be a lot younger and not as the
						experienced as the other Freelancers I feel so blessed that I chose
						him. His professionalism, insight and communication skills was
						exactly what I needed.
						<br /> Thank you Aaron.
					</p>
					<div className='flex justify-center items-center w-full'>
						{[1, 2, 3, 4, 5].map(key => (
							<SVG
								key={key}
								name='starFill'
								classes=' fill-current text-yellow-400'
							/>
						))}
					</div>
				</div>
			</div>
			<div className='relative'>
				<p className='absolute top-0 left-0 text-blue-light text-5xl tracking-tighter transform rotate-180 m-1.5'>
					,,
				</p>
				<p className='absolute bottom-0 right-0 text-blue-light text-5xl tracking-tighter transform m-0.5 -translate-y-1/2 -translate-x-1/2'>
					,,
				</p>
				<div className='box w-full pb-2'>
					<p className='box-text p-1'>
						Got the work done quickly, efficiently and effectively!
					</p>
					<div className='flex justify-center items-center w-full'>
						{[1, 2, 3, 4, 5].map(key => (
							<SVG
								key={key}
								name='starFill'
								classes=' fill-current text-yellow-400'
							/>
						))}
					</div>
				</div>
			</div>
			<h2 className='title-sm mt-4'>100% Job Success</h2>
			<div className='flex flex-col items-center'>
				<hr className='w-10/12' />
				<div className='flex w-full mt-1 mb-2.5'>
					{[1, 2, 3, 4, 5].map(key => (
						<SVG
							key={key}
							name='starFill'
							classes=' fill-current text-yellow-400 w-10 h-10'
						/>
					))}
				</div>
				<hr className='w-7/12' />
				<p className='font-medium text-sm text-blue-darkest'>5 Star Rated</p>
				<div className='w-16 mt-1'>
					<Image
						alt='upwork.com logo'
						src='/assets/svg/upwork-logo.svg'
						width={512}
						height={153}
						layout='responsive'
					/>
				</div>
			</div>
			<Button
				label={<>Let&apos;s chat!</>}
				type='link'
				path='/contact'
				variant='contained'
				size='large'
				buttonClasses=' px-8 py-2 mt-6 text-2xl'
				color='green'
			/>
			<div className='flex flex-col-reverse sm:flex-row items-center w-full justify-center max-w-3xl sm:pl-2 mt-10 '>
				<div className='flex flex-col w-full sm:w-3/4 mt-4 sm:m-0 '>
					<h2 className='title-sm mb-2 '>Let&apos;s chat!</h2>
					<div className='box w-full'>
						<p className='box-text'>
							Book a call or send an email at the{' '}
							<Link href='/contact'>
								<a className='text-green font-semibold italic'>contact</a>
							</Link>{' '}
							page, and we can discuss your app and outline a development plan.
						</p>
					</div>
				</div>
				<div
					ref={discussRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:pl-2'
				>
					<Discuss animate={animateDiscuss} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row-reverse items-center w-full justify-center max-w-3xl sm:pr-2 mt-6 '>
				<div className='flex flex-col w-full sm:w-3/4 mt-4 sm:m-0 '>
					<h2 className='title-sm mb-2'>Project strategy</h2>
					<div className='box w-full'>
						<p className='box-text'>
							Development is divided into separate milestones, with details and
							progress tracked in your{' '}
							<Link href='/tour'>
								<a className='text-green font-semibold italic'>
									project dashboard
								</a>
							</Link>
							.
						</p>
					</div>
				</div>
				<div
					ref={designRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:pr-2'
				>
					<Design animate={animateDesign} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row items-center w-full justify-center max-w-3xl sm:pl-2 mt-6'>
				<div className='flex flex-col w-full sm:w-3/4 mt-4 sm:m-0 '>
					<h2 className='title-sm mb-2'>Dedicated development</h2>
					<div className='box w-full'>
						<p className='box-text'>
							Apex Apps develops one app at a time. As my one and only client,
							your app will have my undivided attention.
						</p>
					</div>
				</div>
				<div
					ref={developRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:pl-2 sm:-mt-3'
				>
					<Develop animate={animateDevelop} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row-reverse items-center w-full justify-center max-w-3xl sm:pr-2 mt-6 '>
				<div className='flex flex-col w-full sm:w-3/4 sm:m-0 '>
					<h2 className='title-sm mt-2 mb-2'>Hello, world!</h2>
					<div className='box w-full'>
						<p className='box-text'>
							You will have online access to your app at key stages of
							development, allowing for testing before deployment.
						</p>
					</div>
				</div>
				<div
					ref={deployRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:pr-2 '
				>
					<Deploy animate={animateDeploy} />
				</div>
			</div>
			<Button
				label={<>Let&apos;s chat!</>}
				type='link'
				path='/contact'
				variant='contained'
				size='large'
				buttonClasses=' px-8 py-2 mt-8 text-2xl'
				color='green'
			/>
		</>
	);
}
