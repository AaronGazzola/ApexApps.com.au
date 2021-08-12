interface ButtonProps {
	label: string;
	type?: 'submit' | 'button' | 'reset';
	color: string;
	variant: 'outlined' | 'contained';
	fullWidth?: boolean;
	disabled?: boolean;
	clickHandler: React.MouseEventHandler;
	loading?: boolean;
	size?: 'small' | 'medium' | 'large';
}

const Button = (props: ButtonProps) => {
	const {
		label,
		type = 'button',
		fullWidth = false,
		color,
		variant,
		disabled = false,
		clickHandler,
		loading = false,
		size = 'medium'
	} = props;

	return (
		<button
			className={`
			rounded-md
			${
				size === 'small'
					? 'text-xs p-0.5 font-bold'
					: size === 'large'
					? 'text-lg p-2 font-medium'
					: 'text-maxDrawerWidth p-1.5 font-semibold'
			}
			${fullWidth ? 'w-full' : 'w-min whitespace-nowrap px-3'} 
			
			${
				variant === 'contained' && disabled
					? `cursor-default bg-gray-light text-white`
					: variant === 'contained'
					? `bg-${color} text-white`
					: disabled
					? `cursor-default border-2 border-gray-light text-gray-light`
					: `border border-${color} text-${color}`
			}`}
			type={type}
			onClick={clickHandler}
		>
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
		</button>
	);
};

export default Button;
