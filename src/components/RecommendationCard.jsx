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
			<div className="flex justify-center mx-auto flex-col w-fit mt-12" >
				<a href="/booking/" className="btn btn-primary mb-4">Schedule Now</a>
				<a href="/find-a-water-heater/" className="btn btn-outline">Start Over</a>
			</div>
		</div>
	);
}
