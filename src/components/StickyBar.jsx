// StickyBar.jsx
import {useEffect, useState} from 'react';

export default function StickyBar({selectedModel, onConfirmClick}) {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (selectedModel) {
			// Delay to trigger the transition after render
			setTimeout(() => setShowButton(true), 250);
		} else {
			setShowButton(false);
		}
	}, [selectedModel]);

	return (
		<div className="fixed top-[64px] left-0 right-0 z-50 bg-primary text-white font-bold transition-all ease-in-out duration-500">
			<div className="flex flex-col items-center text-center px-4 py-4 sm:p-6">
				<p className="text-sm sm:text-xl">
					{selectedModel ? "You're almost done!" : 'Please Choose A Model'}
				</p>

				<div
					className={`transition-all duration-750 overflow-hidden ${
						showButton ? 'max-h-32 mt-4' : 'max-h-0'
					}`}
				>
					<button
						className="btn btn-outline bg-white checked:bg-white text-primary font-bold w-full max-w-96 text-lg py-6 animate-pulse"
						onClick={onConfirmClick}
					>
						Confirm Your System
					</button>
				</div>
			</div>
		</div>
	);
}
