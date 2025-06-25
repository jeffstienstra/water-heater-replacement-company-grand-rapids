import Pricing from "./Pricing.astro";
import CalendarClock from "./icons/CalendarClock.astro";
import waterHeaterModels from "../data/waterHeaterModels.js";
import installAddons from "../data/installAddons.js";


export default function RecommendationCard({params}) {
	if (!params || typeof params.get !== 'function') {
		console.error('Invalid or missing URLSearchParams in RecommendationCard');
		return <p>Something went wrong with your recommendation.</p>;
	}

	const answers = Object.fromEntries(params.entries());

	// Match models based on quiz answers
	const matchedModels = waterHeaterModels.filter(model => {
		return Object.entries(model.conditions).every(([key, validValues]) => {
			return validValues.includes(answers[key]);
		});
	});

	if (matchedModels.length === 0) {
		return <p>No suitable models found. Please check your answers or contact support.</p>;
	}

	// Evaluate applicable add-ons
	const applicableAddOns = installAddons.filter(addOn => addOn.applyIf(answers));
	const totalAddOnLow = applicableAddOns.reduce((sum, addOn) => sum + (addOn.cost?.[0] ?? 0), 0);
	const totalAddOnHigh = applicableAddOns.reduce((sum, addOn) => sum + (addOn.cost?.[1] ?? 0), 0);

	// Sort by tier
	const tierOrder = {good: 1, better: 2, best: 3};
	matchedModels.sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

	return (
		<div className="w-full mx-auto max-w-8xl mt-22 px-2">
			<div
				className="mx-auto -mt-6 bg-primary h-4 transition-all duration-300 ease-in-out rounded-t-sm"
				style={{width: `100%`}}
			/>
			<div className="mx-auto bg-white p-4 sm:p-6 rounded-b-sm shadow text-center">
				<h2 className="text-2xl font-semibold mb-4">Your Recommended Water Heaters</h2>
				<p className="mb-6 text-sm text-gray-500">Based on your answers, we recommend the following options:</p>

				<div
					className="
						grid
						grid-cols-1
						sm:grid-cols-2
						lg:grid-cols-3
						gap-4
						justify-items-center
						w-full
						mx-auto
						max-w-6xl
					"
				>
					{matchedModels.map((model) => {
						const totalLow = (model.baseCost?.[0] ?? 0) + totalAddOnLow;
						const totalHigh = (model.baseCost?.[1] ?? 0) + totalAddOnHigh;
						return (
							<div
								key={model.id}
								className="
									bg-base-100
									border border-base-300
									rounded-xl
									shadow-md
									p-4 sm:p-6
									text-left
									flex flex-col
									w-full
									min-w-56
									max-w-84
									mx-auto
								"
							>
								<div className="flex-grow">
									<h3 className="text-xl font-semibold mb-2">{model.label}</h3>
									<p className="text-3xl sm:text-4xl font-bold text-primary">
										${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}
									</p>
									<p className="text-sm text-gray-500 mb-2">Total installed price range</p>
									<p className="text-sm text-gray-600 mb-6">{model.notes}</p>
									{applicableAddOns.length > 0 && (
										<>
										<p className="text-sm text-gray-500 mb-2">
											Site verification may remove the following add-ons:
										</p>
										<ul className="list-disc list-inside text-sm text-gray-500 mb-4">
											{applicableAddOns.map(addOn => (
												<li key={addOn.id}>
													${addOn?.cost[0].toLocaleString()} - ${addOn?.cost[1].toLocaleString()} – {addOn.label}
												</li>
											))}
										</ul>
										</>
									)}
								</div>
								<a href="#schedule-estimate/" className="w-full btn btn-primary text-lg h-fit py-2 flex items-center mx-auto text-center mt-2">
									<p className="w-full">Book Now</p>
								</a>
								<a href={`/products/${model.id}`} className="w-full btn btn-outline text-lg h-fit py-2 flex items-center mx-auto mt-4 text-center">
									Learn More
								</a>
							</div>
						);
					})}
				</div>

				<p className="text-sm text-gray-500 mt-6">
					*Venting, electrical and gas line upgrades are where we run into the largest price changes but most requirements can usually be clarified via video call or home visit.
				</p>
				<p className="text-sm text-gray-500 my-6">
					Final price is always provided by email or text before work begins.
				</p>
			</div>
		</div>
	);
}