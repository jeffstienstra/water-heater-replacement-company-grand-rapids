import {useEffect, useState} from 'react';
import QuestionCard from './QuestionCard.jsx';
import RecommendationCard from './RecommendationCard.jsx';
import urlHelper from '../lib/urlHelper.js';
import questions from '../data/questions.js';

function migrateLegacyParams(search) {
	const updated = new URLSearchParams(search);
	let didChange = false;

	if (updated.has('homeType')) {
		if (!updated.has('isMobileHome')) {
			updated.set('isMobileHome', updated.get('homeType') === 'mobileHome' ? 'true' : 'false');
		}
		updated.delete('homeType');
		didChange = true;
	}

	return { updated, didChange };
}

export default function FindWaterHeaterQuiz({ imageMap = {} }) {
	const [params, setParams] = useState(() => migrateLegacyParams(window.location.search).updated);
	const [step, setStep] = useState(() => parseInt(params.get('step') || '1', 10));
	const [loadingResults, setLoadingResults] = useState(true);

	useEffect(() => {
		const { updated, didChange } = migrateLegacyParams(window.location.search);
		if (didChange) {
			window.history.replaceState({}, '', `${window.location.pathname}?${updated.toString()}`);
			setParams(updated);
			setStep(parseInt(updated.get('step') || '1', 10));
		}
	}, []);

	useEffect(() => {
        // If we arrived with a hash (e.g. #how-it-works) we want to allow client components
        // (like this quiz) to mount and settle layout, then re-scroll to that anchor.
        if (!window.location.hash) return;

        // wait one frame (or a little longer) so the quiz and other client-only components finish rendering
        requestAnimationFrame(() => {
            // small extra delay to handle images/animations/layout shifts
            setTimeout(() => {
                const el = document.querySelector(window.location.hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 50);
        });
    }, []);

	const getAnswers = () => Object.fromEntries(params.entries());
	const visibleQuestions = questions.filter(q => !q.shouldShow || q.shouldShow(getAnswers()));
	const steps = visibleQuestions.length;
	const current = visibleQuestions[step - 1];

	useEffect(() => {
		const handlePopState = () => {
			const { updated, didChange } = migrateLegacyParams(window.location.search);
			if (didChange) {
				window.history.replaceState({}, '', `${window.location.pathname}?${updated.toString()}`);
			}
			setParams(updated);
			setStep(parseInt(updated.get('step') || '1', 10));
		};
		window.addEventListener('popstate', handlePopState);
		return () => window.removeEventListener('popstate', handlePopState);
	}, []);

	useEffect(() => {
		if (step > steps) {
			// TODO: report results page loaded to cloudflare KV analytics here

			setLoadingResults(true);
			const timeout = setTimeout(() => setLoadingResults(false), 1000 + Math.random() * 2000); // 2–4s
			return () => clearTimeout(timeout);
		}
	}, [step]);

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

	const safeStep = Math.max(1, Math.min(step, steps));
	const percent = safeStep === 1
		? '3%'
		: `${Math.max(3, Math.min(100, ((safeStep - 1) / (steps - 1)) * 100))}%`;

		return (
		<div className={`bg-white w-full ${!params.get('step') && 'pt-0 px-0'} ${step <= steps && 'pt-12 px-2 max-w-4xl mx-auto mt-16'} ${step > steps && 'pt-12'} `}>
			{step > steps ? (
				loadingResults ? (
					<div className="flex flex-col items-center justify-center py-20">
						<span className="loading loading-spinner text-primary w-12 h-12 mb-4" />
						<p className="text-sm text-gray-500">Calculating your best options...</p>
					</div>
				) : (
					<>
						<RecommendationCard params={params} imageMap={imageMap} />
					</>
				)
			) : (
				<>
					{step > 1 && (
						<div className="flex">
							<button
								className="-mt-8 px-0 btn btn-sm btn-ghost text-sm text-gray-500"
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
					<div key={step} className="animate-fade-it-in shadow p-2 sm:p-6 pt-2">
						<p className=" text-sm text-gray-500 text-center font-bold mx-auto">Exact Quote: Step {step} of {steps}</p>
						<div className="text-center">
							{step === 1 && (
								<div className="my-2">
								<p className="text-sm text-gray-500">Get an installed price in only 30 seconds.</p>
								<p className="text-sm text-gray-500">No email, phone, or address required.</p>
								</div>
							)}
						</div>
						<QuestionCard
							client:visible
							question={current.question}
							options={current.options}
							optionLayout={current.optionLayout}
							paramKey={current.paramKey}
							step={step}
							subQuestion={current.subQuestion}
							disclaimer={current.disclaimer}
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
