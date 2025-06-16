export default function QuestionCard({question, options, paramKey, step, steps, onSelect, onBack}) {
	return (
		<>
			<div className="w-full bg-base-100 p-6 pb-1 rounded-lg flex flex-col items-center justify-between">
				<div>
					<h2 className="flex justify-center text-xl font-semibold mb-4">{question}</h2>
					<div className="flex flex-col gap-3 justify-center max-w-64 mx-auto">
						{options.map(({label, value}) => (
							<button
								key={value}
								onClick={() => onSelect(paramKey, value)}
								className="btn btn-outline h-fit min-h-10 py-2 "
							>
								{label}
							</button>
						))}
					</div>

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
				<div className="mt-6 text-center">
					<p className="text-sm text-gray-500">Step {step} of {steps}</p>
				</div>
			</div>
		</>
	);
}
