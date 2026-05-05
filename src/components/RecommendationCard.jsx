import {useEffect, useState} from 'react';
import questions from '../data/questions.js';

import Star from './icons/Star.jsx';
import waterHeaterModels from '../data/waterHeaterModels.js';
import installAddons from '../data/installAddons.js';
import PriceReceipt from './icons/PriceReceipt.jsx';
import SubmissionModal from './SubmissionModal.jsx';
import ProductDetailsModal from './ProductDetailsModal.jsx';
import PhoneReact from './icons/PhoneReact.jsx';

export default function RecommendationCard({params, imageMap = {}}) {
    const [showAnswers, setShowAnswers] = useState(false);
    const [warrantySelections, setWarrantySelections] = useState({});
    const [selectedModel, setSelectedModel] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productDetailsModel, setProductDetailsModel] = useState(null);

    const warrantyAddon = installAddons.find((addon) => addon.id === 'add_extended_warranty');
    const fuelLabelMap = { gas: 'Gas', electric: 'Electric', propane: 'Propane' };

    const toggleWarranty = (modelId) => {
        setWarrantySelections((prev) => ({
            ...prev,
            [modelId]: !prev[modelId],
        }));
    };

    useEffect(() => {
        if (showConfirmModal || productDetailsModel) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [showConfirmModal, productDetailsModel]);

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

    const getNoMatchContent = () => {
        if (answers?.fuel === 'oil') {
            return {
                title: 'Yuh-oh.',
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
						<p className="fixed top-[64px] left-0 right-0 z-30 py-1 bg-primary text-white">Pick an option to confirm final price</p>

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
                        <div className='px-4 grid grid-cols-[repeat(auto-fit,minmax(0,344px))] justify-center gap-x-16 gap-y-0'>
                            {limitedModels.map((model, index) => {
                                let productLink;
                                if (model.type === 'tankless') {
                                    productLink = `/resources/tankless-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'pvc') {
                                    productLink = `/resources/power-vent-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'metal') {
                                    productLink = `/resources/gas-tank-water-heaters/`;
                                } else if (model.type === 'tank' && model.ventType === 'none') {
                                    productLink = `/resources/electric-tank-water-heaters/`;
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

                                return (
                                    <div key={`${model.modelNumber}`} style={{gridRow: 'span 7', display: 'grid', gridTemplateRows: 'subgrid'}} className={`w-full max-w-86 mt-12 first:mt-0 md:mt-0 ${selectedModel === model.id && 'outline-primary rounded-lg outline-4'}`}>
                                        {/* row 1: tier header */}
                                        <div className='bg-primary text-white items-center justify-center flex gap-2 p-4 rounded-t-lg self-stretch'>
                                            {tierLabel === 'Recommended' ? (
                                                <div className='flex justify-center items-center '>
                                                    <Star className='' />
                                                    <h2 className='ml-2 font-bold text-2xl'>{tierLabel}</h2>
                                                </div>
                                            ) : (
                                                <h2 className='font-bold text-2xl'>{tierLabel}</h2>
                                            )}
                                        </div>
                                        {/* row 2: h3 title */}
                                        <div className={`bg-base-100 border-x-2 px-4 pt-4 ${tierLabel === 'Recommended' ? 'border-primary' : 'border-base-300'}`}>
                                            <h3 className='text-xl font-bold'>{model.brand}{model.size ? ` ${model.size} Gal` : ''} {model.typeLabel}</h3>
                                        </div>
                                        {/* row 3: subtitle */}
                                        <div className={`bg-base-100 border-x-2 px-4 ${tierLabel === 'Recommended' ? 'border-primary' : 'border-base-300'}`}>
                                            <p className='text-sm text-gray-500'>{model.seriesName} · {fuelLabelMap[model.fuel]}</p>
                                        </div>
                                        {/* row 4: image */}
                                        <div className={`bg-base-100 border-x-2 px-4 ${tierLabel === 'Recommended' ? 'border-primary' : 'border-base-300'}`}>
                                            <img className='max-h-48 mx-auto my-6' src={imageMap[model.imagePath] ?? model.imagePath} alt={`${model.brand} ${model.label}`} />
                                        </div>
                                        {/* row 5: price */}
                                        <div className={`bg-base-100 border-x-2 px-4 ${tierLabel === 'Recommended' ? 'border-primary' : 'border-base-300'}`}>
                                            <div className='w-fit mx-auto flex flex-col items-left'>
                                                <p className='mx-auto text-3xl text-left sm:text-4xl font-bold text-primary'>{priceRange}</p>
                                                <p className='mx-auto text-sm text-left'>Complete installation</p>
                                            </div>
                                            {isWarrantySelected && (
                                                <p className='flex justify-center items-center text-sm mt-1'>Includes Extended Warranty
                                                    <span className='ml-1 text-gray-500'>${warrantyAddon?.cost[0]}</span>
                                                    <button className='btn btn-primary ml-1 px-1 max-h-[20px] max-w-[20px]' onClick={() => toggleWarranty(model.id)}>X</button>
                                                </p>
                                            )}
                                        </div>
                                        {/* row 6: benefits + view details (fills remaining) */}
                                        <div className={`flex flex-col bg-base-100 border-x-2 border-b-2 px-4 shadow-lg ${tierLabel === 'Recommended' ? 'border-primary' : 'border-base-300'}`}>
                                            {model.benefits?.length > 0 && (
                                                <ul className='text-left mt-4 mb-2 space-y-1.5 flex-grow'>
                                                    {model.benefits.map((benefit, idx) => (
                                                        <li key={idx} className='flex items-start gap-2 text-sm'>
                                                            <span className='text-primary font-bold mt-0.5 shrink-0'>✓</span>
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                    {model.warranty && (
                                                        <li className='flex items-start gap-2 text-sm'>
                                                            <span className='text-primary font-bold mt-0.5 shrink-0'>✓</span>
                                                            <span>{model.warranty.tank}-Year {model.type === 'tankless' ? 'Heat Exchanger' : 'Tank'} Warranty</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            )}
                                            <button
                                                onClick={() => setProductDetailsModel(model)}
                                                className='mt-2 mb-2 text-gray-500 text-sm font-normal btn btn-ghost h-fit'
                                            >
                                                View Product Details
                                            </button>
                                        </div>
                                        {/* row 7: check availability footer */}
                                        <div className='p-4 rounded-b-lg bg-primary'>
                                            <button
                                                className='btn btn-secondary shadow-none w-full text-lg font-bold text-white border-none hover:bg-white/30'
                                                onClick={() => {
                                                    setSelectedModel({
                                                        ...model,
                                                        totalLow,
                                                        totalHigh,
                                                        isWarrantySelected,
                                                        modelAddOns
                                                    });
                                                    setShowConfirmModal(true);
                                                }}
                                            >
                                                Confirm My Quote
                                            </button>
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
            {productDetailsModel && (
                <div className='fixed inset-0 z-30 p-4 flex items-start justify-center bg-black/75 overflow-y-auto'>
                    <div className='my-auto bg-white rounded-lg shadow-lg w-full max-w-lg min-w-xs mx-auto'>
                        <ProductDetailsModal
                            model={productDetailsModel}
                            imageMap={imageMap}
                            onClose={() => setProductDetailsModel(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
