import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	setModal: Dispatch<SetStateAction<boolean>>;
}

const Modal = (props: ModalProps) => {
	const { isOpen, setModal } = props;
	const [fadeIn, setFadeIn] = useState(false);

	useEffect(() => {
		setFadeIn(isOpen);
	}, [isOpen]);

	if (isOpen) {
		return (
			<>
				<div
					className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 box flex flex-col w-72 sm:w-min sm:max-w-xl z-50 h-full'
					style={{ maxHeight: 'calc((var(--vh) * 100) - 40px)' }}
				>
					{props.children}
				</div>
				<div
					onClick={() => setModal(false)}
					className={`fixed top-0 left-0 right-0 bottom-0 bg-gray-dark transition-opacity duration-300 z-40 flex
      ${fadeIn ? 'opacity-50' : 'opacity-0'}`}
				></div>
			</>
		);
	} else {
		return <></>;
	}
};

export default Modal;
