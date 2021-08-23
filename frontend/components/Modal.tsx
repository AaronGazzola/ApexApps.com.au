import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppSelector } from '../redux/hooks';
import SVG from './SVG';

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	classes?: string;
	onClose: () => void;
}

const Modal = (props: ModalProps) => {
	const { isOpen, onClose, classes = '' } = props;
	const [fadeIn, setFadeIn] = useState(false);
	const { breakpoint } = useAppSelector(state => state.utils);

	useEffect(() => {
		setFadeIn(isOpen);
	}, [isOpen]);

	if (isOpen) {
		return (
			<>
				<div
					className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box flex flex-col sm:max-w-xl z-50 h-min w-min overflow-y-auto ${classes}`}
					style={{
						maxHeight: 'calc((var(--vh) * 100) - 40px)',
						minWidth: breakpoint === 'xs' ? 288 : 320
					}}
				>
					<SVG
						name='close'
						classes='absolute top-2 left-2 fill-current text-gray hover:text-red cursor-pointer'
						onClick={onClose}
					/>
					{props.children}
				</div>
				<div
					onClick={onClose}
					className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-dark transition-opacity duration-300 z-40 flex
      ${fadeIn ? 'opacity-75' : 'opacity-0'}`}
				></div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Modal;
