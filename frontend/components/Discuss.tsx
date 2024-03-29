import React from 'react';
import { Keyframes } from './Keyframes';

interface DiscussProps {
	animate: boolean;
	classes?: string;
}

const Discuss = (props: DiscussProps) => {
	const { animate, classes = '' } = props;

	return (
		<>
			<Keyframes
				name='discuss1In'
				from={{ strokeDasharray: 1045, strokeDashoffset: 1045 }}
				to={{ strokeDasharray: 1045, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss1Out'
				from={{ strokeDasharray: 1045, strokeDashoffset: 0 }}
				to={{ strokeDasharray: 1045, strokeDashoffset: 1045 }}
			/>
			<Keyframes
				name='discuss2In'
				from={{ strokeDasharray: 1580, strokeDashoffset: 1580 }}
				to={{ strokeDasharray: 1580, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss2Out'
				from={{ strokeDasharray: 1580, strokeDashoffset: 0 }}
				to={{ strokeDasharray: 1580, strokeDashoffset: 1580 }}
			/>
			<Keyframes
				name='discuss3In'
				_0={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_80={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_100={{ strokeDasharray: 70, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss3Out'
				_0={{ strokeDasharray: 70, strokeDashoffset: 0 }}
				_20={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_100={{ strokeDasharray: 70, strokeDashoffset: 70 }}
			/>
			<Keyframes
				name='discuss4In'
				_0={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_30={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_100={{ strokeDasharray: 815, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss4Out'
				_0={{ strokeDasharray: 815, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_100={{ strokeDasharray: 815, strokeDashoffset: 815 }}
			/>
			<Keyframes
				name='discuss5In'
				_0={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_30={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_100={{ strokeDasharray: 815, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss5Out'
				_0={{ strokeDasharray: 815, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 815, strokeDashoffset: 815 }}
				_100={{ strokeDasharray: 815, strokeDashoffset: 815 }}
			/>
			<Keyframes
				name='discuss6In'
				_0={{ strokeDasharray: 215, strokeDashoffset: 215 }}
				_80={{ strokeDasharray: 215, strokeDashoffset: 215 }}
				_100={{ strokeDasharray: 215, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss6Out'
				_0={{ strokeDasharray: 215, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 215, strokeDashoffset: 215 }}
				_100={{ strokeDasharray: 215, strokeDashoffset: 215 }}
			/>
			<Keyframes
				name='discuss7In'
				_0={{ strokeDasharray: 315, strokeDashoffset: 315 }}
				_60={{ strokeDasharray: 315, strokeDashoffset: 315 }}
				_80={{ strokeDasharray: 315, strokeDashoffset: 0 }}
				_100={{ strokeDasharray: 315, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss7Out'
				_0={{ strokeDasharray: 315, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 315, strokeDashoffset: 315 }}
				_100={{ strokeDasharray: 315, strokeDashoffset: 315 }}
			/>
			<Keyframes
				name='discuss8In'
				_0={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_70={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_80={{ strokeDasharray: 70, strokeDashoffset: 0 }}
				_100={{ strokeDasharray: 70, strokeDashoffset: 0 }}
			/>
			<Keyframes
				name='discuss8Out'
				_0={{ strokeDasharray: 70, strokeDashoffset: 0 }}
				_70={{ strokeDasharray: 70, strokeDashoffset: 70 }}
				_100={{ strokeDasharray: 70, strokeDashoffset: 70 }}
			/>
			<svg
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				viewBox='-4 -4 520 520'
				className={`$${classes}`}
				style={{
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					maxWidth: 200,
					width: '100%',
					height: '100%',
					stroke: '#4785C2',
					fill: 'none',
					strokeWidth: 10
				}}
			>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss1In 1s linear forwards'
									: 'discuss1Out 1s linear forwards'
							}}
							d='M181.72,366.814c-0.723-0.206-1.463-0.322-2.208-0.362c10.954-11.513,17.7-27.066,17.7-44.174v-52.611
				c0-0.481-0.046-0.95-0.111-1.412c0.066-0.95,0.111-1.906,0.111-2.872v-33.286c0-5.523-4.477-10-10-10h-67.073
				c-28.245,0-51.223,22.979-51.223,51.223v48.958c0,17.108,6.745,32.661,17.7,44.174c-0.744,0.04-1.484,0.156-2.206,0.362
				C37.153,371.093,0,410.924,0,459.276V502c0,5.523,4.477,10,10,10h246.127c5.523,0,10-4.477,10-10v-42.724
				C266.127,410.925,228.976,371.094,181.72,366.814z M88.916,286.001v-12.682c0-17.216,14.007-31.223,31.223-31.223h57.073v23.286
				c0,11.723-9.537,21.26-21.26,21.26H88.916V286.001z M88.916,306.642h67.036c7.772,0,15.047-2.162,21.26-5.914v21.549
				c0,24.343-19.805,44.148-44.148,44.148c-24.343,0-44.148-19.805-44.148-44.148V306.642z M154.829,386.426l-21.765,21.766
				l-21.765-21.766H154.829z M246.128,492L246.128,492H20v-20h41.5c5.523,0,10-4.477,10-10s-4.477-10-10-10H20.365
				c3.359-33.716,29.806-60.717,63.255-64.969l42.373,42.373c1.875,1.875,4.419,2.929,7.071,2.929c2.652,0,5.196-1.054,7.071-2.929
				l42.373-42.373c35.824,4.553,63.62,35.204,63.62,72.245V492z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss2In 1s linear forwards'
									: 'discuss2Out 1s linear forwards'
							}}
							d='M427.595,144.718c-0.723-0.206-1.464-0.322-2.21-0.362c10.954-11.513,17.699-27.066,17.699-44.174V47.57
				c0-0.481-0.046-0.95-0.111-1.412c0.066-0.95,0.111-1.906,0.111-2.872V10c0-5.523-4.477-10-10-10h-67.073
				c-28.245,0-51.223,22.979-51.223,51.223v48.958c0,17.108,6.745,32.661,17.699,44.174c-0.745,0.04-1.487,0.156-2.21,0.362
				c-47.255,4.281-84.405,44.112-84.405,92.462v42.723c0,5.523,4.477,10,10,10h80.46c5.523,0,10-4.477,10-10s-4.477-10-10-10h-70.46
				V237.18c0-37.041,27.795-67.692,63.619-72.245l42.373,42.373c1.953,1.953,4.512,2.929,7.071,2.929s5.119-0.976,7.071-2.929
				l42.373-42.373C464.205,169.489,492,200.139,492,237.18v32.723h-73.667c-5.523,0-10,4.477-10,10s4.477,10,10,10H502
				c5.523,0,10-4.477,10-10V237.18C512,188.83,474.849,148.999,427.595,144.718z M378.937,186.095l-21.765-21.765h43.53
				L378.937,186.095z M423.085,100.181c0,24.343-19.805,44.148-44.148,44.148s-44.148-19.804-44.148-44.147V84.546h67.036
				c7.772,0,15.047-2.163,21.26-5.914V100.181z M423.085,43.286c0,11.723-9.537,21.26-21.26,21.26h-67.036v-0.641V51.223
				c0-17.216,14.007-31.223,31.223-31.223h57.073V43.286z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss3In 1s linear forwards'
									: 'discuss3Out 1s linear forwards'
							}}
							d='M386.01,272.83c-1.86-1.86-4.44-2.93-7.07-2.93c-2.64,0-5.21,1.07-7.07,2.93c-1.87,1.86-2.93,4.44-2.93,7.07
				c0,2.64,1.06,5.21,2.93,7.07c1.86,1.87,4.43,2.93,7.07,2.93c2.63,0,5.21-1.06,7.07-2.93c1.86-1.86,2.93-4.43,2.93-7.07
				C388.94,277.27,387.87,274.69,386.01,272.83z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss4In 1s linear forwards'
									: 'discuss4Out 1s linear forwards'
							}}
							d='M267.405,139.929l-41.821-41.821V50c0-27.57-22.43-50-50-50H50C22.43,0,0,22.43,0,50v88c0,27.57,22.43,50,50,50h125.583
				c20.674,0,38.702-12.407,46.266-31h38.484c4.044,0,7.691-2.437,9.239-6.173C271.12,147.091,270.264,142.789,267.405,139.929z
				 M214.554,137c-4.659,0-8.701,3.217-9.746,7.758C201.66,158.442,189.643,168,175.583,168H50c-16.542,0-30-13.458-30-30V50
				c0-16.542,13.458-30,30-30h125.583c16.542,0,30,13.458,30,30v52.25c0,2.652,1.054,5.196,2.929,7.071L236.191,137H214.554z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss5In 1s linear forwards'
									: 'discuss5Out 1s linear forwards'
							}}
							d='M462,324H336.417c-20.674,0-38.702,12.407-46.266,31h-38.484c-4.044,0-7.691,2.437-9.239,6.173
				c-1.548,3.736-0.692,8.038,2.167,10.898l41.821,41.821V462c0,27.57,22.43,50,50,50H462c27.57,0,50-22.43,50-50v-88
				C512,346.43,489.57,324,462,324z M492,462c0,16.542-13.458,30-30,30H336.417c-16.542,0-30-13.458-30-30v-52.25
				c0-2.652-1.054-5.196-2.929-7.071L275.809,375h21.637c4.659,0,8.701-3.217,9.746-7.758C310.34,353.558,322.357,344,336.417,344
				H462c16.542,0,30,13.458,30,30V462z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss6In 1s linear forwards'
									: 'discuss6Out 1s linear forwards'
							}}
							d='M444.156,391.392c-3.904-3.905-10.236-3.905-14.141,0l-26.583,26.583l-12.361-12.361c-3.905-3.905-10.237-3.905-14.143,0
				c-3.905,3.905-3.905,10.237,0,14.143l19.432,19.432c1.953,1.953,4.512,2.929,7.071,2.929s5.119-0.976,7.071-2.929l33.654-33.654
				C448.061,401.63,448.061,395.298,444.156,391.392z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss7In 1s linear forwards'
									: 'discuss7Out 1s linear forwards'
							}}
							d='M158.253,66.268c-1.182-17.147-15.004-30.969-32.151-32.151c-9.723-0.669-18.991,2.611-26.091,9.239
				c-7.001,6.535-11.017,15.775-11.017,25.349c0.001,5.524,4.478,10.001,10.001,10.001s10-4.477,10-10
				c0-4.111,1.656-7.921,4.664-10.729c3.003-2.804,6.938-4.196,11.069-3.906c7.239,0.499,13.074,6.334,13.573,13.573
				c0.505,7.319-4.293,13.787-11.408,15.379c-7.788,1.742-13.227,8.513-13.227,16.465v5.335c0,5.523,4.477,10,10,10s10-4.477,10-10
				v-2.91C149.16,97.291,159.385,82.684,158.253,66.268z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss8In 1s linear forwards'
									: 'discuss8Out 1s linear forwards'
							}}
							d='M130.74,136.02c-1.86-1.86-4.44-2.93-7.07-2.93c-2.64,0-5.21,1.07-7.07,2.93c-1.87,1.86-2.93,4.44-2.93,7.07
				s1.06,5.21,2.93,7.07c1.86,1.86,4.43,2.93,7.07,2.93c2.63,0,5.21-1.07,7.07-2.93c1.86-1.86,2.93-4.44,2.93-7.07
				S132.6,137.88,130.74,136.02z'
						/>
					</g>
				</g>
				<g>
					<g>
						<path
							style={{
								animation: animate
									? 'discuss3In 1s linear forwards'
									: 'discuss3Out 1s linear forwards'
							}}
							d='M108.57,454.93c-1.86-1.86-4.44-2.93-7.07-2.93s-5.21,1.07-7.07,2.93s-2.93,4.44-2.93,7.07s1.07,5.21,2.93,7.07
				c1.86,1.86,4.44,2.93,7.07,2.93s5.21-1.07,7.07-2.93s2.93-4.44,2.93-7.07S110.43,456.79,108.57,454.93z'
						/>
					</g>
				</g>
			</svg>
		</>
	);
};

export default Discuss;
