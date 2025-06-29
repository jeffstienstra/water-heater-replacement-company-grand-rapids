import {useState} from 'react';
import {questions} from './FindWaterHeaterQuiz.jsx';

import Star from "./icons/Star.jsx";
import Pricing from "./Pricing.astro";
import CalendarClock from "./icons/CalendarClock.astro";
import waterHeaterModels from "../data/waterHeaterModels.js";
import installAddons from "../data/installAddons.js";

export default function RecommendationCard({params}) {
	const [showAnswers, setShowAnswers] = useState(false);
	const [warrantySelections, setWarrantySelections] = useState({});

	const toggleWarranty = (modelId) => {
		setWarrantySelections(prev => ({
			...prev,
			[modelId]: !prev[modelId]
		}));
	};

	if (!params || typeof params.get !== 'function') {
		console.error('Invalid or missing URLSearchParams in RecommendationCard');
		return <p>Something went wrong with your recommendation.</p>;
	}

	const answers = Object.fromEntries(params.entries());
	console.log('answers:', answers);

	function toTitleCase(str) {
		return str.replace(/([A-Z])/g, ' $1')
			.replace(/^./, s => s.toUpperCase())
			.replace(/\b\w/g, c => c.toUpperCase())
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
		.filter(([key]) => key !== "step")
		.map(([key, value]) => {
			const question = findQuestionByParamKey(questions, key);
			let label = value;
			if (question) {
				const option = question.options.find(opt => opt.value === value);
				if (option) label = option.label;
			}
			return {
				key: toTitleCase(key),
				value: label
			};
		});

	const matchedModels = waterHeaterModels.filter(model => {
		return Object.entries(model.conditions).every(([key, validValues]) => {
			// If the condition isn't in user answers, skip it
			if (!(key in answers)) return true;

			const answerValue = answers[key];
			return Array.isArray(validValues)
				? validValues.includes(answerValue)
				: validValues === answerValue;
		});
	});

	matchedModels.sort((a, b) => a.baseCost - b.baseCost);
	const tierLabels = ['Standard', 'Recommended', 'Upgrade'];
	let limitedModels = matchedModels.slice(0, 3);

	const fallbackTankless = waterHeaterModels.find(model =>
		model.id === 'tankless_prestige_recommended' &&
		Object.entries(model.conditions).every(([key, validValues]) => {
			if (!(key in answers)) return true;
			const answerValue = answers[key];
			return Array.isArray(validValues)
				? validValues.includes(answerValue)
				: validValues === answerValue;
		})
	);

	if (limitedModels.length === 2 && fallbackTankless) {
		limitedModels.push(fallbackTankless);
	}


	console.log('limitedModels:', limitedModels);
	// const applicableAddOns = installAddons.filter(addOn => addOn.applyIf(answers, limitedModels));
	// const totalAddOnLow = applicableAddOns.reduce((sum, addOn) => sum + (addOn.cost?.[0] ?? 0), 0);
	// const totalAddOnHigh = applicableAddOns.reduce((sum, addOn) => sum + (addOn.cost?.[1] ?? 0), 0);

	return (
		<div className="w-full mx-auto max-w-8xl mt-6">
			<div className="mx-auto -mt-6 bg-primary h-4 rounded-t-sm" />
			<div className="mx-auto bg-white p-4 sm:p-6 rounded-b-sm shadow text-center">
				<h2 className="text-2xl font-semibold mb-4">Your Recommended Water Heaters</h2>
				<div className="mb-2">
					<button
						className="text-sm text-primary underline focus:outline-none"
						onClick={() => setShowAnswers(v => !v)}
						aria-expanded={showAnswers}
						aria-controls="user-answers-dropdown"
					>
						{showAnswers ? "Hide your answers ▲" : "Show your answers ▼"}
					</button>
					{showAnswers && (
						<div id="user-answers-dropdown" className="mt-2 bg-base-100 border border-base-300 rounded p-3 text-left max-w-sm mx-auto shadow">
							<ul className="text-sm">
								{displayAnswers.map(({ key, value }) => (
									<li key={key} className="flex justify-between py-1 border-b border-base-200 last:border-b-0">
										<span className="font-medium">{key}</span>
										<span className="text-gray-700 text-right pl-4">{value}</span>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				{matchedModels.length === 0 ? (
					<p>No suitable models found. Please check your answers or contact support.</p>
				)
				: (
					<>
						<p className="mb-6 text-sm text-gray-500">Based on your answers, we recommend the following options:</p>

						<div className="flex flex-wrap justify-center items-stretch gap-8">
							{limitedModels.map((model, index) => {
								let productLink;
								if (model.type === 'tankless') {
								productLink = `/products/tankless-water-heaters/`;
								} else if (model.type === 'tank' && model.ventType === 'pvc') {
								productLink = `/products/power-vent-water-heaters/`;
								} else if (model.type === 'tank' && model.ventType === 'metal') {
								productLink = `/products/tank-water-heaters/`;
								} else {
								// fallback for any other tank types (if needed)
								productLink = `/products/tank-water-heaters/`;
								};

								const tierLabel = (model.id === 'tankless_prestige_recommended' ? 'Consider an Upgrade?' : tierLabels[index]);

								const isWarrantySelected = warrantySelections[model.id];
								const modelAddOns = installAddons.filter(addOn =>
									addOn.applyIf(answers, model) || (isWarrantySelected && addOn.id === 'add_extended_warranty')
								);

								const totalLow = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[0] ?? 0), 0);
								const totalHigh = model.baseCost + modelAddOns.reduce((sum, a) => sum + (a.cost?.[1] ?? 0), 0);

								return (
									<div key={model.id} className="flex flex-col w-full max-w-86 bg-base-100 border border-base-300 rounded-lg shadow-md p-4 sm:p-6">
										<div className="flex-grow">
											{tierLabel === 'Recommended' ?
											(
												<div className="flex justify-center items-center ">
												<Star className="text-primary"/>
												<h2 className="ml-2 font-bold text-2xl text-primary">{tierLabel}</h2>
											</div>
											) : (
												<h2 className="font-bold text-2xl text-primary">{tierLabel}</h2>
											)}

											<h3 className="text-xl font-semibold mb-2">{model.label}</h3>
											<p className="text-3xl sm:text-4xl font-bold text-primary">
												${totalLow.toLocaleString()} {totalLow.toLocaleString() === totalHigh.toLocaleString() ? null : ` – $${totalHigh.toLocaleString()}`}
											</p>
											<p className="text-sm text-gray-500 mb-2">Total installed price range</p>


											<p className="text-sm text-gray-600 mb-4">{model.notes}</p>
											<ul className=" text-left text-gray-600 mb-6">
												{model.uef && <li>UEF Rating: <span className='font-semibold'>{model.uef}</span></li>}
												{model.gpm && <li>Max Flow: <span className='font-semibold'>{model.gpm} GPM</span></li>}
												<li>
													Warranty:
													<ul className="pl-6 list-disc">
														<li><span className="font-semibold">{model.warranty.tank} Year Tank</span></li>
														<li><span className="font-semibold">{model.warranty.parts} yr parts</span></li>
														<li><span className="font-semibold">{model.warranty.labor} yr labor</span></li>
													</ul>
												</li>
											</ul>
											<div className="border border-base-300 rounded-lg shadow-sm pl-4 flex flex-row items-center gap-2 my-3">
												<input
													id={`warranty-${model.id}`}
													className="checkbox checkbox-primary rounded-sm"
													type="checkbox"
													checked={isWarrantySelected || false}
													onChange={() => toggleWarranty(model.id)}
												/>
												<label htmlFor={`warranty-${model.id}`} className="text-sm text-left p-4 text-gray-600">
													<ul className='font-semibold'>Add Extended Warranty
														<li>{model.type === 'tankless' ? 'Heat exchanger:' : 'Tank: '}{model.warranty.tank + 4} Years</li>
														<li>Labor: {model.warranty.labor + 1} Years</li>
													</ul>
												</label>
												{/* <label htmlFor={`warranty-${model.id}`} className="text-sm text-left p-4 text-gray-700">
													<ul>Add Extended Warranty
														<li>{model.type === 'tankless' ? 'Heat exchanger:' : 'Tank: '} +4 = {model.warranty.tank + 4} Years</li>
														<li>Parts: +0 = {model.warranty.parts} Years</li>
														<li>Labor: +1 = {model.warranty.labor + 1} Years</li>
													</ul>
												</label> */}
											</div>
										</div>
										{modelAddOns.length > 0 && (
											<div className="bg-gray-50 border border-gray-200 rounded text-left p-3 mt-auto mb-4">
												<p className="text-sm font-semibold mb-2">What's included in your price range:</p>
												<ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
													{modelAddOns.map(addOn => (
														<li key={addOn.id}>
															<span className="font-medium">{addOn.label}:</span>
															<span className="text-gray-500"> ${addOn.cost[0]?.toLocaleString()}{addOn.cost[0] !== addOn?.cost[1] ? `-${addOn.cost[1].toLocaleString()}` : null}</span>
														</li>
													))}

												</ul>
											</div>
										)}


										<a href="#schedule-estimate/" className="w-full btn btn-primary text-lg h-fit py-2 flex items-center mx-auto text-center mb-4">
											<p className="w-full">Book Now</p>
										</a>
										<a target="_blank" href={productLink} className="w-full btn btn-outline text-lg h-fit py-2 flex items-center mx-auto text-center">
											See Product Details
										</a>
									</div>
								);
							})}
						</div>

						{/* <p className="text-sm text-gray-500 mt-6">
							*Venting, electrical and gas line upgrades are where we run into the largest price changes but most requirements can usually be clarified via video call or home visit.
						</p> */}
						<p className="text-sm text-gray-500 my-6">
							Final price is always provided by email or text before work begins.
						</p>
						</>
					)}
				</div>
		</div>
	);
}
