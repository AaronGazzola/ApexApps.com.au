import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setDimensions } from '../redux/utils/utils.slice';

const setScreenDimensions = () => {
	const dispatch = useAppDispatch();
	const { breakpoint, screenWidth, screenHeight } = useAppSelector(
		state => state.utils
	);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;
			dispatch(
				setDimensions({
					screenWidth: width,
					screenHeight: height,
					breakpoint:
						width < 640
							? 'xs'
							: width < 768
							? 'sm'
							: width < 1024
							? 'md'
							: width < 1280
							? 'lg'
							: width < 1536
							? 'xl'
							: '2xl'
				})
			);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return [breakpoint, screenWidth, screenHeight];
};

export default setScreenDimensions;
