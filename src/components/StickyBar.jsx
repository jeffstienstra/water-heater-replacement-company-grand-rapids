// StickyBar.jsx
export default function StickyBar({selectedModel, onConfirmClick}) {
	return (
		<div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-6 bg-primary text-white font-bold">
			<div className="flex flex-col items-center text-center space-y-2">
				<p className="">
					{selectedModel ? "You're almost there!" : 'Please Choose A Water Heater'}
				</p>
				<button
					className={`btn btn-outline max-w-96 bg-white text-primary font-bold w-full ${selectedModel ? 'animate-pulse' : ''}`}
					disabled={!selectedModel}
					onClick={onConfirmClick}
				>
					Confirm System
				</button>
			</div>
		</div>
	);
}
