import React from 'react';
import { Keyframes } from './Keyframes';

interface DevelopProps {
	animate: boolean;
	classes?: string;
}

const Develop = (props: DevelopProps) => {
	const { animate, classes = '' } = props;

	return (
		<>
			<Keyframes
				name='develop1In'
				_0={{ strokeDasharray: 280, strokeDashoffset: 280 }}
				_100={{ strokeDasharray: 280, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop1Out'
				_0={{ strokeDasharray: 280, strokeDashoffset: 0 }}
				_100={{ strokeDasharray: 280, strokeDashoffset: 280 }}
			/>
			<Keyframes
				name='develop2In'
				_0={{ strokeDasharray: 280, strokeDashoffset: 280 }}
				_30={{ strokeDasharray: 280, strokeDashoffset: 280 }}
				_100={{ strokeDasharray: 280, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop2Out'
				_0={{ strokeDasharray: 280, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 280, strokeDashoffset: 280 }}
				_100={{ strokeDasharray: 280, strokeDashoffset: 280 }}
			/>
			<Keyframes
				name='develop3In'
				_0={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_70={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_100={{ strokeDasharray: 30, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop3Out'
				_0={{ strokeDasharray: 30, strokeDashoffset: 0 }}
				_30={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_100={{ strokeDasharray: 30, strokeDashoffset: 30 }}
			/>
			<Keyframes
				name='develop4In'
				_0={{ strokeDasharray: 55, strokeDashoffset: 55 }}
				_70={{ strokeDasharray: 55, strokeDashoffset: 55 }}
				_100={{ strokeDasharray: 55, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop4Out'
				_0={{ strokeDasharray: 55, strokeDashoffset: 0 }}
				_30={{ strokeDasharray: 55, strokeDashoffset: 55 }}
				_100={{ strokeDasharray: 55, strokeDashoffset: 55 }}
			/>
			<Keyframes
				name='develop5In'
				_0={{ strokeDasharray: 65, strokeDashoffset: 65 }}
				_50={{ strokeDasharray: 65, strokeDashoffset: 65 }}
				_100={{ strokeDasharray: 65, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop5Out'
				_0={{ strokeDasharray: 65, strokeDashoffset: 0 }}
				_50={{ strokeDasharray: 65, strokeDashoffset: 65 }}
				_100={{ strokeDasharray: 65, strokeDashoffset: 65 }}
			/>
			<Keyframes
				name='develop6In'
				_0={{ strokeDasharray: 75, strokeDashoffset: 75 }}
				_50={{ strokeDasharray: 75, strokeDashoffset: 75 }}
				_100={{ strokeDasharray: 75, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop6Out'
				_0={{ strokeDasharray: 75, strokeDashoffset: 0 }}
				_50={{ strokeDasharray: 75, strokeDashoffset: 75 }}
				_100={{ strokeDasharray: 75, strokeDashoffset: 75 }}
			/>
			<Keyframes
				name='develop7In'
				_0={{ strokeDasharray: 50, strokeDashoffset: 50 }}
				_50={{ strokeDasharray: 50, strokeDashoffset: 50 }}
				_100={{ strokeDasharray: 50, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop7Out'
				_0={{ strokeDasharray: 50, strokeDashoffset: 0 }}
				_50={{ strokeDasharray: 50, strokeDashoffset: 50 }}
				_100={{ strokeDasharray: 50, strokeDashoffset: 50 }}
			/>
			<Keyframes
				name='develop8In'
				_0={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_60={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_80={{ strokeDasharray: 30, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop8Out'
				_0={{ strokeDasharray: 30, strokeDashoffset: 0 }}
				_50={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_100={{ strokeDasharray: 30, strokeDashoffset: 30 }}
			/>
			<Keyframes
				name='develop9In'
				_0={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_80={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_100={{ strokeDasharray: 30, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='develop9Out'
				_0={{ strokeDasharray: 30, strokeDashoffset: 0 }}
				_50={{ strokeDasharray: 30, strokeDashoffset: 30 }}
				_100={{ strokeDasharray: 30, strokeDashoffset: 30 }}
			/>

			<svg
				id='Icons'
				viewBox='0 0 74 74'
				xmlns='http://www.w3.org/2000/svg'
				style={{
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					maxWidth: 200,
					width: '100%',
					height: '100%',
					stroke: '#4785C2',
					fill: 'none',
					strokeWidth: 1.5
				}}
			>
				<path
					style={{
						animation: animate
							? 'develop1In 1s linear forwards'
							: 'develop1Out 1s linear forwards'
					}}
					d='m69 72h-64a3 3 0 0 1 -3-3v-64a3 3 0 0 1 3-3h64a3 3 0 0 1 3 3v64a3 3 0 0 1 -3 3zm-64-68a1 1 0 0 0 -1 1v64a1 1 0 0 0 1 1h64a1 1 0 0 0 1-1v-64a1 1 0 0 0 -1-1z'
				/>
				<path
					style={{
						animation: animate
							? 'develop2In 1s linear forwards'
							: 'develop2Out 1s linear forwards'
					}}
					d='m71 20h-68a1 1 0 0 1 0-2h68a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop3In 1s linear forwards'
							: 'develop3Out 1s linear forwards'
					}}
					d='m62.25 14.688a3.688 3.688 0 1 1 3.688-3.688 3.692 3.692 0 0 1 -3.688 3.688zm0-5.375a1.688 1.688 0 1 0 1.688 1.687 1.688 1.688 0 0 0 -1.688-1.687z'
				/>
				<path
					style={{
						animation: animate
							? 'develop3In 1s linear forwards'
							: 'develop3Out 1s linear forwards'
					}}
					d='m51.563 14.688a3.688 3.688 0 1 1 3.687-3.688 3.692 3.692 0 0 1 -3.687 3.688zm0-5.375a1.688 1.688 0 1 0 1.687 1.687 1.689 1.689 0 0 0 -1.687-1.687z'
				/>
				<path
					style={{
						animation: animate
							? 'develop3In 1s linear forwards'
							: 'develop3Out 1s linear forwards'
					}}
					d='m40.875 14.688a3.688 3.688 0 1 1 3.688-3.688 3.692 3.692 0 0 1 -3.688 3.688zm0-5.375a1.688 1.688 0 1 0 1.688 1.687 1.688 1.688 0 0 0 -1.688-1.687z'
				/>
				<path
					style={{
						animation: animate
							? 'develop4In 1s linear forwards'
							: 'develop4Out 1s linear forwards'
					}}
					d='m30.563 12.094h-21.5a1 1 0 0 1 0-2h21.5a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop5In 1s linear forwards'
							: 'develop5Out 1s linear forwards'
					}}
					d='m24.25 41.547h-12.562a1 1 0 0 1 -1-1v-12.563a1 1 0 0 1 1-1h12.562a1 1 0 0 1 1 1v12.563a1 1 0 0 1 -1 1zm-11.562-2h10.562v-10.563h-10.562z'
				/>
				<path
					style={{
						animation: animate
							? 'develop6In 1s linear forwards'
							: 'develop6Out 1s linear forwards'
					}}
					d='m62.313 31.766h-30.625a1 1 0 1 1 0-2h30.625a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop7In 1s linear forwards'
							: 'develop7Out 1s linear forwards'
					}}
					d='m49.563 38.766h-17.875a1 1 0 1 1 0-2h17.875a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop5In 1s linear forwards'
							: 'develop5Out 1s linear forwards'
					}}
					d='m24.25 62.766h-12.562a1 1 0 0 1 -1-1v-12.566a1 1 0 0 1 1-1h12.562a1 1 0 0 1 1 1v12.566a1 1 0 0 1 -1 1zm-11.562-2h10.562v-10.566h-10.562z'
				/>
				<path
					style={{
						animation: animate
							? 'develop6In 1s linear forwards'
							: 'develop6Out 1s linear forwards'
					}}
					d='m62.313 52.984h-30.625a1 1 0 1 1 0-2h30.625a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop7In 1s linear forwards'
							: 'develop7Out 1s linear forwards'
					}}
					d='m49.563 59.984h-17.875a1 1 0 1 1 0-2h17.875a1 1 0 0 1 0 2z'
				/>
				<path
					style={{
						animation: animate
							? 'develop8In 1s linear forwards'
							: 'develop8Out 1s linear forwards'
					}}
					d='m16.541 37.568a1 1 0 0 1 -.707-.293l-1.75-1.75a1 1 0 0 1 1.416-1.414l1.043 1.043 3.9-3.9a1 1 0 0 1 1.415 1.414l-4.605 4.6a1 1 0 0 1 -.712.3z'
				/>
				<path
					style={{
						animation: animate
							? 'develop9In 1s linear forwards'
							: 'develop9Out 1s linear forwards'
					}}
					d='m16.541 58.787a1 1 0 0 1 -.707-.293l-1.75-1.75a1 1 0 0 1 1.416-1.414l1.043 1.043 3.9-3.9a1 1 0 0 1 1.415 1.414l-4.605 4.6a1 1 0 0 1 -.712.3z'
				/>
			</svg>
		</>
	);
};

export default Develop;
