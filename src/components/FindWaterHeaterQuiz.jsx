import {useEffect, useState} from 'react';
import QuestionCard from './QuestionCard.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import urlHelper from '../lib/urlHelper.js';

const questions = [
	{
		paramKey: 'interest',
		question: '1. Which type of water heater are you interested in?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'}
		],
	},
	{
		paramKey: 'typeToRemove',
		question: '2. What type of water heater will be removed?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'}
		],
	},
	{
		paramKey: 'location',
		question: '3. Where is your water heater located?',
		options: [
			{label: 'Basement', value: 'basement'},
			{label: 'Crawlspace', value: 'crawlspace'},
			{label: 'Closet', value: 'closet'}
		],
	},
	{
		paramKey: 'fuel',
		question: '4. What fuel type does your water heater use?',
		options: [
			{label: 'Natural Gas/Propane', value: 'gas'},
			{label: 'Electric', value: 'electric'},
			{label: 'Fuel Oil', value: 'oil'}
		],
		subQuestion: {
			paramKey: 'vent',
			question: 'How is your water heater vented?',
			options: [
				{label: 'Metal', value: 'metal'},
				{label: 'Plastic', value: 'pvc'}
			],
			shouldShow: (answers) => {
				const fuel = answers.fuel;
				return fuel && fuel === 'gas';
			},
			subQuestion: {
				paramKey: 'chimney',
				question: "How does your water heater's metal vent exit the home?",
				options: [
					{
						label: 'Horizontally into a chimney (brick, cinder block, cement, etc)',
						value: 'chimney',
						hint: '/images/wh-metalVenting.webp',
						hintTitle: 'Horizontal Venting Into Chimney',
						hintText: 'This is a standard natural draft water heater vented horizontally into a masonry chimney. It has a metal vent pipe that runs from the top of the water heater to the chimney. Your water heater may combine its metal vent with your furnace or other metal vent pipes before reaching the chimney—that is perfectly fine.  This is the general idea of what to look for.'
					},
					{
						label: 'Vertically through a metal vent',
						value: 'bVent',
						hint: '/images/wh-bvent.jpeg',
						hintTitle: 'Vertical Metal Venting',
						hintText: 'This is a standard natural draft water heater vented vertically with metal venting. It may connect to a larger metal vent or combine with your furnace or other metal vent pipe and exit together through the ceiling. Your setup may vary, but the place it exits the room is most important.'
					},
					{
						label: "I'd like a pro to assess it",
						value: 'askPro',
						hint: '/images/wh-tech-profile.png',
						hintTitle: 'Get Help From A Pro',
						hintText: 'If you are unsure about your water heater venting we can help! You can text us a few images, join a brief video call, or schedule a free on-site assessment.'
					}
				],
				shouldShow: (answers) => {
					const vent = answers.vent;
					const fuel = answers.fuel;
					return vent && vent === 'metal' || fuel && fuel === 'oil' || fuel && fuel !== 'electric';
				},
			}
		},
	},
	{
		paramKey: 'peak',
		question: 'How many showers are in your home?',
		options: [
			{label: '1', value: '1'},
			{label: '2', value: '2'},
			{label: '3+', value: '3+'}
		]
	}
];

export default function FindWaterHeaterQuiz() {
	const [params, setParams] = useState(() => new URLSearchParams(window.location.search));
	const [step, setStep] = useState(() => parseInt(params.get('step') || '1', 10));

	useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

	const getAnswers = () => Object.fromEntries(params.entries());
	const visibleQuestions = questions.filter(q => !q.shouldShow || q.shouldShow(getAnswers()));
	const steps = visibleQuestions.length;
	const current = visibleQuestions[step - 1];

	useEffect(() => {
		const handlePopState = () => {
			const updated = new URLSearchParams(window.location.search);
			setParams(updated);
			setStep(parseInt(updated.get('step') || '1', 10));
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	const handleAnswer = (paramKey, value, shouldAdvanceStep = true) => {
		const updatedParams = new URLSearchParams(window.location.search);
		const nextStep = shouldAdvanceStep ? step + 1 : step;
		updatedParams.set('step', nextStep);
		updatedParams.set(paramKey, value);

		if (step === 1) {
			window.location.href = `/instant-quote?${updatedParams.toString()}`;
			return;
		}

		window.history.pushState({}, '', `${window.location.pathname}?${updatedParams}`);
		setStep(nextStep);
		setParams(updatedParams);
	};

	const handleBack = () => {
		const prevStep = Math.max(step - 1, 1);
		const updatedParams = new URLSearchParams(window.location.search);

		const allKeys = urlHelper.getAllParamKeys(questions); // flatten paramKeys from all steps
		const keepKeys = urlHelper.getParamKeysUpToStep(questions, prevStep); // only up to previous step
		const keysToRemove = allKeys.filter(k => !keepKeys.includes(k));
		keysToRemove.forEach(key => updatedParams.delete(key));

		updatedParams.set('step', prevStep);
		window.history.pushState({}, '', `${window.location.pathname}?${updatedParams}`);

		setStep(prevStep);
		setParams(updatedParams);
	};

	if (step > steps) {
		return <RecommendationCard params={params} />;
	}

	const safeStep = Math.max(1, Math.min(step, steps));
	const percent = safeStep === 1
		? '3%'
		: `${Math.max(3, Math.min(100, ((safeStep - 1) / (steps - 1)) * 100))}%`;

	return (
		<div className="bg-white rounded-t-sm max-w-4xl mx-auto mt-16">
			{step > steps ? (
				<RecommendationCard params={params} />
			) : (
				<>
					{step > 1 && (
						<div className="flex -mt-8">
							<button
								className="px-0 btn btn-sm btn-ghost text-sm text-gray-500"
								onClick={handleBack}
							>
								← Back
							</button>
						</div>
					)}
					<div className="flex items-center w-full bg-primary/10 h-4 rounded-t-sm">
						<div
							className="bg-primary h-4 transition-all duration-300 ease-in-out rounded-t-sm"
							style={{width: `${percent}`}}
						/>
					</div>
					<div key={step} className="animate-fade-it-in shadow p-6 pt-2">
						<p className=" text-sm text-gray-500 text-center font-bold mx-auto">Instant Quote: Step {step} of {steps}</p>
						<div className="text-center">
							{step === 1 && (
								<p className="text-sm text-gray-500 mb-2">No email required.</p>
							)}
						</div>
						<QuestionCard
							client:visible
							question={current.question}
							options={current.options}
							paramKey={current.paramKey}
							step={step}
							subQuestion={current.subQuestion}
							params={params}
							onSelect={handleAnswer}
							onBack={handleBack}
						/>
					</div>
				</>
			)}
		</div>
	);
}
