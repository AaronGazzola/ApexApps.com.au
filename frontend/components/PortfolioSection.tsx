import React, { useState } from 'react';
import SVG from './SVG';
import Image from 'next/image';

interface PortfolioItemProps {
	itemNumber: number;
	activeItem: number;
	setActiveItem: React.Dispatch<React.SetStateAction<number>>;
	color: 'blue' | 'white';
	image: string;
	imageAlt: string;
	gif: string;
	gifAlt: string;
}

const PortfolioItem = (props: PortfolioItemProps) => {
	const {
		itemNumber,
		activeItem,
		setActiveItem,
		color,
		image,
		gif,
		imageAlt,
		gifAlt
	} = props;
	return (
		<div className='w-full sm:w-2/5 pb-2 sm:px-2'>
			<div
				className={`relative group cursor-pointer  transform rounded-2xl shadow-lg overflow-hidden border`}
				style={{ paddingTop: '56%' }}
				onClick={() =>
					setActiveItem(prev => (prev === itemNumber ? 0 : itemNumber))
				}
			>
				{activeItem !== itemNumber ? (
					<SVG
						name='playFill'
						classes={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 fill-current w-14 h-14 sm:h-24 sm:w-24 opacity-60 group-hover:opacity-100 z-20 ${
							color === 'blue' ? 'text-blue' : 'text-white'
						}`}
					/>
				) : (
					<>
						<div className='flex items-center justify-center top-0 left-0 right-0 bottom-0 absolute z-10'>
							<div
								className={`${
									color === 'blue' ? 'border-blue' : 'border-white'
								} w-14 h-14 sm:h-14 sm:w-14 border-t-2 border-l-2 animate-spin rounded-full`}
							></div>
						</div>
						<SVG
							name='mute'
							classes='absolute bottom-2 right-2 fill-current text-gray z-30'
						/>
					</>
				)}
				<div
					className={`w-full absolute top-0 left-0 z-20 ${
						activeItem === itemNumber ? 'opacity-100' : 'opacity-0'
					}`}
				>
					<Image
						alt={gifAlt}
						src={gif}
						layout='responsive'
						width={1598}
						height={895}
					/>
				</div>
				<div className={`w-full absolute top-0 left-0`}>
					<Image
						alt={imageAlt}
						src={image}
						layout='responsive'
						width={1598}
						height={895}
					/>
				</div>
			</div>
		</div>
	);
};

const PortfolioSection = () => {
	const [activeItem, setActiveItem] = useState(0);
	return (
		<>
			<h1 className='title'>Portfolio</h1>
			<div className='flex flex-col sm:flex-row items-center w-full mb-0 justify-center max-w-6xl mt-2'>
				{/* <PortfolioItem
					itemNumber={1}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					color='white'
					gifAlt='animated gif of origami.cool web app'
					imageAlt='screenshot of rainbowofemotions.app web app'
					image='/assets/images/origami-screenshot.jpg'
					gif='/assets/gifs/origami.cool.gif'
				/> */}
				<PortfolioItem
					itemNumber={1}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					color='white'
					gifAlt='animated gif of Generations Kampen web app'
					imageAlt='screenshot of Generations Kampen web app'
					image='/assets/images/generations-kampen-screenshot.jpg'
					gif='/assets/gifs/generations-kampen.gif'
				/>
				<PortfolioItem
					itemNumber={2}
					activeItem={activeItem}
					setActiveItem={setActiveItem}
					color='blue'
					gifAlt='animated gif of rainbowofemotions.app web app'
					imageAlt='screenshot of origami.cool web app'
					image='/assets/images/rainbow-screenshot.jpg'
					gif='/assets/gifs/rainbowofemotions.app.gif'
				/>
			</div>
		</>
	);
};

export default PortfolioSection;
