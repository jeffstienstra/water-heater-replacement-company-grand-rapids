import {useEffect, useState} from 'react';
import questions from '../data/questions.js';

import Star from './icons/Star.jsx';
import waterHeaterModels from '../data/waterHeaterModels.js';
import installAddons from '../data/installAddons.js';
import PriceReceipt from './icons/PriceReceipt.jsx';
import SubmissionModal from './SubmissionModal.jsx';
import PhoneReact from './icons/PhoneReact.jsx';
import InstallationInclusions from './InstallationInclusions.jsx';
import { overallRating, totalReviewCount } from '../data/reviews';

export default function RecommendationCard({params, imageMap = {}}) {
    const [anodeRodSelections, setAnodeRodSelections] = useState({});
    const [expandedFeatures, setExpandedFeatures] = useState({});
    const [expandedAnodeInfo, setExpandedAnodeInfo] = useState({});
    const [selectedModel, setSelectedModel] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // const anodeRodAddon = installAddons.find((addon) => addon.id === 'tank_anode_rod_upgrade');
    const fuelLabelMap = { gas: 'Gas', electric: 'Electric', propane: 'Propane' };

    const toggleAnodeRod = (modelId) => {
        setAnodeRodSelections((prev) => ({
            ...prev,
            [modelId]: !prev[modelId],
        }));
    };

    const toggleExpandedFeatures = (modelId) => {
        setExpandedFeatures((prev) => ({
            ...prev,
            [modelId]: !prev[modelId],
        }));
    };

    const toggleAnodeInfo = (modelId) => {
        setExpandedAnodeInfo((prev) => ({
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

    const getAnswerLabel = (key) => {
        const value = answers[key];
        if (!value) return null;

        const question = findQuestionByParamKey(questions, key);
        if (!question) return value;

        const option = question.options.find((opt) => opt.value === value);
        return option?.label ?? value;
    };

    const getCapacitySnapshot = () => {
        if (answers.interestedIn !== 'tank') return null;

        const capacityValue = answers.neededCapacity;
        if (capacityValue === 'standard') return 'Standard Capacity';
        if (capacityValue === 'large') return 'Large Capacity';

        const capacityLabel = getAnswerLabel('neededCapacity');
        return capacityLabel ? `Capacity: ${capacityLabel}` : null;
    };

    const getCompactCardTitle = (model) => {
        const brand = model.brand;

        if (model.type === 'tank') {
            const capacity = model.tankCapacity ? `${model.tankCapacity}-Gallon` : null;

            if (model.ventType === 'pvc') return [brand, capacity, 'Power Vent'].filter(Boolean).join(' ');
            if (model.ventType === 'none') return [brand, capacity, 'Tank'].filter(Boolean).join(' ');
            if (model.ventType === 'metal') return [brand, capacity, 'Tank'].filter(Boolean).join(' ');

            return [brand, capacity, 'Tank'].filter(Boolean).join(' ');
        }

        if (model.type === 'tankless') {
            const flow = model.gpm ? `${model.gpm} GPM` : null;
            return [brand, flow, 'Tankless'].filter(Boolean).join(' ');
        }

        return model.label;
    };

    const getCardSubtitle = (model) => {
        const parts = [];

        if (model.seriesName) {
            parts.push(`${model.seriesName}`);
        }

        if (model.type === 'tank') {
            const fuelLabel = model.fuel === 'electric' ? 'Electric' : model.fuel === 'gas' ? 'Gas' : 'Propane';
            const configLabel = model.ventType === 'pvc'
                ? `Power Vent ${fuelLabel}`
                : model.ventType === 'none'
                    ? 'Standard Electric'
                    : `Atmospheric ${fuelLabel}`;

            parts.push(configLabel);
        }

        if (model.type === 'tankless') {
            const fuelLabel = model.fuel === 'electric' ? 'Electric' : model.fuel === 'gas' ? 'Gas' : 'Propane';
            parts.push(fuelLabel);
        }

        return parts.join(' • ');
    };

    const systemSnapshot = getCapacitySnapshot()
        ?? (getAnswerLabel('ventType') ? `Venting: ${getAnswerLabel('ventType')}` : null)
        ?? (getAnswerLabel('interestedIn') ? `System: ${getAnswerLabel('interestedIn')}` : null);

    const snapshotParts = [
        getAnswerLabel('fuel'),
        getAnswerLabel('showers') ? `${getAnswerLabel('showers')} Shower${getAnswerLabel('showers') === '1' ? '' : 's'}` : null,
        systemSnapshot,
    ].filter(Boolean);

    const editSetupParams = new URLSearchParams(params.toString());
    editSetupParams.set('step', '1');

    const normalizeAnswerValue = (key, rawValue) => {
        if (key === 'isMobileHome') {
            return rawValue === 'true';
        }
        return rawValue;
    };

    const doesConditionMatch = (key, validValues) => {
        const rawAnswer = answers[key];

        if (rawAnswer === undefined) return true;

        const answerValue = normalizeAnswerValue(key, rawAnswer);
        return Array.isArray(validValues) ? validValues.includes(answerValue) : validValues === answerValue;
    };

    const matchedModels = waterHeaterModels.filter((model) => {
        return Object.entries(model.conditions).every(([key, validValues]) => {
            return doesConditionMatch(key, validValues);
        });
    });

    matchedModels.sort((a, b) => a.baseCost - b.baseCost);
    const tierLabels = ['Standard', 'Recommended', 'Upgrade'];
    let limitedModels = matchedModels.slice(0, 3);

    const fallbackTankless = waterHeaterModels.find(
        (model) =>
            model.id === 'tankless_prestige_recommended' &&
            Object.entries(model.conditions).every(([key, validValues]) => {
                return doesConditionMatch(key, validValues);
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

    const filledStars = Math.round(overallRating);

    return (
        <div className='w-full mx-auto mt-4'>
            <div className='w-full bg-white'>
                <div className='max-w-4xl mx-auto px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 sm:gap-5 flex-nowrap whitespace-nowrap overflow-x-auto'>
                    <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
                        <span className='text-lg sm:text-2xl font-black text-base-content leading-none'>{overallRating.toFixed(1)}</span>
                        <span className='text-orange-400 text-sm sm:text-xl tracking-normal sm:tracking-wider leading-none'>{'★'.repeat(filledStars)}</span>
                        <span className='text-[10px] sm:text-xs text-gray-500'>({totalReviewCount})</span>
                    </div>

                    <span className='hidden md:inline-flex text-base-300 select-none'>|</span>

                    <div className='flex items-center gap-1 sm:gap-1.5 shrink-0'>
                        <svg className='w-4 h-4 sm:w-5 sm:h-5 shrink-0' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='#EA4335' d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.09 17.74 9.5 24 9.5z'/>
                            <path fill='#4285F4' d='M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z'/>
                            <path fill='#FBBC05' d='M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z'/>
                            <path fill='#34A853' d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-3.59-13.46-8.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'/>
                        </svg>
                        <span className='text-[11px] hidden md:inline-flex sm:text-xs font-bold text-gray-500 tracking-wide'>Google</span>
                        <span className='inline-flex sm:hidden text-[11px] bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full'>✓</span>
                        <span className='hidden sm:inline-flex text-xs bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full'>✓ Verified</span>
                    </div>

                    <span className='text-base-300 select-none'>|</span>

                    <div className='flex items-center gap-1 sm:gap-1.5 shrink-0'>
                        <span className='text-[11px] sm:text-xs font-bold text-[#D32323] tracking-wide'>Yelp</span>
                        <span className='text-xs bg-green-100 text-green-700 font-semibold px-1.5 py-0.5 rounded-full'>Excellent</span>
                    </div>
                </div>
            </div>
            {/* <div className='-mt-9 sm:-mt-3 bg-primary h-4' /> */}
            <div className='bg-white pb-16 text-center'>
                <h1 className='px-4 pb-4 text-2xl sm:text-4xl font-black tracking-tight text-gray-900'>
                    Your Personalized Matches
                </h1>
                {/* <h2 className='text-2xl font-semibold'>Matched Water Heaters</h2> */}
                {matchedModels.length === 0 && (
                    <>
                        <div className="pb-4 px-4 sm:max-w-[50%] mx-auto">
                            <p className="text-lg font-semibold mb-2">{noMatchContent.title}</p>
                            <p className="text-base">{noMatchContent.body}</p>
                        </div>
                        <InstallationInclusions />
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

                                const modelAddOns = installAddons.filter((addOn) => addOn.applyIf(answers, model));

                                let totalLow = model.baseCost;
                                let totalHigh = model.baseCost;

                                if (model.type === 'tankless') {
                                    totalHigh = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[1] ?? 0), 0);
                                }

                                const priceRange = model.type === 'tank'
                                    ? `$${totalLow.toLocaleString()}`
                                    : `$${totalLow.toLocaleString()}`
                                    // : (totalLow === totalHigh
                                    //     ? `$${totalLow.toLocaleString()}`
                                    //     : `$${totalLow.toLocaleString()} - $${totalHigh.toLocaleString()}`);

                                const cardRows = model.type === 'tank' ? 7 : 7;
                                const isExpanded = !!expandedFeatures[model.id];
                                const isAnodeInfoExpanded = !!expandedAnodeInfo[model.id];
                                const mobileVisibleBenefits = (model.benefits ?? []).slice(0, 2);
                                const mobileHiddenBenefits = (model.benefits ?? []).slice(2);

                                return (
                                    <div key={`${model.modelNumber}`} style={{gridRow: `span ${cardRows}`, display: 'grid', gridTemplateRows: 'subgrid'}} className={`w-full max-w-86 mt-12 first:mt-0 md:mt-0`}>
                                        {/* tier header */}
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
                                        <div className={`bg-base-100 border-x-2 px-4 pt-4 ${tierLabel === 'Recommended' ? 'border-primary/50' : 'border-base-300'}`}>
                                            <h3 className='text-xl font-black tracking-tight text-slate-900 leading-tight'>
                                                {getCompactCardTitle(model)}
                                            </h3>
                                            <p className='mt-1 text-sm text-gray-500 leading-snug'>
                                                {getCardSubtitle(model)}
                                            </p>
                                        </div>
                                        {/* warranty info */}
                                        <div className={`flex items-center justify-center border-x-2 space-x-2 p-2 ${tierLabel === 'Recommended' ? 'border-primary/50' : 'border-base-300'}`}>
                                            <span className="px-2.5 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-md border border-blue-100">
                                                {model?.type === 'tank' ? `${model?.warranty?.tank + 4 || 10}-Yr Tank` : `${model?.warranty?.heatExchanger || 12}-Yr HX`}
                                            </span>
                                            <span className="px-2.5 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-md border border-gray-100">
                                                {model?.warranty?.parts || 6}-Yr Parts
                                            </span>
                                            <span className="px-2.5 py-1 text-xs bg-primary/20 text-primary rounded-md border border-green-100 font-extrabold">
                                                {model?.warranty?.labor || 2}-Yr Labor
                                            </span>
                                        </div>

                                        {/* image */}
                                        <div className={`bg-base-100 border-x-2 px-4 ${tierLabel === 'Recommended' ? 'border-primary/50' : 'border-base-300'}`}>
                                            <img className='max-h-48 mx-auto my-6' src={imageMap[model.imagePath] ?? model.imagePath} alt={`${model.brand} ${model.label}`} />
                                        </div>
                                        {/* benefits + view details (fills remaining) */}
                                        <div className={`flex flex-col bg-base-100 border-x-2 border-b-2 shadow-lg ${tierLabel === 'Recommended' ? 'border-primary/50' : 'border-base-300'}`}>
                                            {model.benefits?.length > 0 && (
                                                <div className='md:hidden px-4'>
                                                    <ul className='text-left space-y-1.5'>
                                                        {mobileVisibleBenefits.map((benefit, idx) => (
                                                            <li key={`${model.id}-mobile-visible-${idx}`} className='flex items-start gap-2 text-sm'>
                                                                <span className='text-primary font-bold mt-0.5 shrink-0'>✓</span>
                                                                <span>{benefit}</span>
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div
                                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                                                    >
                                                        <ul className='text-left space-y-1.5 pb-1'>
                                                            {mobileHiddenBenefits.map((benefit, idx) => (
                                                                <li key={`${model.id}-mobile-hidden-${idx}`} className='flex items-start gap-2 text-sm'>
                                                                    <span className='text-primary font-bold mt-0.5 shrink-0'>✓</span>
                                                                    <span>{benefit}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {mobileHiddenBenefits.length > 0 && (
                                                        <button
                                                            type='button'
                                                            onClick={() => toggleExpandedFeatures(model.id)}
                                                            className='mt-2 mb-3 inline-flex items-center gap-1 text-sm font-medium text-primary underline'
                                                        >
                                                            <span>{isExpanded ? '- Hide Additional Benefits' : '+ View Additional Benefits'}</span>
                                                            <span className={`text-xs transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>▾</span>
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            {model.benefits?.length > 0 && (
                                                <ul className='hidden md:block text-left mt-1 mb-2 space-y-1.5 flex-grow px-4'>
                                                    {model.benefits.map((benefit, idx) => (
                                                        <li key={idx} className='flex items-start gap-2 text-sm'>
                                                            <span className='text-primary font-bold mt-0.5 shrink-0'>✓</span>
                                                            <span>{benefit}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* row 4: price */}
                                            <div className={`bg-base-100 px-4 ${tierLabel === 'Recommended' ? 'border-primary/50' : 'border-base-300'}`}>
                                                <div className='w-fit mx-auto flex flex-col items-left'>
                                                    <p className='mx-auto text-3xl text-left sm:text-4xl font-bold text-primary pb-2'>{priceRange} Installed</p>
                                                    {/* <p className='mx-auto text-sm text-gray-700 text-center leading-3 pt-2'>Includes All Required Code Upgrades</p>
                                                    <p className='mx-auto text-sm text-gray-700 text-center pb-2'>Parts • Labor • Tax • Permit • Haul-Away</p> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* check availability footer */}
                                        <div className='p-4 md:mb-8 rounded-b-lg bg-primary'>
                                            <button
                                                className='btn btn-secondary shadow-none w-full text-lg font-bold text-white border-none hover:bg-white/30'
                                                onClick={() => {
                                                    setSelectedModel({
                                                        ...model,
                                                        totalLow,
                                                        totalHigh,
                                                        modelAddOns
                                                    });
                                                    setShowConfirmModal(true);
                                                }}
                                            >
                                                Secure This Price & Book
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className='mt-2 md:mt-0 px-4 mb-6 text-sm text-center text-gray-600 leading-tight'>
                            <span>Showing options for </span>
                            {snapshotParts.map((part) => (
                                <span key={part} className='inline-block whitespace-nowrap mr-1'>
                                    {' '} • {part}
                                </span>
                            ))}{' '}
                            <a
                                href={`/instant-quote?${editSetupParams.toString()}`}
                                className='inline-block whitespace-nowrap text-primary underline font-medium'
                            >
                                (Edit Setup)
                            </a>
                        </p>
                        <InstallationInclusions />
                    </>
                )}
                {/* Micro-Review Trust Anchor */}
                <div className='w-full mx-auto px-4 py-8 bg-primary/10'>
                    <blockquote className='text-center'>
                        <p className='mx-auto max-w-2xl text-lg italic text-gray-800 mb-4'>
                            "I got quotes from 6 different companies... Jeff and Water Heater Replacement Company were the most affordable and provided top-notch service."
                        </p>
                        <footer className='text-sm text-gray-600 font-medium'>
                            — Gordon C., Grand Rapids - Verified Google Review (April 2026)
                        </footer>
                    </blockquote>
                </div>
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
                        <p className='p-4 max-w-3xl mx-auto text-sm text-gray-500'>*Prices shown apply to standard water heater replacements and are confirmed during the verification step.</p>

        </div>
    );
}
