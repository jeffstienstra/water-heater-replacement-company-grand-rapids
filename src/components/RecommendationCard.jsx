import Pricing from "./Pricing.astro";

export default function RecommendationCard({params}) {
	if (!params || typeof params.get !== 'function') {
		console.error('Invalid or missing URLSearchParams in RecommendationCard');
		return <p>Something went wrong with your recommendation.</p>;
	}

	const existing = params.get('existing');
	const fuel = params.get('fuel');
	const people = params.get('people');
	const peak = params.get('peak');

	if (!existing || !fuel || !people || !peak) {
		return <p>Missing answers. Please go back and complete the quiz.</p>;
	}

	return (
		<div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow text-center">
			<h2 className="text-2xl font-semibold mb-4">Your Recommended Water Heater</h2>
			<p className="mb-4">
				Based on your answers ({people} people, {peak} showers, fuel: {fuel}), we recommend:
			</p>
			<ul className="list-disc list-inside mb-4 text-left">
				<li>40-gallon {fuel} water heater</li>
				<li>Installed price range: $X,XXX – $X,XXX</li>
				<li>Most installs take 2–4 hours</li>
			</ul>
			<div className="flex justify-center mx-auto flex-col w-xs mt-12" >
				<a href="#schedule-estimate/" class="btn btn-primary text-lg h-fit py-2 flex items-center mx-auto text-center">
					<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={2} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock mr-2">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
						<path d="M16 3v4" />
						<path d="M8 3v4" />
						<path d="M4 11h10" />
						<path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
						<path d="M18 16.5v1.5l.5 .5" />
					</svg>
					<p class="w-full">Schedule Virtual Estimate</p>
				</a>
				<a href={`/find-a-water-heater/`} class="btn btn-outline text-lg h-fit py-2 flex items-center mx-auto mt-4 text-center">
					Start Over
				</a>
			</div>
		</div>
	);
}
