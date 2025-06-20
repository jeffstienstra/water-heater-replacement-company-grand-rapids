import {useEffect, useState} from 'react';
import QuestionCard from './QuestionCard.jsx';
import RecommendationCard from './RecommendationCard.jsx';

const questions = [
	{
		paramKey: 'currentType',
		question: 'What type of water heater do you currently have?',
		options: [
			{label: 'Standard Tank (most common)', value: 'tank'},
			{label: 'Tankless/On-Demand (usually wall-mounted)', value: 'tankless'}
		],
	},
	{
		paramKey: 'fuel',
		question: 'What fuel type does your current water heater use?',
		options: [
			{label: 'Natural Gas', value: 'gas'},
			{label: 'Electric', value: 'electric'},
			{label: 'Propane', value: 'propane'},
			{label: 'Not sure', value: 'unsure'}
		]
	},
	{
		paramKey: 'vent',
		question: 'What type of vent is on top?',
		options: [
			{label: 'Metal', value: 'metal'},
			{label: 'PVC', value: 'pvc'},
		]
	},
	{
		paramKey: 'peak',
		question: 'How many showers are in your home?',
		options: [
			{label: '1', value: '1'},
			{label: '2', value: '2'},
			{label: '3 or more', value: '3+'}
		]
	}
];

export default function FindWaterHeaterQuiz() {
	const [params, setParams] = useState(() => new URLSearchParams(window.location.search));
	const [step, setStep] = useState(() => parseInt(params.get('step') || '1', 10));
	const [steps, setSteps] = useState(questions.length);
	const [title, setTitle] = useState('Find Your Perfect Water Heater');

	useEffect(() => {
		const handlePopState = () => {
			const updated = new URLSearchParams(window.location.search);
			setParams(updated);
			setStep(parseInt(updated.get('step') || '1', 10));
			setSteps(parseInt(updated.get('step') || '1', 10));
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const handleAnswer = (paramKey, value) => {
		const updatedParams = new URLSearchParams(window.location.search);
		updatedParams.set(paramKey, value);
		const nextStep = step + 1;
		updatedParams.set('step', nextStep);
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

	const current = questions[step - 1];

	return (
		<div className="flex flex-col justify-center mx-auto max-w-3xl">
			{step && step > questions.length ? (
				<RecommendationCard params={params} />
			) : (
				<>
					<div className="w-full bg-primary/10 rounded-t-sm h-2.5">
						<div
							className="bg-primary h-2.5 rounded-t-sm transition-all duration-300 ease-in-out"
							style={{width: `${((step - 1) / steps) * 100}%`}}
						/>
					</div>
					<div key={step} className="animate-fade-it-in shadow">
						<QuestionCard
							question={current.question}
							options={current.options}
							paramKey={current.paramKey}
							step={step}
							subOptions={current.subOptions}
							steps={steps}
							onSelect={handleAnswer}
							onBack={handleBack}
						/>
					</div>
				</>
			)}
		</div>
	);
}
