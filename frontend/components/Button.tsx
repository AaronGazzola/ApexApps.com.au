import Link from 'next/link';
import { ChangeEventHandler } from 'react';

interface ButtonProps {
	label?: string;
	color: string;
	variant: 'simple' | 'contained';
	type?: 'submit' | 'button' | 'reset' | 'link' | 'file';
	fullWidth?: boolean;
	disabled?: boolean;
	onClick?: React.MouseEventHandler;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	endIcon?: React.ReactNode;
	startIcon?: React.ReactNode;
	path?: string;
	buttonClasses?: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Button = (props: ButtonProps) => {
	const {
		label,
		type = 'button',
		fullWidth = false,
		color,
		variant,
		disabled = false,
		onClick = () => {},
		loading = false,
		size = 'medium',
		endIcon = null,
		startIcon = null,
		path = '',
		buttonClasses = '',
		onChange
	} = props;

	const component = (
		<button
			className={`		
			rounded-md flex justify-${
				endIcon || startIcon ? 'between' : 'center'
			} items-center
					${buttonClasses}
					${
						size === 'small'
							? 'text-xs font-bold'
							: size === 'large'
							? 'text-lg  font-medium'
							: 'text-maxDrawerWidth font-semibold'
					}
					${fullWidth ? 'w-full' : 'w-min whitespace-nowrap'} 
					${
						variant === 'contained' && disabled
							? `cursor-default bg-gray-light text-white`
							: variant === 'contained'
							? `bg-${color} text-white`
							: disabled
							? `cursor-default border-2 border-gray-light text-gray-light`
							: `border-${color} text-${color} hover:bg-${color} hover:bg-opacity-5 group-hover:bg-${color} group-hover:bg-opacity-5 `
					}`}
			type={type !== 'link' && type !== 'file' ? type : undefined}
			onClick={type === 'link' ? () => {} : onClick}
		>
			{startIcon && startIcon}
			{loading ? (
				<div className='flex justify-center'>
					<div
						className='w-6 h-6 border-t-2 border-l-2 border-current animate-spin'
						style={{ borderRadius: '50%' }}
					></div>
				</div>
			) : (
				label
			)}
			{endIcon && endIcon}
		</button>
	);

	if (type === 'link') {
		return <Link href={path}>{component}</Link>;
	} else if (type === 'file') {
		return (
			<div className='relative group cursor-pointer'>
				{component}
				<input
					className='absolute top-0 left-0 w-full h-full opacity-0'
					onChange={onChange}
					value=''
					type='file'
				/>
			</div>
		);
	} else {
		return component;
	}
};

export default Button;
