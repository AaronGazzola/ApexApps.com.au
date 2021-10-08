import SVG from './SVG';

interface ReviewProps {
	review: JSX.Element;
	rating?: number;
}

const Review = (props: ReviewProps) => {
	const { rating = 5, review } = props;
	return (
		<div className='relative'>
			<p className='absolute top-0 left-0 text-blue-light text-5xl tracking-tighter transform rotate-180 m-1.5'>
				,,
			</p>
			<p className='absolute bottom-0 right-0 text-blue-light text-5xl tracking-tighter transform m-0.5 -translate-y-1/2 -translate-x-1/2'>
				,,
			</p>
			<div className='box w-full pb-2'>
				<p className='box-text p-1'>{review}</p>
				<div className='flex justify-center items-center w-full'>
					{Array.from(Array(rating).keys()).map(key => (
						<SVG
							key={key}
							name='starFill'
							classes=' fill-current text-yellow-400'
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Review;
