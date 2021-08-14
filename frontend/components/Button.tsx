import Link from 'next/link';

interface ButtonProps {
	label: string;
	type?: 'submit' | 'button' | 'reset' | 'link';
	color: string;
	variant: 'outlined' | 'contained';
	fullWidth?: boolean;
	disabled?: boolean;
	onClick?: React.MouseEventHandler;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
	endIcon?: React.ReactNode;
	startIcon?: React.ReactNode;
	path?: string;
	classes?: string;
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
		classes = ''
	} = props;

	const component = (
		<button
			className={`
					rounded-md flex justify-${
						endIcon || startIcon ? 'between' : 'center'
					} items-center
					${classes}
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
							: `border-${color} text-${color} hover:bg-${color} hover:bg-opacity-5 shadow-sm`
					}`}
			type={type !== 'link' ? type : undefined}
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
	} else {
		return component;
	}
};

export default Button;
