import Tank from './Tank.jsx';
import Tankless from './Tankless.jsx';
import MetalVent from './MetalVent.jsx';
import PvcVent from './PvcVent.jsx';

export default function QuestionCard({question, options, paramKey, step, onSelect, onBack}) {
	return (
		<div className="w-full bg-base-100 py-1 rounded-lg flex flex-col items-center justify-between">
			<h2 className="text-xl font-semibold mb-4 text-center">{question}</h2>
			<form className="flex flex-col gap-4 w-full max-w-md">
				{options.map(({label, value}) => (
					console.log('paramKey', paramKey),
					<label key={value} className="flex items-center justify-between border border-base-300 rounded-lg px-4 py-3 cursor-pointer hover:bg-base-200">
						<div className="flex items-center gap-4">
							{value === 'tank' && <Tank showX={paramKey === 'typeToRemove' ? true : false} />}
							{value === 'tankless' && <Tankless showX={paramKey === 'typeToRemove' ? true : false} />}
							{value === 'metal' && <MetalVent />}
							{value === 'pvc' && <PvcVent />}

							<span className="text-sm font-medium">{label}</span>
						</div>
						<input
							type="radio"
							name={paramKey}
							value={value}
							onChange={() => onSelect(paramKey, value)}
							className="form-radio text-secondary w-5 h-5"
						/>
					</label>
				))}
			</form>

			{step > 1 && (
				<div className="mt-6 flex justify-center">
					<button
						onClick={onBack}
						className="btn btn-sm btn-ghost text-sm text-gray-500"
					>
						← Back
					</button>
				</div>
			)}
		</div>
	);
}
