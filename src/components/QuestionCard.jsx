import {useRef, useEffect, useState} from 'react';
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
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [imageHeight, setImageHeight] = useState(null);
	const [showImage, setShowImage] = useState(false);
	const imgRef = useRef(null);

	const images = hintToShow?.hintImages || [];
	const currentImage = images[currentImageIndex];


	useEffect(() => {
		if (hintToShow) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [hintToShow]);

	const handleImageLoad = () => {
		if (imgRef.current) {
			setImageHeight(imgRef.current.offsetHeight);
		}
	};

	function prevImage() {
		setCurrentImageIndex(i => (i === 0 ? images.length - 1 : i - 1));
	}

	function nextImage() {
		setCurrentImageIndex(i => (i === images.length - 1 ? 0 : i + 1));
	}

	const shouldShowAnySubQuestions = (subQuestion, answers) => {
		if (!subQuestion) return false;
		if (subQuestion.shouldShow?.(answers)) return true;
		return shouldShowAnySubQuestions(subQuestion.subQuestion, answers);
	};

	const handleOptionSelect = (value) => {
		const updatedParams = new URLSearchParams(window.location.search);

		if (selectedValue === value) {
			updatedParams.delete(paramKey);
			setSelectedValue(null);
			window.history.replaceState({}, '', `${window.location.pathname}?${updatedParams}`);
			onSelect(paramKey, null, false);
			return;
		} else {

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
		}
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
				className="pl-2 border-l border-primary/25 border-dashed py-8 mt-2"
				style={{ scrollMarginTop: '30px' }}
			>
                {showThis && (
                    <QuestionCard
                        classes="bg-primary/10 rounded-lg border-primary/75 border-2 pt-4"
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
		<div className={`w-full bg-base-100 pb-6 rounded-b-lg flex flex-col items-center justify-between relative ${classes}`}>
			<h2 className="px-1 text-xl font-semibold mb-4 text-center">{`${step ? step + '.' : ''} ${question}`}</h2>
			<div className="flex flex-col gap-4 w-full max-w-md px-2">
				{options.map(({label, value, hintImages, hintText, hintTitle}) => {
					const isSelected = selectedValue === value;
					const updatedAnswers = {...answers, [paramKey]: value};

					return (
						<div key={value} className={`flex flex-col gap-2`}>
							<div
								className="flex items-center border-2 border-primary/50 bg-base-100 rounded-lg px-4 py-3 cursor-pointer hover:bg-base-200"
								onClick={() => handleOptionSelect(value)}
								tabIndex={0}
								role="radio"
							>
								{(hintImages?.length > 0) && (
									<button
										type="button"
										onClick={e => {
											e.stopPropagation();
											setHintToShow({hintImages, text: hintText, title: hintTitle});
											setCurrentImageIndex(0);
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
			</div>

			{hintToShow && (
				<div className="fixed inset-0 bg-black/60 z-50 flex justify-center px-4 overflow-scroll" onClick={() => setHintToShow(null)}>
					<div className="bg-white h-fit my-4 rounded-sm shadow-xl max-w-md w-full relative p-4" onClick={(e) => e.stopPropagation()}>
						<button onClick={() => setHintToShow(null)} className="px-3 py-2 absolute top-0 right-0 rounded-sm text-gray-400 hover:bg-gray-200">
							X
						</button>
						{hintToShow.title && (
							<h3 className="text-lg font-semibold mb-2 text-center">{hintToShow.title}</h3>
						)}
						{hintToShow.text && (
							<p
								className="mb-2 text-sm text-gray-700"
								dangerouslySetInnerHTML={{__html: hintToShow.text}}
							></p>
						)}
						{images.length > 0 && (
							<>
								<div
									className="mt-2 text-left text-xs text-gray-500 mb-1"
									dangerouslySetInnerHTML={{__html: `Photo: ${currentImage.alt}`}}
								></div>
								<div
									className="relative transition-all duration-100 ease-in-out"
									style={{height: imageHeight || 'auto'}}
								>
									<img
										ref={imgRef}
										src={currentImage.src}
										alt={currentImage.alt}
										onLoad={handleImageLoad}
										className="rounded-md w-full h-auto object-contain mx-auto"
									/>
									{images.length > 1 && (
										<>
											<button
												onClick={prevImage}
												className="absolute h-full left-0 top-0 bg-white/40 px-1 hover:bg-white/80 rounded-l-sm shadow"
												aria-label="Previous image"
											>
												◀
											</button>
											<button
												onClick={nextImage}
												className="absolute h-full right-0 top-0 bg-white/50 px-1 hover:bg-white/80 rounded-r-sm shadow"
												aria-label="Next image"
											>
												▶
											</button>
											<div className="absolute bottom-2 flex mx-auto w-full justify-center mt-2 gap-3">
												{images.map((_, idx) => (
													<button
														key={idx}
														onClick={() => setCurrentImageIndex(idx)}
														className={`w-3 h-3 rounded-full ${
															idx === currentImageIndex ? 'bg-primary' : 'bg-base-200'
														}`}
													></button>
												))}
											</div>
										</>
									)}
								</div>

							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
