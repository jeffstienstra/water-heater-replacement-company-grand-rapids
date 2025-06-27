import {useRef, useState} from 'react';
import Tank from './Tank.jsx';
import Tankless from './Tankless.jsx';
import MetalVent from './MetalVent.jsx';
import PvcVent from './PvcVent.jsx';
import QuestionMark from './icons/QuestionMark.jsx';
import urlHelper from '../lib/urlHelper.js';

export default function QuestionCard({classes, question, options, step, paramKey, params, subQuestion, onSelect, onBack}) {
	const [hintToShow, setHintToShow] = useState(null);
	const [selectedValue, setSelectedValue] = useState(null);
	const answers = Object.fromEntries(params);
    const subQuestionRef = useRef(null);

	const shouldShowAnySubQuestions = (subQuestion, answers) => {
		if (!subQuestion) return false;
		if (subQuestion.shouldShow?.(answers)) return true;
		return shouldShowAnySubQuestions(subQuestion.subQuestion, answers);
	};

	const handleOptionSelect = (value) => {
		// Update URL params as before
		const updatedParams = new URLSearchParams(window.location.search);
		updatedParams.set(paramKey, value);

		// Remove all subQuestion keys from URL
		const allKeys = urlHelper.getAllParamKeys([{paramKey, subQuestion}]);
		allKeys.forEach(key => {
			if (key !== paramKey) updatedParams.delete(key);
		});

		window.history.replaceState({}, '', `${window.location.pathname}?${updatedParams}`);

		const updatedAnswers = Object.fromEntries(updatedParams.entries());

		setSelectedValue(value);

		const shouldShowSubs = subQuestion && shouldShowAnySubQuestions(subQuestion, updatedAnswers);
		const shouldAdvance = !shouldShowSubs;
		onSelect(paramKey, value, shouldAdvance);
	};


	const renderSubQuestion = (subQuestion, answers) => {
        if (!subQuestion) return null;
        const showThis = subQuestion.shouldShow?.(answers);
        const showNested = renderSubQuestion(subQuestion.subQuestion, answers);

        if (!showThis && !showNested) return null;

        // Scroll to subquestion when it appears
        // Only scroll for the first visible subquestion in this branch
        if (showThis) {
            setTimeout(() => {
                subQuestionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100); // Delay to ensure DOM is updated
        }

        return (
            <div
				ref={showThis ? subQuestionRef : null}
				className="pl-2 border-l border-primary/50 mt-2"
				style={{ scrollMarginTop: '30px' }}
			>
                {showThis && (
                    <QuestionCard
                        classes="bg-primary/7 rounded-lg pt-4"
                        question={subQuestion.question}
                        options={subQuestion.options}
                        paramKey={subQuestion.paramKey}
                        onSelect={onSelect}
                        onBack={onBack}
                        params={params}
                        subQuestion={subQuestion.subQuestion}
                    />
                )}
                {!showThis && showNested}
            </div>
        );
    };

	return (
		<div className={`w-full bg-base-100 py-1 rounded-b-lg flex flex-col items-center justify-between relative ${classes}`}>
			<h2 className="px-1 text-xl font-semibold mb-4 text-center">{question}</h2>
			<div className="flex flex-col gap-4 w-full max-w-md px-2">
				{options.map(({label, value, hint, hintText, hintTitle}) => {
					const isSelected = selectedValue === value;
					const updatedAnswers = {...answers, [paramKey]: value};
					const showThisSub = subQuestion && isSelected && subQuestion.shouldShow?.(updatedAnswers);

					return (
						<div key={value} className={`flex flex-col gap-2`}>
							<div
								className="flex items-center border-2 border-primary/50 bg-base-100 rounded-lg px-4 py-3 cursor-pointer hover:bg-base-200"
								onClick={() => handleOptionSelect(value)}
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
									className="form-radio text-secondary h-5 min-w-5"
									type="radio"
									name={paramKey}
									value={value}
									checked={isSelected}
									onChange={() => handleOptionSelect(value)}
									onClick={e => e.stopPropagation()}
								/>
							</div>
							{isSelected && renderSubQuestion(subQuestion, updatedAnswers)}
						</div>
					);
				})}
				<button
					className='btn btn-ghost w-fit mx-auto text-gray-500'
					onClick={(e) => {
						e.preventDefault();
						handleOptionSelect('unsure');
					}}>
					I don't know
				</button>
			</div>

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
