import React, { FormEventHandler } from 'react';
import SVG from './SVG';

interface InputProps {
	type:
		| 'text'
		| 'textarea'
		| 'password'
		| 'select'
		| 'date'
		| 'number'
		| 'checkbox'
		| 'radio';
	placeholder?: string;
	labelClasses?: string;
	value: string | number | undefined;
	onChange?:
		| React.ChangeEventHandler<
				HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		  >
		| FormEventHandler;
	label: string;
	id: string;
	isValid?: boolean;
	isTouched?: boolean;
	helperText?: string;
	touchHandler?: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	>;
	passwordIsHidden?: boolean;
	endIcon?: React.ReactNode;
	fullWidth?: boolean;
	options?: string[];
	inputClasses?: string;
	containerClasses?: string;
	labelTop?: boolean;
	validation?: boolean;
	autoFocus?: boolean;
	rows?: number;
	maxLength?: number;
	checkboxClasses?: string;
	checkClasses?: string;
}

const Input = (props: InputProps) => {
	const {
		placeholder = '',
		type,
		value,
		onChange = () => {},
		id,
		isValid = true,
		helperText = '',
		isTouched = true,
		touchHandler = () => {},
		label,
		passwordIsHidden = true,
		endIcon,
		fullWidth = true,
		options = [],
		inputClasses = '',
		containerClasses = '',
		labelTop = true,
		validation = true,
		autoFocus = false,
		maxLength = 10000,
		rows = 3,
		checkboxClasses = '',
		checkClasses = '',
		labelClasses = ''
	} = props;

	return (
		<div
			className={`relative flex
			${labelTop ? 'flex-col-reverse' : 'flex-col'}
			${fullWidth ? 'w-full' : ''}
			${containerClasses}`}
		>
			{endIcon && (
				<div className={`absolute right-7`} style={{ top: labelTop ? 30 : 9 }}>
					{endIcon}
				</div>
			)}
			{type === 'select' ? (
				<>
					<select
						onChange={onChange}
						className={`z-10 select w-full border-2 rounded p-2 text-gray-dark font-medium focus:outline-none focus:border-blue-darkest cursor-pointer
					${inputClasses}
					`}
						name={label}
						id={id}
						value={value}
					>
						{options.map(option => (
							<option value={option} key={option}>
								{option}
							</option>
						))}
					</select>
					<label
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-semibold text-blue-darkest form-label ${labelClasses}`}
						htmlFor={id}
						style={{ minHeight: 18 }}
					>
						{!isValid && isTouched ? helperText : label}
					</label>
					<SVG
						name='chevronLeft'
						classes='fill-current text-gray-light absolute right-3 top-1/2 transform -rotate-90 w-4 h-4'
					/>
				</>
			) : type === 'checkbox' || type === 'radio' ? (
				<div className='flex relative items-center w-min flex-nowrap'>
					<input
						type={type}
						id={id}
						className={`checkbox w-5 h-5 z-20 cursor-pointer`}
						onChange={onChange}
						checked={!!value}
					/>
					{type === 'checkbox' ? (
						<SVG
							name='checkMark'
							classes={`checkbox-control absolute top-1/2 transform -translate-y-1/2 left-0 w-5 h-5 z-10 fill-current text-blue-darkest ${checkClasses}`}
						></SVG>
					) : (
						<div
							className={`checkbox-control absolute top-1/2 left-1 transform -translate-y-1/2  w-3 h-3 z-10 rounded-full bg-blue-darkest ${checkClasses}`}
						></div>
					)}
					<div
						className={`border-2 border-blue-darkest ${
							type === 'radio' ? 'rounded-full' : 'rounded-md'
						} absolute top-1/2 transform -translate-y-1/2 left-0 w-5 h-5 ${checkboxClasses}`}
					></div>
					<label
						htmlFor={id}
						className={`select-none cursor-pointer pl-6 text-sm font-medium whitespace-nowrap ${labelClasses} ${
							!isValid && isTouched && validation
								? 'text-red form-label'
								: isValid && validation
								? 'text-green form-label'
								: 'text-gray-dark form-label'
						}`}
					>
						{label}
					</label>
				</div>
			) : (
				<>
					<p
						className={`text-xs font-semibold pl-1 pt-0.5  ${
							!isValid && isTouched && validation
								? 'text-red'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-darkest form-label'
						}`}
						style={{ minHeight: 18 }}
					>
						{helperText}
					</p>

					{type === 'textarea' ? (
						<textarea
							autoFocus={autoFocus}
							className={`form-input${
								labelTop ? '-label-top' : '-label-bottom'
							} w-full border rounded-md font-medium focus:outline-none p-2 px-3 text-gray-dark 
						${
							!isValid && isTouched && validation
								? 'border-red placeholder-red'
								: isValid && validation
								? 'border-green'
								: 'border-gray-light focus:border-blue-darkest placeholder-gray-400'
						}
						${inputClasses}`}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							id={id}
							onBlur={touchHandler}
							rows={rows}
							maxLength={maxLength}
						/>
					) : (
						<input
							autoFocus={autoFocus}
							className={`form-input${
								labelTop ? '-label-top' : '-label-bottom'
							} w-full border rounded-md font-medium focus:outline-none p-2 px-3 text-gray-dark 
						${
							!isValid && isTouched && validation
								? 'border-red placeholder-red'
								: isValid && validation
								? 'border-green'
								: 'border-gray-light focus:border-blue-darkest placeholder-gray-400'
						}
						${inputClasses}
						${
							type === 'password' &&
							passwordIsHidden &&
							typeof value === 'string' &&
							value?.length
								? 'tracking-widest'
								: ''
						}`}
							type={type}
							placeholder={placeholder}
							value={value}
							onChange={onChange}
							id={id}
							onBlur={touchHandler}
						/>
					)}
					<label
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-semibold ${labelClasses} ${
							!isValid && isTouched && validation
								? 'text-red form-label'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-darkest form-label'
						}`}
						htmlFor={id}
					>
						{label}
					</label>
				</>
			)}
		</div>
	);
};

export default Input;
