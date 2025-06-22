import {useEffect, useState} from 'react';
import QuestionCard from './QuestionCard.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import Tank from './Tank.jsx';
import Tankless from './Tankless.jsx';

const questions = [
	{
		paramKey: 'interest',
		question: 'Which type of water heater do you want?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'}
		],
	},
	{
		paramKey: 'currentType',
		question: 'What type of water heater is being removed?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'},
		],
	},
	{
		paramKey: 'fuel',
		question: 'What fuel type does your water heater use?',
		options: [
			{label: 'Natural Gas/Propane', value: 'gas'},
			{label: 'Electric', value: 'electric'},
			{label: 'Fuel Oil', value: 'oil'},
		]
	},
	{
		paramKey: 'vent',
		question: 'How is your water heater vented?',
		options: [
			{label: 'Metal', value: 'metal'},
			{label: 'Plastic', value: 'pvc'},
		]
	},
	{
		paramKey: 'peak',
		question: 'How many showers are in your home?',
		options: [
			{label: '1', value: '1'},
			{label: '2', value: '2'},
			{label: '3+', value: '3+'},
		]
	}
];

export default function FindWaterHeaterQuiz() {
	const [params, setParams] = useState(() => new URLSearchParams(window.location.search));
	const [step, setStep] = useState(() => parseInt(params.get('step') || '1', 10));
	// const [steps, setSteps] = useState(questions.length);
	const [tankIsActive, setTankIsActive] = useState(false);

	const steps = questions.length;
	useEffect(() => {
		const handlePopState = () => {
			const updated = new URLSearchParams(window.location.search);
			setParams(updated);
			setStep(parseInt(updated.get('step') || '1', 10));
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

const handleAnswer = (paramKey, value) => {
	const updatedParams = new URLSearchParams(window.location.search);
	updatedParams.set(paramKey, value);

	const nextStep = step + 1;
	updatedParams.set('step', nextStep);

	// Redirect to /instant-quote after first answer
	if (step === 1) {
		window.location.href = `/instant-quote?${updatedParams.toString()}`;
		return;
	}

	// Otherwise, stay on page
	window.history.pushState({}, '', `${window.location.pathname}?${updatedParams}`);
	setParams(updatedParams);
	setStep(nextStep);
};
	const handleBack = () => {
		const prevStep = Math.max(step - 1, 1);
		const updatedParams = new URLSearchParams(window.location.search);
		updatedParams.set('step', prevStep);
		window.history.pushState({}, '', `${window.location.pathname}?${updatedParams}`);
		setParams(updatedParams);
		setStep(prevStep);
	};

	if (step > questions.length) {
		return <RecommendationCard params={params} />;
	}

	const safeStep = Math.max(1, Math.min(step, steps));
	const percent = safeStep === 1
		? '3%'
		: `${Math.max(3, Math.min(100, ((safeStep - 1) / (steps - 1)) * 100))}%`;

	const current = questions[step - 1];

	return (
		<div className="bg-white rounded-t-sm">
			{step && step > questions.length ? (
				<RecommendationCard params={params} />
			) : (
				<>
					<div className="flex items-center w-full bg-secondary/10 h-4 ">
						<div
							className="bg-primary h-4 transition-all duration-300 ease-in-out rounded-t-sm"
							style={{width: `${percent}`}}
						/>
					</div>
					<p className=" text-sm text-gray-500 text-center font-bold mx-auto">Instant Quote: Step {step} of {steps}</p>

					<div key={step} className="animate-fade-it-in shadow p-6 pt-2">
					<div className="text-center">
						{step === 1 && (
							<p className="text-sm text-gray-500 mb-2">No email required.</p>
						)}

					</div>
						<QuestionCard
							question={current.question}
							options={current.options}
							paramKey={current.paramKey}
							step={step}
							subOptions={current.subOptions}
							steps={steps}
							onSelect={handleAnswer}
							onBack={handleBack}
						/></div>
				</>
			)}
		</div>
	);
}
