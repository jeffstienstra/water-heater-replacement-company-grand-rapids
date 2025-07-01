import {useState} from 'react';
import questions from '../data/questions.js';

import Star from './icons/Star.jsx';
import waterHeaterModels from '../data/waterHeaterModels.js';
import installAddons from '../data/installAddons.js';
import StickyBar from './StickyBar.jsx';
import LinkInternal from './icons/LinkInternal.jsx';

export default function RecommendationCard({params}) {
    const [showAnswers, setShowAnswers] = useState(false);
    const [warrantySelections, setWarrantySelections] = useState({});
    const [selectedModelId, setSelectedModelId] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const warrantyAddon = installAddons.find((addon) => addon.id === 'add_extended_warranty');

    const toggleWarranty = (modelId) => {
        setWarrantySelections((prev) => ({
            ...prev,
            [modelId]: !prev[modelId],
        }));
    };

    if (!params || typeof params.get !== 'function') {
        console.error('Invalid or missing URLSearchParams in RecommendationCard');
        return <p>Something went wrong with your recommendation.</p>;
    }

    const answers = Object.fromEntries(params.entries());

    function toTitleCase(str) {
        return str
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (s) => s.toUpperCase())
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .trim();
    }

    function findQuestionByParamKey(questions, key) {
        for (const q of questions) {
            if (q.paramKey === key) return q;
            if (q.subQuestion) {
                const found = findQuestionByParamKey([q.subQuestion], key);
                if (found) return found;
            }
        }
        return null;
    }

    const displayAnswers = Object.entries(answers)
        .filter(([key]) => key !== 'step')
        .map(([key, value]) => {
            const question = findQuestionByParamKey(questions, key);
            let label = value;
            if (question) {
                const option = question.options.find((opt) => opt.value === value);
                if (option) label = option.label;
            }
            return {
                key: toTitleCase(key),
                value: label,
            };
        });

    const matchedModels = waterHeaterModels.filter((model) => {
        return Object.entries(model.conditions).every(([key, validValues]) => {
            // If the condition isn't in user answers, skip it
            if (!(key in answers)) return true;

            const answerValue = answers[key];
            return Array.isArray(validValues) ? validValues.includes(answerValue) : validValues === answerValue;
        });
    });

    matchedModels.sort((a, b) => a.baseCost - b.baseCost);
    const tierLabels = ['Standard', 'Recommended', 'Upgrade'];
    let limitedModels = matchedModels.slice(0, 3);

    const fallbackTankless = waterHeaterModels.find(
        (model) =>
            model.id === 'tankless_prestige_recommended' &&
            Object.entries(model.conditions).every(([key, validValues]) => {
                if (!(key in answers)) return true;
                const answerValue = answers[key];
                return Array.isArray(validValues) ? validValues.includes(answerValue) : validValues === answerValue;
            })
    );

    if (limitedModels.length === 2 && fallbackTankless) {
        limitedModels.push(fallbackTankless);
    }

    return (
        <div className='w-full mx-auto mt-6'>
            <div className='-mt-9 sm:-mt-3 bg-primary h-4' />
            <div className='bg-primary/5 pt-4 rounded-b-sm text-center'>
                {/* <h2 className='text-2xl font-semibold'>Matched Water Heaters</h2> */}
                {matchedModels.length === 0 ? (
                    <p>No suitable models found. Please check your answers or contact support.</p>
                ) : (
                    <>
                        <StickyBar
							selectedModel={selectedModelId}
							onConfirmClick={() => setShowConfirmModal(true)}
						/>

                        <p className='text-sm text-gray-500'>We matched the following options:</p>
						<div className='mb-6 sm:mb-12'>
							<button className='text-sm text-primary underline focus:outline-none' onClick={() => setShowAnswers((v) => !v)} aria-expanded={showAnswers} aria-controls='user-answers-dropdown'>
								{showAnswers ? 'Hide your answers ▲' : 'Review your answers ▼'}
							</button>
							{showAnswers && (
								<div id='user-answers-dropdown' className='bg-base-100 border border-base-300 rounded p-3 text-left max-w-sm mx-auto shadow'>
									<ul className='text-sm'>
										{displayAnswers.map(({key, value}) => (
											<li key={key} className='flex justify-between py-1 border-b border-base-200 last:border-b-0'>
												<span className='font-medium'>{key}</span>
												<span className='text-gray-700 text-right pl-4'>{value}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
                        <div className='px-4 flex flex-wrap justify-center items-stretch gap-16'>
                            {limitedModels.map((model, index) => {
                                let productLink;
                                if (model.type === 'tankless') {
                                    productLink = `/products/tankless-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'pvc') {
                                    productLink = `/products/power-vent-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'metal') {
                                    productLink = `/products/gas-tank-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'none') {
                                    productLink = `/products/electric-tank-water-heaters/`;
                                }
                                // add hybrid tank link if needed

                                const tierLabel = model.id === 'tankless_prestige_recommended' ? 'Consider an Upgrade?' : tierLabels[index];

                                const isWarrantySelected = warrantySelections[model.id];
                                const modelAddOns = installAddons.filter((addOn) => addOn.applyIf(answers, model) || (isWarrantySelected && addOn.id === 'add_extended_warranty'));

                                const totalLow = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[0] ?? 0), 0);
                                const totalHigh = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[1] ?? 0), 0);
								const priceRange = totalLow === totalHigh ? `$${totalLow.toLocaleString()}` : `$${totalLow.toLocaleString()} - $${totalHigh.toLocaleString()}`;

                                return (
									<div key={`${model.modelNumber}-${index}`} className={`flex flex-col w-full max-w-86 shadow-lg ${selectedModelId === model.id && 'outline-primary rounded-lg outline-4'}`}>
										<div className=' bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg'>
                                            {tierLabel === 'Recommended' ? (
													<div className='flex justify-center items-center '>
														<Star className='' />
														<h2 className='ml-2 font-bold text-2xl'>{tierLabel}</h2>
													</div>
												) : (
													<h2 className='font-bold text-2xl'>{tierLabel}</h2>
												)}
                                        </div>
										<div
											key={model.id}
											className='flex flex-col flex-grow w-full max-w-86 bg-base-100 border border-base-300 shadow-lg p-4'
										>
											<div className='flex-grow'>
												<h3 className='text-xl mb-4 font-semibold'>{model.label}</h3>
                                                <div>
												<p className='text-sm text-left pl-6'>Complete installation</p>
												<p className='text-3xl sm:text-4xl font-bold text-primary'>
													{priceRange}
												</p>
                                            </div>

												{/* <p className='text-sm text-gray-600 mb-4'>{model.notes}</p> */}
												<ul className='text-left my-6 list-disc list-inside'>
													<span className='text-xl  font-semibold '>Features:</span>
													{model.features?.map((feature, idx) => (
														<li key={idx}>
															<span className='font-semibold'>{feature.label}</span>: {feature.value}
														</li>
													))}
												</ul>
                                                {modelAddOns.length > 0 && (
                                                    <div className='text-sm border border-base-300 rounded-lg text-left p-3 mt-auto mb-2'>
                                                        <p className='font-semibold mb-2'>Your price also includes*: </p>
                                                        <ul className='list-disc list-inside text-gray-700 space-y-1 pb-2'>
                                                            {modelAddOns.map((addOn) => {
                                                                if (addOn.id === 'add_extended_warranty') return null;
                                                                return (
                                                                <li key={addOn.id} className='leading-snug pl-5 -indent-5'>
                                                                    <span className='font-medium'>{addOn.label}:</span>
                                                                    <span className='text-gray-500 text-nowrap '>
                                                                        {' '}
                                                                        ${addOn.cost[0]?.toLocaleString()}
                                                                        {addOn.cost[0] !== addOn?.cost[1] ? `-${addOn.cost[1].toLocaleString()}` : null}
                                                                    </span>
                                                                </li>
                                                                );
                                                            }
                                                            )}
                                                        </ul>
                                                        <p className='text- text-gray-500'>*Note: A site visit or video call is required to determine your exact final price.</p>
                                                    </div>
                                                )}
											</div>

											<a target='_blank' href={productLink} className='text-gray-500 text-sm font-normal btn btn-ghost h-fit'>
												<LinkInternal className='text-gray-500 font-normal' />
												Additional Product Info
											</a>
											<div className='bg-primary/5 border border-base-300 rounded-lg shadow-sm pr-4 flex flex-row items-center gap-2 mt-2'>
												<label htmlFor={`warranty-${model.id}`} className='text-sm text-left p-4'>
													<ul className='font-semibold'>
														Include Rheem's ProtectionPlus Extended Warranty:
														<li>
															{model.type === 'tankless' ? 'Heat exchanger: ' : 'Tank: '}
															{model.warranty.tank + 4} Years
														</li>
														<li>Labor: {model.warranty.labor + 1} Years</li>
                                                        <li>Cost: ${warrantyAddon?.cost[0]}</li>
													</ul>
												</label>
												<input id={`warranty-${model.id}`} className='checkbox checkbox-primary rounded-sm' type='checkbox' checked={isWarrantySelected || false} onChange={() => toggleWarranty(model.id)} />
											</div>
										</div>

                                        <div className=' bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-b-lg'>
                                            <input
												id={`select-${model.id}`}
												type='checkbox'
												className='h-8 w-8 checkbox checkbox-primary checked:bg-white text-primary rounded-sm bg-white'
												checked={selectedModelId === model.id}
												onChange={() => setSelectedModelId(selectedModelId === model.id ? null : model.id)} />
                                            <label
												htmlFor={`select-${model.id}`}
												className='text-lg font-bold text-white'>
                                                Choose This Model
                                            </label>
                                        </div>
									</div>
                                );
                            })}
                        </div>
                        <p className='max-w-3xl mx-auto text-sm text-gray-500 mt-8 p-4 pb-12'>* Some of these services may not be required for your home, though they commonly are. Call us or schedule an onsite Price Confirmation to verify your unique system. Final price is always provided by email or text before work begins.</p>
                    </>
                )}
			</div>
            {showConfirmModal && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
                    <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto'>
                        <h2 className='text-xl font-bold mb-4'>Confirm Your System</h2>
                        {/* Add details later */}
                        <p className='text-sm text-gray-600 mb-4'>Summary of selected system goes here...</p>
                        <div className='flex justify-end gap-2 mt-4'>
                            <button className='btn btn-outline btn-sm' onClick={() => setShowConfirmModal(false)}>
                                Cancel
                            </button>
                            <button className='btn btn-primary btn-sm'>Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
