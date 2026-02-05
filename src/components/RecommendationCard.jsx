import {useEffect, useState} from 'react';
import questions from '../data/questions.js';

import Star from './icons/Star.jsx';
import waterHeaterModels from '../data/waterHeaterModels.js';
import installAddons from '../data/installAddons.js';
import StickyBar from './StickyBar.jsx';
import LinkInternal from './icons/LinkInternal.jsx';
import PriceReceipt from './icons/PriceReceipt.jsx';
import SubmissionModal from './SubmissionModal.jsx';
import PhoneReact from './icons/PhoneReact.jsx';

export default function RecommendationCard({params}) {
    const [showAnswers, setShowAnswers] = useState(false);
    const [warrantySelections, setWarrantySelections] = useState({});
    const [selectedModel, setSelectedModel] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const warrantyAddon = installAddons.find((addon) => addon.id === 'add_extended_warranty');

    const toggleWarranty = (modelId) => {
        setWarrantySelections((prev) => ({
            ...prev,
            [modelId]: !prev[modelId],
        }));
    };

    useEffect(() => {
        if (showConfirmModal) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showConfirmModal]);

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

            const displayKey = key === 'neededCapacity'
                ? 'Capacity'
                : toTitleCase(key);

            return {
                key: displayKey,
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

    // let noMatchMessage = '';
    // if (answers?.fuel === 'oil') {
    //     noMatchMessage = 'We do not install fuel oil water heaters at this time. Please check your answers or contact us at 616-315-0999.';
    // } else if (limitedModels.length === 0) {
    //     noMatchMessage = `Almost there. We just need a bit more information to match you with the right water heater and price. You can restart the instant quote to answer a few additional questions, or if you’d rather talk it through, a technician can walk through the process with you by phone or in person.`;
    // }

    const getNoMatchContent = () => {
        if (answers?.fuel === 'oil') {
            return {
                title: 'Heads up.',
                body: (
                    <>
                        We don’t install fuel oil water heaters at this time. Please review your answers or call{' '}
                        <a href="tel:616-315-0999" className="underline font-medium">
                            616-315-0999
                        </a>.
                    </>
                ),
            };
        }

        if (limitedModels.length === 0) {
            return {
                title: 'Almost there.',
                body: (
                    <>
                        We just need a bit more information to match you with the right water heater and price.
                        <br />
                        <br />
                        You can restart the instant quote to answer a few additional questions, or if you’d rather talk it through,
                        a technician can walk through the process with you by phone or in person.
                    </>
                ),
            };
        }

        return null;
    };

    const noMatchContent = getNoMatchContent();

    if (fallbackTankless && limitedModels.length < 3 && !limitedModels.some(m => m.id === fallbackTankless.id)) {
        const fallbackWithFlag = {...fallbackTankless, isFallback: true};
        limitedModels.push(fallbackWithFlag);
    }

    return (
        <div className='w-full mx-auto mt-6'>
            <div className='-mt-9 sm:-mt-3 bg-primary h-4' />
            <div className='bg-primary/5 pt-4 rounded-b-sm text-center'>
                {/* <h2 className='text-2xl font-semibold'>Matched Water Heaters</h2> */}
                {matchedModels.length === 0 && (
                    <>
                        <div className="pb-4 px-4 sm:max-w-[50%] mx-auto">
                            <p className="text-lg font-semibold mb-2">{noMatchContent.title}</p>
                            <p className="text-base">{noMatchContent.body}</p>
                        </div>
                        <div className='mb-6'>
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
                        <div className="flex flex-col justify-center gap-2 pb-8">
                            <a href="tel:616-315-0999" className="btn btn-primary text-lg text-white py-2 w-64 max-w-xs mx-auto mb-4">
                                <PhoneReact />
                                <p>Call Now For A Quote</p>
                            </a>
                            <a href="/instant-quote/?step=1" className="btn btn-outline text-lg bg-white/50 text-black py-2 w-64 max-w-xs mx-auto mb-4 shadow-sm">
                                <PriceReceipt />
                                <p>Restart Instant Quote</p>
                            </a>
                        </div>
                    </>
                )}
                {matchedModels.length > 0 && (
                    <>
                        <StickyBar selectedModel={selectedModel} onConfirmClick={() => setShowConfirmModal(true)} />

                        <div className='mb-4 sm:mb-6 px-4'>
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

                                const tierLabel = model.isFallback
                                    ? 'Consider an Upgrade?'
                                    : tierLabels[index];

                                const isWarrantySelected = warrantySelections[model.id];
                                const modelAddOns = installAddons.filter((addOn) => addOn.applyIf(answers, model));

                                let totalLow = model.baseCost;
                                let totalHigh = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[1] ?? 0), 0);
                                totalLow += isWarrantySelected ? warrantyAddon?.cost[0] : 0;
                                totalHigh += isWarrantySelected ? warrantyAddon?.cost[1] : 0;
                                const priceRange = totalLow === totalHigh ? `$${totalLow.toLocaleString()}` : `$${totalLow.toLocaleString()} - $${totalHigh.toLocaleString()}`;

                                const [expandedCards, setExpandedCards] = useState({});

                                const toggleCardExpand = (id) => {
                                    setExpandedCards((prev) => ({
                                        ...prev,
                                        [id]: !prev[id],
                                    }));
                                };

                                const isExpanded = expandedCards[model.id];

                                return (
                                    <div key={`${model.modelNumber}`} className={`flex h-fit flex-col w-full max-w-86 ${selectedModel === model.id && 'outline-primary rounded-lg outline-4'}`}>
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
                                        <div key={model.id} className='flex flex-col w-full max-w-86 bg-base-100 border border-base-300 shadow-lg p-4 pb-0'>{/* flex-grow?? */}
                                            {/* <div className='flex-grow'> */}
                                            <h3 className='text-xl mb-0 font-semibold min-h-20'>{model.label}</h3>
                                            <img className='max-h-48 mx-auto m-6' src={`${model.imagePath}`} alt={`${model.brand} ${model.label}`} />

                                            <div className='w-fit mx-auto flex flex-col items-left'>
                                                <p className='mx-auto text-3xl text-left sm:text-4xl font-bold text-primary'>{priceRange}</p>
                                                <p className='mx-auto text-sm text-left '>Complete installation</p>
                                            </div>
                                                {isWarrantySelected && (
                                                    <p className='flex justify-center items-center text-sm'>Includes Extended Warranty
                                                        <span className="ml-1 text-gray-500">${warrantyAddon?.cost[0]}</span>
                                                        <button className='btn btn-primary ml-1 px-1 max-h-[20px] max-w-[20px]'
                                                        onClick={() => toggleWarranty(model.id)}>X</button>
                                                    </p>
                                                )}
                                            {/* <p className='text-sm text-gray-600 mb-4'>{model.notes}</p> */}

                                            {/* hide model details */}
                                            <button onClick={() => toggleCardExpand(model.id)} className='text-sm text-primary underline mt-2' aria-expanded={isExpanded}>
                                                {isExpanded ? 'Hide Details ▲' : 'Show Details ▼'}
                                            </button>
                                            <div
                                                className={`transition-all duration-300 ease-in-out overflow-hidden
                                                    ${isExpanded ? 'max-h-[1000px] pt- pb-4' : 'max-h-0 pt-0 pb-0'}`}
                                            >
                                                <div className='flex-grow'>
                                                    <ul className='text-left list-disc list-outside ml-4'>
                                                        <span className='text-xl font-semibold '>Features:</span>
                                                        {model.features?.map((feature, idx) => (
                                                            <li className='ml-5' key={idx}>
                                                                <span className='font-semibold'>{feature.label}</span>: {feature.value}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <a target='_blank' href={model.productLink} className='mt-2 mb-6 text-gray-500 text-sm font-normal btn btn-ghost h-fit'>
                                                        <LinkInternal className='text-gray-500 font-normal' />
                                                        Additional Product Info
                                                    </a>

                                                    {modelAddOns.length > 0 && (
                                                        <div className='text-sm border border-base-300 rounded-lg text-left p-3 mt-auto mb-2'>
                                                            <p className='font-semibold mb-2'>
                                                                Most homes like yours need the following services <span className='text-sm font-normal text-gray-500'>(already included in your price): </span>
                                                            </p>
                                                            {/* <p className='text- text-gray-500'>(Already included in the total price range shown)</p> */}
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
                                                                })}
                                                            </ul>
                                                            <p className='text- text-gray-500'>Final needs may vary. A quick home visit or video call will confirm your current setup before any work begins.</p>
                                                        </div>
                                                    )}
                                                </div>
                                                {/* <div className='bg-primary/5 border border-base-300 rounded-lg shadow-sm pr-4 flex flex-row items-center gap-2 mt-2'>
                                                    <label htmlFor={`warranty-${model.id}`} className='text-sm text-left p-4'>
                                                        <ul className='font-semibold'>
                                                            Add Extended Warranty:
                                                            <li>
                                                                {model.type === 'tankless' ? 'Heat Exchanger: ' : 'Tank: '}
                                                                {model.warranty.tank + 4} Years
                                                            </li>
                                                            <li>Labor: {model.warranty.labor + 1} Years</li>
                                                            <li>Cost: ${warrantyAddon?.cost[0]}</li>
                                                        </ul>
                                                    </label>
                                                    <input id={`warranty-${model.id}`} className='checkbox checkbox-primary rounded-sm' type='checkbox' checked={isWarrantySelected} onChange={() => toggleWarranty(model.id)} />
                                                </div> */}
                                            </div>
                                        </div>

                                        <div className=' bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-b-lg'>
                                            <input
                                                id={`select-${model.id}`}
                                                type='checkbox'
                                                className='h-8 w-8 checkbox checkbox-primary checked:bg-white text-primary rounded-sm bg-white'
                                                checked={selectedModel?.id === model.id}
                                                onChange={() => {
                                                    const isSelected = selectedModel?.id === model.id;
                                                    // TODO: report model selected to cloudflare KV analytics here
                                                    setSelectedModel(isSelected ? null : {
                                                        ...model,
                                                        totalLow,
                                                        totalHigh,
                                                        isWarrantySelected,
                                                        modelAddOns
                                                    });
                                                }}

                                            />
                                            <label htmlFor={`select-${model.id}`} className='text-lg font-bold text-white'>
                                                Choose This Model
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className='max-w-3xl mx-auto text-sm text-gray-500 mt-8 p-4 pb-12'>*Prices shown apply to standard water heater replacements and are confirmed during the verification step.</p>
                    </>
                )}
            </div>
            {showConfirmModal && (
                <div className='fixed inset-0 py-8 md:mt-16 pt-18 md:pt-4 z-30 p-2 flex items-center justify-center bg-black/75 overflow-scroll'>
                    <div className='mt-auto bg-white rounded-lg shadow-lg w-full max-w-lg min-w-xs mx-auto'>
                            <SubmissionModal
                                quoteData={{
                                    selectedModel: selectedModel,
                                    answers: answers,
                                }}
                                onClose={() => setShowConfirmModal(false)}
                                onCancel={() => setShowConfirmModal(false)}
                            />
                    </div>
                </div>
            )}
        </div>
    );
}
