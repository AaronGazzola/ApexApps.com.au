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
		window.addEventListener('scroll', scrollHandler);
		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

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
			<div className='flex flex-col sm:flex-row items-center w-full mb-0 justify-center max-w-6xl mt-2'>
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
			<Button
				label='View full portfolio'
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
			<div className='p-2 mt-6 w-full max-w-2xl'>
				<div className='box w-full border-blue-darkest border'>
					<h1 className='title'>Apex Apps Dashboard</h1>
					<p className='box-text'>
						As a client at Apex Apps, you will gain access to a personalised
						project dashboard. Track development progress, view your project
						timeline and receive scheduled updates.
					</p>
					<Button
						label='Take a tour of the dashboard'
						type='link'
						path='/tour'
						variant='simple'
						size='medium'
						buttonClasses=' pl-3 pr-2 py-0.5 mt-2 mb-1'
						color='green'
						endIcon={
							<SVG
								name='map'
								classes='fill-current text-green ml-1 mt-0.5 w-7 h-7'
							/>
						}
					/>
					<div
						className={`p-2 relative group cursor-pointer w-full transform `}
						onClick={() => setPlayGif(prev => (prev === 3 ? 0 : 3))}
					>
						{playGif !== 3 && (
							<SVG
								name='playFill'
								classes='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current text-blue w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100'
							/>
						)}
						<div className='rounded-2xl overflow-hidden w-full border'>
							{playGif === 3 ? (
								<Image
									src='/assets/gifs/apexapps.com.au.gif'
									layout='responsive'
									width={1598}
									height={895}
								/>
							) : (
								<Image
									src='/assets/images/apex-screenshot.png'
									layout='responsive'
									width={1598}
									height={895}
								/>
							)}
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
					<p className='box-text'>
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
					<p className='box-text'>
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
						src='/assets/svg/upwork-logo.svg'
						width={512}
						height={153}
						layout='responsive'
					/>
				</div>
			</div>
			<Button
				label="Let's chat!"
				type='link'
				path='/contact'
				variant='contained'
				size='large'
				buttonClasses=' px-8 py-2 mt-6 text-2xl'
				color='green'
			/>
			<div className='flex flex-col-reverse sm:flex-row items-center w-full justify-center max-w-3xl mt-10'>
				<div className='flex flex-col w-full px-4 sm:p-0 sm:w-3/4 mt-4 sm:m-0 sm:pl-6'>
					<h2 className='title-sm mb-2 '>Let's chat!</h2>
					<div className='box w-full'>
						<p className='box-text sm:mt-2'>
							Book a call or send an email via the{' '}
							<Link href='/contact'>
								<a className='text-green font-semibold italic'>contact</a>
							</Link>{' '}
							page, and we can discuss your app and outline a development plan.
						</p>
					</div>
				</div>
				<div
					ref={discussRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:px-4'
				>
					<Discuss animate={animateDiscuss} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row-reverse items-center w-full justify-center max-w-3xl mt-4'>
				<div className='flex flex-col w-full px-4 sm:p-0 sm:w-3/4 mt-4 sm:m-0 sm:pl-6'>
					<h2 className='title-sm mb-2'>Project strategy</h2>
					<div className='box w-full sm:mt-2'>
						<p className='box-text'>
							Development is divided into distinct milestones, the plan and
							progress of each milestone is tracked in the{' '}
							<Link href='/contact'>
								<a className='text-green font-semibold italic'>
									project dashboard
								</a>
							</Link>
						</p>
					</div>
				</div>
				<div
					ref={designRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:px-4'
				>
					<Design animate={animateDesign} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row items-center w-full justify-center max-w-3xl mt-4'>
				<div className='flex flex-col w-full px-4 sm:p-0 sm:w-3/4 mt-4 sm:m-0 sm:pl-6'>
					<h2 className='title-sm mb-2'>Dedicated development</h2>
					<div className='box w-full sm:mt-2'>
						<p className='box-text'>
							Apex Apps develops one app at a time. As my one and only client,
							your app will have my undivided attention.
						</p>
					</div>
				</div>
				<div
					ref={developRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:px-4 sm:-mt-3'
				>
					<Develop animate={animateDevelop} />
				</div>
			</div>
			<div className='flex flex-col-reverse sm:flex-row-reverse items-center w-full justify-center max-w-3xl mt-4'>
				<div className='flex flex-col w-full px-4 sm:p-0 sm:w-3/4 sm:m-0 sm:pl-6'>
					<h2 className='title-sm mt-2 mb-4 sm:-mb-2'>Hello, world!</h2>
					<div className='box w-full sm:mt-2'>
						<p className='box-text'>
							You will have online access to your app at key stages of
							development, allowing for testing before deployment.
						</p>
					</div>
				</div>
				<div
					ref={deployRef}
					className='flex justify-center w-36 h-36 sm:w-4/12 sm:px-4 '
				>
					<Deploy animate={animateDeploy} />
				</div>
			</div>
			<Button
				label="Let's chat!"
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
