import React, { FormEventHandler } from 'react';
import SVG from './SVG';

interface InputProps {
	type: 'text' | 'textarea' | 'password' | 'select' | 'date';
	placeholder?: string;
	value: string;
	onChange?:
		| React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
		| FormEventHandler;
	label: string;
	id: string;
	isValid?: boolean;
	isTouched?: boolean;
	helperText?: string;
	touchHandler?: React.FocusEventHandler<HTMLInputElement>;
	passwordIsHidden?: boolean;
	endIcon?: React.ReactNode;
	fullWidth?: boolean;
	options?: string[];
	inputClasses?: string;
	containerClasses?: string;
	labelTop?: boolean;
	validation?: boolean;
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
		validation = true
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
					<SVG
						name='chevronLeft'
						classes='fill-current text-gray-light absolute right-3 top-1/2 transform -rotate-90 w-4 h-4'
					/>
					<select
						onChange={onChange}
						className={`select w-full border-2 rounded p-2 text-gray-dark font-medium focus:outline-none focus:border-blue-darkest cursor-pointer
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
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-semibold text-blue-darkest form-label`}
						htmlFor={id}
					>
						{!isValid && isTouched ? helperText : label}
					</label>
				</>
			) : (
				<>
					<p
						className={`text-xs font-semibold pl-1 pt-0.5 ${
							!isValid && isTouched && validation
								? 'text-red'
								: isValid && validation
								? 'text-green form-label'
								: 'text-blue-darkest form-label'
						}`}
					>
						{helperText}
					</p>

					<input
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
							type === 'password' && passwordIsHidden && value.length
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
					<label
						className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-semibold ${
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
