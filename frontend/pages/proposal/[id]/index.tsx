import Meta from '../../../components/Meta';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Button from '../../../components/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import {
	bookCall,
	getBookings,
	getProposalById,
	sendEmail
} from '../../../redux/users/users.slice';
import SVG from '../../../components/SVG';
import { Collapse } from '@material-ui/core';
import Input from '../../../components/Input';
import moment, { Moment } from 'moment-timezone';

const Index = () => {
	const dispatch = useAppDispatch();
	const [bookingTimes, setBookingTimes] = useState([] as Moment[]);
	const [lastBookingTodayHasPast, setLastBookingTodayHasPast] = useState(false);

	const router = useRouter();
	const { id } = router.query;
	const { proposal, loading, bookings, alert } = useAppSelector(
		state => state.users
	);
	const { breakpoint } = useAppSelector(state => state.utils);
	const proposalId = typeof id === 'string' ? id : '';
	const [playGif, setPlayGif] = useState(0);
	const [formState, setFormState] = useState({
		email: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		contactMethod: {
			value: 'zoom'
		},
		phone: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		emailComments: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		callTime: ''
	} as { [index: string]: any });
	const { email, contactMethod, phone, callTime, emailComments } = formState;

	const formIsValid =
		contactMethod.value === 'email'
			? email.isValid
			: contactMethod.value === 'phone'
			? email.isValid && phone.isValid && callTime
			: email.isValid && callTime;

	const changeHandler = (
		e: React.FormEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		let value = e.currentTarget.value;
		let id = e.currentTarget.id;
		let isValid = !!value;
		if (id.startsWith('method')) {
			value = id[6].toLocaleLowerCase() + id.slice(7);
			id = 'contactMethod';
		}
		if (id === 'phone')
			value =
				(!isNaN(Number(value)) && !isNaN(parseFloat(value))) || value === ''
					? value
					: phone.value;
		if (id === 'email' || id === 'zoom') {
			isValid = /^\S+@\S+\.\S+$/.test(value);
			id = 'email';
		}
		if (id === 'phone') isValid = value.length >= 5;

		setFormState({
			...formState,
			[id]: {
				...formState[id],
				isValid,
				value
			}
		});
	};

	const touchHandler = (
		e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const id = e.currentTarget.id;
		setFormState({
			...formState,
			[id]: {
				...formState[id],
				isTouched: true
			}
		});
	};

	const handleSelectTime = (callTime: string) => {
		setFormState({
			...formState,
			callTime
		});
	};

	const submitHandler = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (!formIsValid) return;
		const formData = {
			email: email.value,
			contactEmail: email.value,
			projectTitle: proposal?.title || '',
			name: '',
			projectDescription: ''
		};
		if (contactMethod.value === 'email') {
			dispatch(sendEmail({ ...formData, emailComments: emailComments.value }));
		} else {
			dispatch(
				bookCall({
					...formData,
					contactMethod: contactMethod.value,
					phone: phone.value,
					zoomName: email.value,
					callTime,
					userCallTime: moment(callTime, 'HH:mm DD-MM-YYYY ZZ').format(
						'h:mma Do-MMM-YY'
					)
				})
			);
		}
	};

	useEffect(() => {
		// set Melbourne time
		const melbourneTime = moment.tz(moment(), 'Australia/Melbourne').minute(0);

		// set melbourne time of bookings by hour
		let bookingHours = [8, 9, 10, 14, 15, 16, 19, 20];

		// if last booking for today is already passed, skip today

		const lastBookingHasPast =
			melbourneTime.hour() >= 22 ||
			melbourneTime.add(2, 'h').hour() > bookingHours[bookingHours.length - 1];

		if (lastBookingHasPast) melbourneTime.add(1, 'd');
		let melbourneBookingTimes: string[] = [];
		for (let i = 0; i < 3; i++) {
			bookingHours.forEach(hour => {
				// if booking time is more that one hour in the future, add to end of array
				if (melbourneTime.hour(hour).unix() > moment().add(1, 'h').unix()) {
					melbourneBookingTimes.push(
						melbourneTime.hour(hour).minute(0).format('HH:mm DD-MM-YYYY ZZ'),
						melbourneTime.hour(hour).minute(30).format('HH:mm DD-MM-YYYY ZZ')
					);
				}
			});
			// once all times are added, increment day by one
			melbourneTime.add(1, 'd');
		}
		setBookingTimes(
			melbourneBookingTimes.map(time => moment(time, 'HH:mm DD-MM-YYYY ZZ'))
		);
		setLastBookingTodayHasPast(lastBookingHasPast);
	}, []);

	useEffect(() => {
		dispatch(getBookings());
	}, [dispatch]);

	useEffect(() => {
		if (bookings?.length) {
			const bookingsUnix = bookings.map(booking =>
				moment(booking.callTime).unix()
			);
			setBookingTimes(prev =>
				prev.filter(bookingTime => !bookingsUnix.includes(bookingTime.unix()))
			);
		}
	}, [bookings]);

	useEffect(() => {
		if (proposalId) dispatch(getProposalById(proposalId));
	}, [proposalId, dispatch]);

	return (
		<>
			<Meta title='Proposal | Apex Apps' />
			<h1 className='title'>Project Proposal</h1>
			<div
				className='flex items-center w-ful mb-10 flex-wrap-reverse justify-center sm:w-auto px-2'
				style={{ maxWidth: breakpoint === 'xs' ? 450 : '' }}
			>
				<div className='mr-0 sm:mr-4 flex flex-col items-center'>
					<div
						className='relative w-full sm:w-80 p-4 flex flex-col'
						style={{ height: 112 }}
					>
						<p className='text-sm font-medium z-30'>
							Hi, I&apos;m Aaron Gazzola, an Australian{' '}
							<span className='whitespace-nowrap'>full-stack</span> Javascript
							Developer.
						</p>
						<p className='text-sm font-medium z-30'>
							I create elegant and powerful web applications - accessible on any
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
								Hi, I&apos;m Aaron Gazzola, an Australian{' '}
								<span className='whitespace-nowrap'>full-stack</span> Javascript
								Developer.
							</p>
							<p className='text-sm font-medium opacity-0'>
								I create elegant and powerful web applications - accessible on
								any device.
							</p>
						</div>
					</div>
					<Button
						label='More about Apex Apps'
						variant='simple'
						color='green'
						buttonClasses='border border-green px-1.5 py-0.5 mt-12 sm:mt-4'
						type='link'
						path='/'
					/>
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
			{loading ? (
				<>
					<div className='skeleton w-64 h-8 mb-4'></div>
					<div className='box w-full sm:max-w-lg'>
						<div className='skeleton w-60 h-7 mb-3'></div>
						<div className='flex flex-col items-left w-full'>
							<div className='skeleton w-11/12 h-4 mb-2 '></div>
							<div className='skeleton w-10/12 h-4 mb-2 '></div>
							<div className='skeleton w-8/12 h-4 mb-6 '></div>
							<div className='skeleton w-12/12 h-4 mb-2 '></div>
							<div className='skeleton w-4/12 h-4 '></div>
						</div>
					</div>
					<div className='box w-full sm:max-w-lg'>
						<div className='skeleton w-60 h-7 mb-3'></div>
						<div className='flex flex-col items-left w-full'>
							<div className='skeleton w-5/12 h-4 mb-2 '></div>
							<div className='skeleton w-10/12 h-4 mb-2 '></div>
							<div className='skeleton w-8/12 h-4 mb-6 '></div>
							<div className='skeleton w-8/12 h-4 mb-4 '></div>
							<div className='skeleton w-11/12 h-4 mb-2 '></div>
							<div className='skeleton w-6/12 h-4 '></div>
						</div>
					</div>
				</>
			) : (
				<>
					<h1 className='title mb-4'>{proposal?.title}</h1>
					{proposal?.sections?.map((section, index) => (
						<div className='text-box w-full max-w-xl' key={index}>
							<h2 className='box-title'>{section.title}</h2>
							<p className='box-text'>
								{section.content.split('<br/>').map((paragraph, index) => (
									<React.Fragment key={index}>
										{paragraph}
										<br />
									</React.Fragment>
								))}
							</p>
							{section.buttonLink && section.buttonLabel && (
								<a
									href={section.buttonLink}
									target='_blank'
									rel='noreferrer noopener'
									className='w-full'
								>
									<Button
										label={section.buttonLabel}
										type='button'
										color='green'
										variant='simple'
										buttonClasses='border border-green px-1.5 py-0.5 mt-4'
										fullWidth
									/>
								</a>
							)}
						</div>
					))}
					{proposal?.videoLink && (
						<div className='w-full sm:px-8 max-w-4xl'>
							<div className='box full p-4 relative'>
								<h2 className='title-sm mb-2 sm:mb-4'>Personal introduction</h2>
								<div
									className='w-full relative'
									style={{ paddingTop: '56.25%' }}
								>
									<div className='flex items-center justify-center absolute top-0 left-0 right-0 bottom-0'>
										<div className='border-blue-darkest w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full'></div>
									</div>
									<iframe
										className='absolute top-0 left-0 w-full h-full z-10'
										width='560'
										height='315'
										src={
											proposal?.videoLink?.startsWith(
												'https://www.youtube.com/embed'
											)
												? proposal?.videoLink
												: `https://www.youtube.com/embed/${proposal?.videoLink}`
										}
										title='Personal introduction video'
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
										allowFullScreen
									></iframe>
								</div>
							</div>
						</div>
					)}
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
								onClick={() => setPlayGif(prev => (prev === 1 ? 0 : 1))}
							>
								{playGif !== 1 ? (
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
										playGif === 1 ? 'opacity-100' : 'opacity-0'
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
				</>
			)}
			<form
				onSubmit={submitHandler}
				className='flex flex-col item-center w-full items-center mt-6'
			>
				<div className={`box w-full sm:max-w-lg relative`}>
					<h2 className={`title w-full`}>
						{contactMethod.value === 'email'
							? 'Send me an email'
							: 'Book a call'}
					</h2>

					<div className='flex justify-center w-full my-4'>
						<Input
							type='radio'
							value={contactMethod.value === 'zoom' ? 'zoom' : ''}
							label='Zoom'
							id='methodZoom'
							onChange={changeHandler}
							containerClasses='mr-4 w-min'
							validation={false}
						/>
						<Input
							type='radio'
							value={contactMethod.value === 'phone' ? 'phone' : ''}
							label='Phone'
							id='methodPhone'
							onChange={changeHandler}
							containerClasses='mr-4 w-min'
							validation={false}
						/>
						<Input
							type='radio'
							value={contactMethod.value === 'email' ? 'email' : ''}
							label='Email'
							id='methodEmail'
							onChange={changeHandler}
							containerClasses='mr-4 w-min'
							validation={false}
						/>
					</div>
					<div className='px-4 sm:px-6 w-full'>
						{contactMethod.value === 'zoom' ? (
							<Input
								type='text'
								placeholder='Zoom email'
								value={email.value}
								label='Zoom email'
								id='zoom'
								onChange={changeHandler}
								isTouched={email.isTouched}
								isValid={email.isValid}
								helperText={
									!email.isValid && email.isTouched
										? 'Please enter a valid email address'
										: ''
								}
								touchHandler={touchHandler}
								validation
								containerClasses='mt-2 mb-4'
							/>
						) : contactMethod.value === 'phone' ? (
							<>
								<Input
									type='text'
									placeholder='Email'
									value={email.value}
									label='Email'
									id='email'
									onChange={changeHandler}
									isTouched={email.isTouched}
									isValid={email.isValid}
									helperText={
										!email.isValid && email.isTouched
											? 'Please enter a valid email address'
											: ''
									}
									touchHandler={touchHandler}
									validation
									containerClasses='mt-2 mb-2'
								/>
								<Input
									type='text'
									placeholder='Phone number'
									value={phone.value}
									label='Phone number'
									id='phone'
									onChange={changeHandler}
									isTouched={phone.isTouched}
									isValid={phone.isValid}
									touchHandler={touchHandler}
									validation
									containerClasses='mt-2 mb-4'
									inputClasses='no-spin'
									helperText={
										phone.isTouched && !phone.isValid
											? 'Please enter a valid phone number'
											: ''
									}
								/>
							</>
						) : (
							<Input
								type='text'
								placeholder='Email'
								value={email.value}
								label='Email'
								id='email'
								onChange={changeHandler}
								isTouched={email.isTouched}
								isValid={email.isValid}
								helperText={
									!email.isValid && email.isTouched
										? 'Please enter a valid email address'
										: ''
								}
								touchHandler={touchHandler}
								validation
								containerClasses='mt-2 mb-2'
							/>
						)}
					</div>
					<Collapse
						in={contactMethod.value === 'email'}
						timeout='auto'
						collapsedSize={0}
						style={{ width: '100%' }}
					>
						<Input
							type='textarea'
							placeholder='Comments'
							value={emailComments.value}
							label='Comments'
							id='emailComments'
							onChange={changeHandler}
							containerClasses=''
							validation={false}
						/>
					</Collapse>
					<Collapse
						in={contactMethod.value !== 'email'}
						timeout='auto'
						collapsedSize={0}
						style={{ width: '100%' }}
					>
						<p
							className={`text-sm text-center w-full mb-4 italictext-gray-dark`}
						>
							<span className='font-medium'>
								Select a time and date for our call:
							</span>
							<br />
							<span className='italic'>
								Times are displayed in your local time zone
							</span>
						</p>
						<div className='flex w-full justify-around relative'>
							{[0, 1, 2].map(key => {
								let days = key;
								if (lastBookingTodayHasPast) days = key + 1;
								return (
									<div className='flex flex-col items-center' key={days}>
										<p
											className={`font-medium -mb-1 ${
												moment().date() === moment().add(days, 'd').date()
													? 'text-blue-darkest'
													: ''
											}`}
										>
											{moment().add(days, 'd').format('ddd')}
										</p>
										<p
											className={`font-semibold mb-2 ${
												moment().date() === moment().add(days, 'd').date()
													? 'text-blue-darkest'
													: ''
											}`}
										>
											{moment().add(days, 'd').format('D')}
										</p>
										{bookingTimes.map(time => {
											// if booking time is on current date, display
											if (time.date() === moment().add(days, 'd').date()) {
												return (
													<button
														type='button'
														key={`${key} ${time.format('HH:mm DD')}`}
														className={`rounded-md border-none px-2 py-1 m-0 hover:bg-green hover:text-white hover:font-medium group
															${
																callTime === time.format('HH:mm DD-MM-YYYY ZZ')
																	? 'bg-green text-white'
																	: ''
															}`}
														onClick={() =>
															handleSelectTime(
																time.format('HH:mm DD-MM-YYYY ZZ')
															)
														}
													>
														{time.format('h:mm')}
														<span
															className={`font-medium group-hover:text-white text-xs ${
																callTime === time.format('HH:mm DD-MM-YYYY ZZ')
																	? 'bg-green text-white'
																	: 'text-gray-dark'
															}`}
														>
															{time.format('a')}
														</span>
													</button>
												);
											} else {
												return (
													<React.Fragment
														key={`${key} ${time.format('HH:mm DD')}`}
													></React.Fragment>
												);
											}
										})}
									</div>
								);
							})}
						</div>
					</Collapse>
					<div className='flex flex-col items-center w-full mt-8'>
						<Button
							variant='contained'
							color='green'
							disabled={!formIsValid}
							label={
								contactMethod.value === 'email' ? 'Send email' : 'Book call'
							}
							type='submit'
							size='large'
							buttonClasses='px-8 py-2'
							loading={loading}
							fullWidth
						/>
					</div>
				</div>
			</form>

			<a
				href='mailto: aaron@apexapps.com.au'
				rel='noopener noreferrer'
				className='flex justify-center mt-4'
			>
				<SVG name='mail' classes='fill-current text-green mr-2' />
				<p className='font-medium italic text-green'>Aaron@ApexApps.com.au</p>
			</a>

			<a
				rel='noopener noreferrer'
				target='_blank'
				href='https://github.com/AaronGazzola'
				className='flex justify-center mt-3'
			>
				<SVG name='github' classes='fill-current text-green mr-2' />
				<p className='font-medium italic text-green'>Github.com/AaronGazzola</p>
			</a>
			<a
				rel='noopener noreferrer'
				target='_blank'
				href='https://www.upwork.com/freelancers/~017424c1cc6bed64e2'
				className='flex justify-center mt-2 items-center'
			>
				<div className='relative w-9 h-7 overflow-hidden'>
					<SVG
						name='upworkLogo'
						classes='absolute fill-current text-green w-20 h-16 '
						style={{
							top: '-18px',
							left: '0px'
						}}
					/>
				</div>
				<p className='font-medium italic text-green'>
					Upwork.com/Freelancers/AaronGazzola
				</p>
			</a>
		</>
	);
};

export default Index;
