import React from 'react';
import { Collapse } from '@material-ui/core';
import moment, { Moment } from 'moment-timezone';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Meta from '../../components/Meta';
import SVG from '../../components/SVG';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	bookCall,
	getBookings,
	getUser,
	sendEmail
} from '../../redux/users/users.slice';

const Index = () => {
	const dispatch = useAppDispatch();
	const { user, loading, bookings, alert } = useAppSelector(
		state => state.users
	);
	const [bookingTimes, setBookingTimes] = useState([] as Moment[]);

	const [lastBookingTodayHasPast, setLastBookingTodayHasPast] = useState(false);
	const [step, setStep] = useState(1);
	const [formState, setFormState] = useState({
		name: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		email: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		projectTitle: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		projectDescription: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		contactMethod: {
			value: 'zoom'
		},
		useContactEmail: true,
		contactEmail: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		zoomName: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		phone: {
			isValid: false,
			isTouched: false,
			value: ''
		},
		emailComments: {
			value: ''
		},
		callTime: ''
	} as { [index: string]: any });
	const {
		name,
		email,
		projectTitle,
		projectDescription,
		contactMethod,
		useContactEmail,
		contactEmail,
		phone,
		zoomName,
		callTime,
		emailComments
	} = formState;

	const formIsValid =
		name.isValid &&
		email.isValid &&
		((contactMethod.value === 'email' && contactEmail.isValid) ||
			(contactMethod.value === 'phone' && phone.isValid && callTime) ||
			(contactMethod.value === 'zoom' && zoomName.isValid && callTime));

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
				!isNaN(Number(value)) && !isNaN(parseFloat(value))
					? value
					: phone.value;
		if (id.includes('mail')) isValid = /^\S+@\S+\.\S+$/.test(value);
		if (id === 'phone') isValid = value.length >= 5;

		if (id === 'email' && useContactEmail) {
			setFormState({
				...formState,
				contactEmail: {
					...contactEmail,
					value,
					isValid
				},
				zoomName: {
					...contactEmail,
					value,
					isValid
				},
				[id]: {
					...formState[id],
					isValid,
					value
				}
			});
		} else {
			setFormState({
				...formState,
				[id]: {
					...formState[id],
					isValid,
					value
				},
				useContactEmail:
					id === 'contactEmail' || id === 'zoomName'
						? value === email.value
						: useContactEmail
			});
		}
	};

	const changeCheckedHandler = (e: React.FormEvent<HTMLInputElement>) => {
		const checked = e.currentTarget.checked;
		if (checked) {
			setFormState(prev => ({
				...formState,
				useContactEmail: checked,
				contactEmail: {
					...prev.email
				},
				zoomName: {
					...prev.email
				}
			}));
		} else {
			setFormState(prev => ({
				...formState,
				contactEmail: {
					...prev.contactEmail,
					isValid: false,
					value: ''
				},
				zoomName: {
					...prev.zoomName,
					isValid: false,
					value: ''
				},
				useContactEmail: checked
			}));
		}
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
		const formData = {
			name: name.value,
			email: email.value,
			contactEmail: email.value,
			projectTitle: projectTitle.value,
			projectDescription: projectDescription.value
		};
		if (contactMethod.value === 'email') {
			dispatch(sendEmail({ ...formData, emailComments: emailComments.value }));
		} else {
			dispatch(
				bookCall({
					...formData,
					contactMethod: contactMethod.value,
					phone: phone.value,
					zoomName: zoomName.value,
					callTime
				})
			);
		}
	};

	useEffect(() => {
		if (user)
			setFormState(prev => ({
				...prev,
				name: {
					...prev.name,
					value: user.userName,
					isValid: true
				},
				email: {
					...prev.email,
					value: user.email,
					isValid: true
				},
				contactEmail: prev.useContactEmail
					? { ...prev.email, value: user.email, isValid: true }
					: prev.contactEmail,
				zoomName: prev.useContactEmail
					? { ...prev.email, value: user.email, isValid: true }
					: prev.zoomName
			}));
	}, [user, dispatch]);

	useEffect(() => {
		// set Melbourne time
		const melbourneTime = moment.tz(moment(), 'Australia/Melbourne').minute(0);

		// set melbourne time of bookings by hour
		let bookingHours = [7, 8, 9, 13, 14, 15, 18, 19, 20];

		// if last booking for today is already passed, skip today
		const lastBookingTodayHasPast =
			melbourneTime.hour() > bookingHours[bookingHours.length - 1];
		if (lastBookingTodayHasPast) melbourneTime.add(1, 'd');

		let melbourneBookingTimes: string[] = [];
		for (let i = 0; i < 3; i++) {
			bookingHours.forEach(hour => {
				// if booking time is more that one hour in the future, add to end of array
				if (melbourneTime.hour(hour).unix() > moment().add(1, 'h').unix()) {
					melbourneBookingTimes.push(
						melbourneTime.hour(hour).minute(0).format('HH:mm DD-MM-YYY ZZ'),
						melbourneTime.hour(hour).minute(30).format('HH:mm DD-MM-YYY ZZ')
					);
				}
			});
			// once all times are added, increment day by one
			melbourneTime.add(1, 'd');
		}
		setBookingTimes(
			melbourneBookingTimes.map(time => moment(time, 'HH:mm DD-MM-YYY ZZ'))
		);
		setLastBookingTodayHasPast(lastBookingTodayHasPast);
	}, []);

	useEffect(() => {
		dispatch(getBookings());
	}, [dispatch]);

	useEffect(() => {
		if (alert) setStep(1);
	}, [alert]);

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

	return (
		<>
			<Meta title='Contact Aaron | Apex Apps' />
			<h1 className='title'>Contact</h1>
			<form onSubmit={submitHandler} className='flex flex-col item-center'>
				<div className='box w-72 sm:w-96 relative'>
					<div
						className={`absolute rounded-full w-6 h-6 right-4 left-3 mt-1 mr-2 transition-opacity duration-300 flex items-center justify-center
								${step > 1 ? 'bg-green' : 'bg-blue-darkest'}`}
					>
						{step === 1 ? (
							<p className='text-white mt-0.5 font-semibold'>1</p>
						) : (
							<SVG name='checkMark' classes='text-white fill-current h-5 w-5' />
						)}
					</div>
					<SVG
						name='chevronLeft'
						classes={`fill-current text-gray light transform  absolute top-4 right-4 w-6 h-6
					transition-transform duration-300 ease-in-out  ${
						step === 1 ? 'rotate-90 translate-y-2 text-blue-dark' : '-rotate-90'
					}
					`}
					/>
					<div
						className='absolute top-0 left-0 w-full h-16 cursor-pointer'
						onClick={() => setStep(1)}
					></div>
					<h2 className='title-sm w-full px-6 cursor-pointer'>Your details</h2>
					<Collapse
						in={step === 1}
						timeout='auto'
						collapsedSize={0}
						style={{ width: '100%' }}
					>
						{loading ? (
							<>
								<div className='skeleton w-full h-10 mt-5 mb-8'></div>
								<div className='skeleton w-full h-10 my-5'></div>
							</>
						) : (
							<>
								<Input
									type='text'
									placeholder='Name'
									value={name.value}
									validation
									isValid={name.isValid}
									helperText={
										name.isTouched && !name.isValid
											? 'Please enter your name'
											: ''
									}
									label='Name'
									id='name'
									onChange={changeHandler}
									touchHandler={touchHandler}
									isTouched={name.isTouched}
								/>
								<Input
									type='text'
									placeholder='Email'
									value={email.value}
									validation
									isValid={email.isValid}
									helperText={
										email.isTouched && !email.isValid
											? 'Please enter a valid email address'
											: ''
									}
									label='Email'
									id='email'
									onChange={changeHandler}
									touchHandler={touchHandler}
									isTouched={email.isTouched}
								/>
							</>
						)}
						<div className='flex justify-end w-full'>
							<Button
								variant='contained'
								color='green'
								disabled={!name.isValid || !email.isValid}
								label='Next'
								type='button'
								onClick={() => {
									if (name.isValid && email.isValid) setStep(2);
								}}
								buttonClasses='px-6 py-1'
							/>
						</div>
					</Collapse>
				</div>
				<div
					className={`box w-72 sm:w-96 relative ${
						!name.isValid || !email.isValid ? 'bg-gray-200' : ''
					}`}
				>
					<div
						className={`absolute rounded-full w-6 h-6 right-4 left-3 mt-1 mr-2 transition-opacity duration-300 flex items-center justify-center
								${step > 2 ? 'bg-green' : step === 1 ? 'bg-gray' : 'bg-blue-darkest'}`}
					>
						{step !== 3 ? (
							<p className='text-white mt-0.5 font-semibold'>2</p>
						) : (
							<SVG name='checkMark' classes='text-white fill-current h-5 w-5' />
						)}
					</div>
					<SVG
						name='chevronLeft'
						classes={`fill-current text-gray light transform  absolute top-4 right-4 w-6 h-6
					transition-transform duration-300 ease-in-out  ${
						step === 2 ? 'rotate-90 translate-y-2 text-blue-dark' : '-rotate-90'
					}
					`}
					/>
					<div
						className={`absolute top-0 left-0 w-full h-16 ${
							name.isValid || email.isValid ? 'cursor-pointer' : ''
						}`}
						onClick={() => {
							if (name.isValid && email.isValid) setStep(2);
						}}
					></div>
					<h2
						className={`title-sm w-full px-6 ${
							name.isValid || email.isValid ? 'cursor-pointer' : ''
						}`}
					>
						Your project
					</h2>
					<Collapse
						in={step === 2}
						timeout='auto'
						collapsedSize={0}
						style={{ width: '100%' }}
					>
						<Input
							type='text'
							placeholder='Project title'
							value={projectTitle.value}
							label='projectTitle'
							id='projectTitle'
							onChange={changeHandler}
							isTouched={projectTitle.isTouched}
							validation={false}
						/>
						<Input
							type='textarea'
							placeholder='Project description'
							value={projectDescription.value}
							label='Project description'
							id='projectDescription'
							onChange={changeHandler}
							containerClasses='mb-2'
							validation={false}
						/>
						<div className='flex justify-end w-full'>
							<Button
								variant='contained'
								color='green'
								label='Next'
								type='button'
								onClick={() => setStep(3)}
								buttonClasses='px-6 py-1'
							/>
						</div>
					</Collapse>
				</div>
				<div
					className={`box w-72 sm:w-96 relative ${
						!name.isValid || !email.isValid ? 'bg-gray-200' : ''
					}`}
				>
					<div
						className={`absolute rounded-full w-6 h-6 right-4 left-3 mt-1 mr-2 transition-opacity duration-300 flex items-center justify-center
								${step !== 3 ? 'bg-gray' : 'bg-blue-darkest'}`}
					>
						<p className='text-white mt-0.5 font-semibold'>3</p>
					</div>
					<SVG
						name='chevronLeft'
						classes={`fill-current text-gray light transform  absolute top-4 right-4 w-6 h-6
					transition-transform duration-300 ease-in-out  ${
						step === 3 ? 'rotate-90 translate-y-2 text-blue-dark' : '-rotate-90'
					}
					`}
					/>
					<div
						className={`absolute top-0 left-0 w-full h-16 ${
							name.isValid || email.isValid ? 'cursor-pointer' : ''
						}`}
						onClick={() => {
							if (name.isValid && email.isValid) setStep(3);
						}}
					></div>
					<h2
						className={`title-sm w-full px-6 ${
							name.isValid || email.isValid ? 'cursor-pointer' : ''
						}`}
					>
						Contact method
					</h2>
					<Collapse
						in={step === 3}
						timeout='auto'
						collapsedSize={0}
						style={{ width: '100%' }}
					>
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
						<Collapse
							in={contactMethod.value !== 'phone'}
							timeout='auto'
							collapsedSize={0}
							style={{ width: '100%' }}
						>
							<div className='flex justify-center'>
								<Input
									type='checkbox'
									value={useContactEmail}
									label='Use contact email'
									id='useContactEmail'
									onChange={changeCheckedHandler}
									validation={false}
									containerClasses='w-min'
								/>
							</div>
						</Collapse>

						{contactMethod.value === 'zoom' ? (
							<Input
								type='text'
								placeholder='Zoom name or email'
								value={zoomName.value}
								label='Zoom name or email'
								id='zoomName'
								onChange={changeHandler}
								isTouched={zoomName.isTouched}
								isValid={zoomName.isValid}
								helperText={!zoomName.isValid && zoomName.isTouched}
								touchHandler={touchHandler}
								validation
								containerClasses='mt-2 mb-4'
							/>
						) : contactMethod.value === 'phone' ? (
							<Input
								type='text'
								placeholder='Phone number'
								value={phone.value}
								label='Phone number'
								id='phone'
								onChange={changeHandler}
								isTouched={phone.isTouched}
								isValid={phone.isValid}
								helperText={!phone.isValid && phone.isTouched}
								touchHandler={touchHandler}
								validation
								containerClasses='mt-2 mb-4'
								inputClasses='no-spin'
							/>
						) : (
							<Input
								type='text'
								placeholder='Email'
								value={contactEmail.value}
								label='Email'
								id='contactEmail'
								onChange={changeHandler}
								isTouched={contactEmail.isTouched}
								isValid={contactEmail.isValid}
								helperText={!contactEmail.isValid && contactEmail.isTouched}
								touchHandler={touchHandler}
								validation
								containerClasses='mt-2 mb-2'
							/>
						)}
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
								Select a time and date for our call:
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
												if (time.date() === moment().add(key, 'd').date()) {
													return (
														<button
															type='button'
															key={`${key} ${time.format('HH:mm DD')}`}
															className={`rounded-md border-none px-2 py-1 m-0 hover:bg-green hover:text-white hover:font-medium group
															${callTime === time.format('HH:mm DD-MM-YYY ZZ') ? 'bg-green text-white' : ''}`}
															onClick={() =>
																handleSelectTime(
																	time.format('HH:mm DD-MM-YYY ZZ')
																)
															}
														>
															{time.format('h:mm')}
															<span
																className={`font-medium group-hover:text-white text-xs ${
																	callTime === time.format('HH:mm DD-MM-YYY ZZ')
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
						<div className='flex flex-col items-center w-full mt-6'>
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
					</Collapse>
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
				className='flex justify-center mt-2'
			>
				<SVG name='github' classes='fill-current text-green mr-2' />
				<p className='font-medium italic text-green'>github.com/AaronGazzola</p>
			</a>
		</>
	);
};

export default Index;
