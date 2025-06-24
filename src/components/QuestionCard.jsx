import {useState} from 'react';
import Tank from './Tank.jsx';
import Tankless from './Tankless.jsx';
import MetalVent from './MetalVent.jsx';
import PvcVent from './PvcVent.jsx';
import QuestionMark from './icons/QuestionMark.jsx';

export default function QuestionCard({question, options, paramKey, step, onSelect, onBack}) {
	const [hintToShow, setHintToShow] = useState(null);

	return (
		<div className="w-full bg-base-100 py-1 rounded-b-lg flex flex-col items-center justify-between relative">
			<h2 className="text-xl font-semibold mb-4 text-center">{question}</h2>
			<form className="flex flex-col gap-4 w-full max-w-md">
				{options.map(({label, value, hint, hintText, hintTitle}) => (
					<div
						key={value}
						className="flex items-center  border border-base-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-base-200"
						onClick={() => onSelect(paramKey, value)}
						tabIndex={0}
						role="radio"
					>
						{hint && (
						<button
							type="button"
							onClick={e => {
							e.stopPropagation();
							setHintToShow({image: hint, text: hintText, title: hintTitle});
							}}
							className="text-gray-400 hover:text-primary transition"
							aria-label="View hint"
						>
							<QuestionMark className='text-primary' invert={true}/>
						</button>
						)}
						<div className="">
							{value === 'tank' && <Tank showX={paramKey === 'typeToRemove'} />}
							{value === 'tankless' && <Tankless showX={paramKey === 'typeToRemove'} />}
							{value === 'metal' && <MetalVent />}
							{value === 'pvc' && <PvcVent />}
						</div>
						<span className="text-sm w-full px-4 font-medium">{label}</span>
						<input
							type="radio"
							name={paramKey}
							value={value}
							onChange={() => onSelect(paramKey, value)}
							className="form-radio text-secondary h-5 min-w-5"
							onClick={e => e.stopPropagation()} // Prevent double firing
						/>
					</div>
					))}
				<button
					className='btn btn-ghost w-fit mx-auto text-gray-500'
					onClick={(e) => {
						e.preventDefault();
						onSelect(paramKey, 'unsure');
					}}>
					I don't know
				</button>
			</form>

			{/* Hint Popup */}
			{hintToShow && (
				<div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4" onClick={() => setHintToShow(null)}>
					<div className="bg-white rounded-sm shadow-xl max-w-md w-full relative p-4" onClick={(e) => e.stopPropagation()}>
						<button onClick={() => setHintToShow(null)} className="px-3 py-2 absolute top-0 right-0 rounded-sm text-gray-400 hover:bg-gray-200">
							X
						</button>
						{hintToShow.title && (
							<h3 className="text-lg font-semibold mb-2 text-center">{hintToShow.title}</h3>
						)}
						{hintToShow.text && (
							<p className="mb-4 text-sm text-gray-700 text-center">{hintToShow.text}</p>
						)}
						<img src={hintToShow.image} alt="Hint" className="rounded-md max-w-full h-auto mx-auto" />
					</div>
				</div>
			)}
		</div>
	);
}
