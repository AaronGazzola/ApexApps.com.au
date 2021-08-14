import React from 'react';

interface InputProps {
	type: 'text' | 'textarea' | 'password';
	placeholder: string;
	value: string;
	changeHandler: React.ChangeEventHandler<HTMLInputElement>;
	id: string;
	isValid: boolean;
	isTouched: boolean;
	helperText: string;
	touchHandler: React.FocusEventHandler<HTMLInputElement>;
	label: string;
	passwordIsHidden?: boolean;
	endIcon?: React.ReactNode;
}

const Input = (props: InputProps) => {
	const {
		placeholder,
		type,
		value,
		changeHandler,
		id,
		isValid,
		helperText,
		isTouched,
		touchHandler,
		label,
		passwordIsHidden = true,
		endIcon
	} = props;
	return (
		<div className='flex flex-col mb-0.5 last:mb-0 relative'>
			{endIcon && (
				<div className='absolute right-7 top-1/2 transform -translate-y-full'>
					{endIcon}
				</div>
			)}
			<input
				className={`form-input w-full border rounded-md font-medium focus:outline-none p-2 px-3 text-gray-dark ${
					!isValid && isTouched
						? 'border-red placeholder-red'
						: isValid
						? 'border-green'
						: 'border-gray-light focus:border-blue-darkest placeholder-gray-400'
				}
				${type === 'password' && passwordIsHidden ? 'tracking-widest' : ''}`}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={changeHandler}
				id={id}
				onBlur={touchHandler}
			/>
			<label
				className={`transition-transform duration-300 ease-in-out text-xs p-1 pt-0.5 font-semibold ${
					!isValid && isTouched
						? 'text-red'
						: isValid
						? 'text-green form-label'
						: 'text-blue-darkest form-label'
				}`}
				htmlFor={id}
			>
				{!isValid && isTouched ? helperText : label}
			</label>
		</div>
	);
};

export default Input;
