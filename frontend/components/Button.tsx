interface ButtonProps {
	label: string;
	type?: 'submit' | 'button' | 'reset';
	color: string;
	variant: 'outlined' | 'contained';
	fullWidth?: boolean;
	disabled?: boolean;
	clickHandler: React.MouseEventHandler;
	loading: boolean;
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
		loading,
		size = 'medium'
	} = props;

	return (
		<button
			className={`${
				fullWidth ? 'w-full' : 'w-min whitespace-nowrap px-3'
			} font-semibold rounded-md p-1.5 ${
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
