interface ButtonProps {
	label: string;
	type: 'submit';
	color: string;
	variant: 'outlined' | 'contained';
	fullWidth: boolean;
	disabled: boolean;
}

const Button = (props: ButtonProps) => {
	const { label, type, fullWidth, color, variant, disabled } = props;

	return (
		<button
			className={`${
				fullWidth ? 'w-full' : 'w-min whitespace-nowrap px-3'
			} font-semibold rounded-md p-1.5 ${
				variant === 'contained'
					? `bg-${disabled ? 'gray-light' : color} text-white`
					: disabled
					? `border-2 border-gray-light text-gray-light`
					: `border border-${color} text-${color}`
			}`}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
};

export default Button;
