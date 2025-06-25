import Pricing from "./Pricing.astro";
import CalendarClock from "./icons/CalendarClock.astro";

export default function RecommendationCard({params}) {
	if (!params || typeof params.get !== 'function') {
		console.error('Invalid or missing URLSearchParams in RecommendationCard');
		return <p>Something went wrong with your recommendation.</p>;
	}

	const typeToRemove = params.get('typeToRemove');
	const vent = params.get('vent');
	const fuel = params.get('fuel');
	const peak = params.get('peak');
	const interest = params.get('interest');

	if (!typeToRemove || !fuel || !peak) {
		return <p>Missing answers. Please go back and complete the quiz.</p>;
	}

	return (
		<>
			<div
				className="max-w-4xl mx-auto -mt-6 bg-primary h-4 transition-all duration-300 ease-in-out rounded-t-sm"
				style={{width: `${100}`}}
			/>
			<div className="max-w-4xl mx-auto bg-white p-6 rounded-b-sm shadow text-center">
				<h2 className="text-2xl font-semibold mb-4">Your Recommended Water Heater</h2>
				<p className="mb-4">
					Based on your answers -<br/>Interested In: {interest}<br/>Type to Remove: {typeToRemove}<br/>Vent Type: {vent}<br/>Showers: {peak}<br/>Fuel: {fuel}<br/> we recommend:
				</p>
				<ul className="list-disc list-inside mb-4 text-left">
					<li>40-gallon {fuel} water heater</li>
					<li>Installed price range: $X,XXX – $X,XXX</li>
					<li>Most installs take 2–4 hours</li>
				</ul>
				<div className="flex justify-center mx-auto flex-col max-w-xs mt-12" >
					<a href="#schedule-estimate/" className="btn btn-primary text-lg h-fit  py-2 flex items-center mx-auto text-center">
						<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-calendar-clock mr-2">
							<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
							<path d="M10.5 21h-4.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v3" />
							<path d="M16 3v4" />
							<path d="M8 3v4" />
							<path d="M4 11h10" />
							<path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
							<path d="M18 16.5v1.5l.5 .5" />
						</svg>
						<p className="w-full">Book Online</p>
					</a>
					<a href={`/instant-quote/`} className="btn btn-ghost text-gray-500 h-fit py-2 flex items-center mx-auto mt-4 text-center">
						<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-rotate"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" /></svg>
						Start Over
					</a>
				</div>
			</div>
		</>
	);
}
