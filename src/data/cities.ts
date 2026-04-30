export interface CityEntry {
	city: string;
	state: string;
	slug: string;
	description: string;
	intro: string;
	lat: number;
	lon: number;
	googleMapsUrl?: string;
	faqs: { q: string; a: string }[];
}

export const cities: CityEntry[] = [
	{
		city: 'Grand Rapids',
		state: 'MI',
		slug: 'grand-rapids',
		description: 'Water heater replacement and repair services in Grand Rapids, MI — same-day installs, upfront pricing, no hidden fees.',
		intro: 'Grand Rapids is our primary service market. From Heritage Hill to the Southeast Side, Creston to West Side, we serve every Grand Rapids neighborhood with the same flat, transparent pricing and same-day availability.',
		lat: 42.9634,
		lon: -85.6681,
		faqs: [
			{
				q: 'Do you serve all Grand Rapids neighborhoods?',
				a: 'Yes — we cover the entire Grand Rapids city limits including Heritage Hill, East Hills, Creston, Eastown, the West Side, and the Southeast Side. Pricing is consistent throughout Grand Rapids and same-day or next-day scheduling is typically available.',
			},
			{
				q: 'How quickly can I get a water heater replaced in Grand Rapids?',
				a: 'If you contact us early in the day, we can often complete the replacement same-day. Next-day appointments are nearly always available. Use our instant quote tool to lock in your price and schedule in minutes.',
			},
			{
				q: 'Do you handle permits for Grand Rapids water heater replacements?',
				a: 'Yes. A Michigan mechanical permit is required for every water heater replacement in Grand Rapids. We apply for it, handle scheduling, and ensure the install passes inspection — all included in your price.',
			},
			{
				q: 'Can you install a tankless water heater in Grand Rapids?',
				a: 'Absolutely. We install both tank and tankless systems throughout Grand Rapids. Tankless installations require venting, gas line, and plumbing verification before we finalize your price — all handled during our free quote process.',
			},
		],
	},
	{
		city: 'Jenison',
		state: 'MI',
		slug: 'jenison',
		description: 'Fast, affordable water heater replacement in Jenison, MI. Tank and tankless installs with same-day availability.',
		intro: 'Jenison is our home base. As a local company based here, we know the area and its homes well — and you will often see the fastest response times in Jenison.',
		lat: 42.9069,
		lon: -85.8219,
		googleMapsUrl: 'https://www.google.com/maps/place/Jenison,+MI+49428/@42.9068765,-85.8397684,8438m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8819bb648844eb2d:0x43037f24b5d8ff90!8m2!3d42.907248!4d-85.7919784!16zL20vMHZuY24',
		faqs: [
			{
				q: 'Are you based in Jenison, MI?',
				a: 'Yes — our office and dispatch are based right here in Jenison. That means faster response times and a team that knows the neighborhood. We have replaced water heaters all over Jenison and understand the area well.',
			},
			{
				q: 'How fast can you respond to a water heater emergency in Jenison?',
				a: 'Being locally based in Jenison means we can often respond the same morning you call. For urgent leaks or failed water heaters, <a href="tel:616-315-0999" class="text-primary underline">call us directly at 616-315-0999</a> for the fastest scheduling.',
			},
			{
				q: 'Do you offer tankless water heater installation in Jenison?',
				a: 'Yes. We install and replace both tank and tankless units in Jenison. Our instant quote tool gives you a baseline price in 30 seconds, and we verify your specific setup before locking in the final number. Please note that upgrading from tank to tankless may require additional prep work that varies by home, which we will assess during the quote process.',
			},
			{
				q: 'Do you pull permits in Jenison, MI?',
				a: 'Yes. Every water heater replacement in Jenison requires a Michigan mechanical permit. We handle the entire permit and inspection process as part of every job. If another company is telling you otherwise, that is a red flag. A mechanical permit is not optional — it is required by law, and it protects you as a homeowner by ensuring the work is inspected and up to code.',
			},
		],
	},
	{
		city: 'Hudsonville',
		state: 'MI',
		slug: 'hudsonville',
		description: 'Water heater replacement and repair in Hudsonville, MI. Expert technicians, honest pricing, licensed and insured.',
		intro: 'Hudsonville is just a short drive from our Jenison base. We serve Hudsonville homeowners with the same same-day availability, upfront pricing, and 2-year labor warranty you would expect anywhere in our service area.',
		lat: 42.8701,
		lon: -85.8686,
		googleMapsUrl: 'https://www.google.com/maps/place/Hudsonville,+MI+49426/@42.8650574,-85.9003831,8443m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8819bea726a48edf:0xf3ff7c710c02055a!8m2!3d42.870859!4d-85.8650358!16zL20vMHZuYno',
		faqs: [
			{
				q: 'Do you replace water heaters in Hudsonville?',
				a: 'Yes. Hudsonville is a regular part of our service area and we can typically schedule same-day or next-day service throughout Hudsonville and the surrounding Ottawa County area.',
			},
			{
				q: 'What types of water heaters do you install in Hudsonville?',
				a: 'We install all types — gas and electric tank water heaters, tankless units, and heat pump/hybrid systems. Whatever your current Hudsonville home setup, we can match it or help you upgrade.',
			},
			{
				q: 'How much does a water heater replacement cost in Hudsonville?',
				a: 'Pricing is the same across our entire service area. Use our 30-second instant quote tool to get your exact installed price for your Hudsonville home. No salesman, no appointment needed.',
			},
			{
				q: 'Do you handle permits in Hudsonville, MI?',
				a: 'Yes. Michigan law requires a mechanical permit for all water heater replacements. We handle the permit application and inspection coordination for every Hudsonville job, included in your price.',
			},
		],
	},
	{
		city: 'Allendale',
		state: 'MI',
		slug: 'allendale',
		description: 'Reliable water heater replacement in Allendale, MI. Same-day service, upfront quotes, no surprises.',
		intro: 'Allendale is a regular stop for our technicians. The mix of residential neighborhoods and GVSU-area homes means we are well-acquainted with the area. Same upfront pricing and same-day availability as anywhere in West Michigan.',
		lat: 42.9814,
		lon: -85.9558,
		faqs: [
			{
				q: 'Do you serve Allendale, MI for water heater replacement?',
				a: 'Yes. Allendale is well within our service area. Whether you are in an established Allendale neighborhood or near the Grand Valley campus, we can schedule same-day or next-day service.',
			},
			{
				q: 'Are there extra charges to come to Allendale?',
				a: 'No. Our pricing is consistent throughout our service area and does not include travel surcharges. The price in your instant quote is what you pay in Allendale.',
			},
			{
				q: 'How do I get a price for water heater replacement in Allendale without calling?',
				a: 'Use our 30-second instant quote tool online. Answer a few quick questions about your water heater and home setup, and you will get your exact installed price — no email or phone number required to see your quote.',
			},
			{
				q: 'What if my Allendale water heater fails on a weekend?',
				a: 'We are available 7 days a week. Call 616-315-0999 for same-day or emergency water heater service in Allendale on weekends and evenings.',
			},
		],
	},
	{
		city: 'Wyoming',
		state: 'MI',
		slug: 'wyoming',
		description: 'Water heater replacement and repair in Wyoming, MI. Quick response, clear pricing, 2-year labor warranty.',
		intro: 'Wyoming is one of the most densely populated cities in West Michigan and one of our most active service areas. From Division Avenue to 28th Street, we are in Wyoming neighborhoods regularly.',
		lat: 42.9134,
		lon: -85.7053,
		faqs: [
			{
				q: 'Do you replace water heaters in Wyoming, MI?',
				a: 'Yes — Wyoming is one of our most active markets. We are in Wyoming neighborhoods regularly and can typically schedule same-day service throughout the city.',
			},
			{
				q: 'How do I know if my Wyoming water heater needs replacement or just repair?',
				a: 'We give you an honest diagnosis — our technicians are not commission-based, so there is no financial incentive to push a replacement you do not need. If your Wyoming water heater is repairable, we will tell you.',
			},
			{
				q: 'Do you handle all types of water heaters in Wyoming, MI?',
				a: 'Yes. We replace gas, electric, tank, and tankless water heaters throughout Wyoming. We also install hybrid/heat pump models. Your instant quote will reflect your specific unit type and setup.',
			},
			{
				q: 'Do you pull permits in Wyoming, Michigan?',
				a: 'Yes. A Michigan mechanical permit is required for all water heater replacements in Wyoming. We manage the permit and inspection process for every job.',
			},
		],
	},
	{
		city: 'Kentwood',
		state: 'MI',
		slug: 'kentwood',
		description: 'Same-day water heater replacement in Kentwood, MI. Tank and tankless, gas and electric — fully licensed and insured.',
		intro: 'Kentwood is one of our busiest service markets. We are in Kentwood regularly and provide the same fast, transparent service here as we do throughout greater Grand Rapids.',
		lat: 42.8690,
		lon: -85.6447,
		faqs: [
			{
				q: 'Do you serve Kentwood for water heater replacement?',
				a: 'Yes. Kentwood is a core part of our service area and one of our most frequently served cities. Same-day and next-day availability is the norm in Kentwood.',
			},
			{
				q: 'Can I get a quote for water heater replacement in Kentwood without an appointment?',
				a: 'Yes — use our 30-second instant quote tool online. Get your full installed price for your Kentwood home without a sales call or in-home visit. We verify your setup via photo or quick video before scheduling.',
			},
			{
				q: 'Is there a price difference between Kentwood and other cities?',
				a: 'No. Our pricing is consistent across the entire West Michigan service area. What you see in your instant quote is what you pay, regardless of which city you are in.',
			},
			{
				q: 'Do you replace water heaters on weekends in Kentwood?',
				a: 'Yes. We operate 7 days a week. Weekend appointments in Kentwood are available — call 616-315-0999 or get a quote online to schedule.',
			},
		],
	},
	{
		city: 'Walker',
		state: 'MI',
		slug: 'walker',
		description: 'Water heater replacement and repair in Walker, MI. Transparent pricing, no upsells, expert installation.',
		intro: 'Walker sits just northwest of Grand Rapids and is a regular part of our service area. We are in Walker frequently and can typically offer same-day or next-day availability with no travel surcharges.',
		lat: 43.0006,
		lon: -85.7680,
		faqs: [
			{
				q: 'Do you replace water heaters in Walker, MI?',
				a: 'Yes. Walker is a regular stop for our technicians. We can typically schedule same-day or next-day service throughout Walker with the same upfront, commission-free pricing we offer everywhere.',
			},
			{
				q: 'What if my Walker water heater is leaking?',
				a: 'A leaking tank body is typically a replacement situation. Call us at 616-315-0999 for urgent water heater service in Walker — we can walk you through safely shutting off the water supply while we get you scheduled.',
			},
			{
				q: 'Do you install tankless water heaters in Walker?',
				a: 'Yes. We install tankless water heaters throughout Walker. Tankless installations require additional prep — venting, gas lines, plumbing — all assessed during your no-obligation quote process.',
			},
			{
				q: 'Does my Walker water heater replacement require a permit?',
				a: 'Yes. Michigan law requires a mechanical permit for all water heater replacements in Walker. We handle permitting and inspection scheduling for every job at no extra charge.',
			},
		],
	},
	{
		city: 'Comstock Park',
		state: 'MI',
		slug: 'comstock-park',
		description: 'Water heater replacement in Comstock Park, MI. Fast installs, upfront quotes, 2-year labor warranty included.',
		intro: 'Comstock Park is just north of Grand Rapids and a regular part of our service area. Whether you are near the West Michigan Whitecaps stadium or deeper in the neighborhood, we are there with fast service and honest pricing.',
		lat: 43.0403,
		lon: -85.6728,
		faqs: [
			{
				q: 'Do you serve Comstock Park, MI for water heater replacement?',
				a: 'Yes. Comstock Park is within our core service area. We are in the area regularly and can typically offer same-day or next-day water heater replacement service.',
			},
			{
				q: 'How do I get an instant quote for water heater replacement in Comstock Park?',
				a: 'Use our online instant quote tool — answer a few quick questions about your water heater type, size, and home setup, and you will get your full installed price in 30 seconds. No salesman, no appointment required.',
			},
			{
				q: 'What brands do you install in Comstock Park?',
				a: 'We primarily install professional-grade Rheem water heaters — the same tier used by licensed contractors, not the budget models sold at big-box stores. Other brands are available on request.',
			},
			{
				q: 'Is emergency water heater service available in Comstock Park?',
				a: 'Yes. We are available 7 days a week for emergency water heater service in Comstock Park. Call 616-315-0999 for same-day response.',
			},
		],
	},
	{
		city: 'Byron Center',
		state: 'MI',
		slug: 'byron-center',
		description: 'Expert water heater replacement in Byron Center, MI. Same-day availability, honest diagnosis, no hidden fees.',
		intro: 'Byron Center is a growing community south of Grand Rapids that we serve regularly. From established neighborhoods to newer developments, we provide the same upfront pricing and quality installation throughout Byron Center.',
		lat: 42.8139,
		lon: -85.7219,
		faqs: [
			{
				q: 'Do you replace water heaters in Byron Center, MI?',
				a: 'Yes. Byron Center is part of our regular service area. We cover both established and newer neighborhoods throughout Byron Center with same-day and next-day availability.',
			},
			{
				q: 'Can you install a tankless water heater in my Byron Center home?',
				a: 'Yes. Many Byron Center homes are well-suited for tankless upgrades. Our instant quote provides a baseline, and we assess your home specific venting and gas line setup before committing to a final price.',
			},
			{
				q: 'Is the pricing the same in Byron Center as Grand Rapids?',
				a: 'Yes — our pricing is consistent across the entire West Michigan area. No travel fees, no area upcharges. What you see in your instant quote is what you pay.',
			},
			{
				q: 'Does Byron Center require a permit for water heater replacement?',
				a: 'Yes. Michigan law requires a mechanical permit for all water heater replacements. We handle permitting and inspection as part of every Byron Center installation, included in your price.',
			},
		],
	},
	{
		city: 'East Grand Rapids',
		state: 'MI',
		slug: 'east-grand-rapids',
		description: 'Water heater replacement and repair in East Grand Rapids, MI. Licensed technicians, clear pricing, same-day service.',
		intro: 'East Grand Rapids is an established residential community we serve with the same care and precision we bring to every job. We understand EGR homeowners expectations for quality and deliver accordingly.',
		lat: 42.9578,
		lon: -85.6097,
		faqs: [
			{
				q: 'Do you serve East Grand Rapids for water heater replacement?',
				a: 'Yes. East Grand Rapids is a regular part of our service area. We are familiar with the neighborhood and the standards EGR homeowners expect — same-day and next-day scheduling available.',
			},
			{
				q: 'How quickly can I get a water heater replaced in East Grand Rapids?',
				a: 'Same-day and next-day appointments are typical in East Grand Rapids. Use our instant quote tool to get your price and schedule in minutes — no sales call required.',
			},
			{
				q: 'Do you handle older homes with less common setups in East Grand Rapids?',
				a: 'Yes. We are experienced with the variety of plumbing and venting configurations found in East Grand Rapids, including older homes with unique setups. We verify your configuration before committing to a final price.',
			},
			{
				q: 'Is pricing the same in East Grand Rapids as the rest of West Michigan?',
				a: 'Yes — our pricing is flat and consistent across all service areas. You will not pay more based on your zip code.',
			},
		],
	},
	{
		city: 'Ada',
		state: 'MI',
		slug: 'ada',
		description: 'Water heater replacement in Ada, MI. Professional installation of tank and tankless units with upfront pricing.',
		intro: 'Ada is a regular part of our service territory. Whether you have a standard setup or a more complex installation, we provide honest pricing and expert workmanship in Ada.',
		lat: 42.9578,
		lon: -85.4961,
		faqs: [
			{
				q: 'Do you replace water heaters in Ada, MI?',
				a: 'Yes. Ada is a regular part of our service territory. We are familiar with the variety of home setups in Ada and provide the same upfront pricing and same-day availability as anywhere in our service area.',
			},
			{
				q: 'Can you handle a high-demand water heater system in Ada?',
				a: 'Yes. Many Ada homes benefit from larger-capacity or tankless systems. We assess your home gas capacity, venting options, and water demand to recommend the right solution — with no upsell pressure.',
			},
			{
				q: 'How do I schedule water heater service in Ada without a sales visit?',
				a: 'Use our online instant quote tool. Get your exact installed price in 30 seconds, then submit a photo of your current setup to verify the details. No in-home sales visit required.',
			},
			{
				q: 'Do you pull permits in Ada, MI?',
				a: 'Yes. We manage the permit and inspection process for every Ada job. It is required by Michigan law and included in your quoted price.',
			},
		],
	},
	{
		city: 'Caledonia',
		state: 'MI',
		slug: 'caledonia',
		description: 'Reliable water heater replacement in Caledonia, MI. Same-day installs, 2-year labor warranty, no surprises.',
		intro: 'Caledonia rural and suburban character means homes often have unique configurations — older venting setups, well water, varied plumbing. We are experienced with the full range of situations in Caledonia and price everything transparently.',
		lat: 42.7878,
		lon: -85.5258,
		faqs: [
			{
				q: 'Do you serve Caledonia, MI for water heater replacement?',
				a: 'Yes. Caledonia is part of our service area, and we are familiar with the variety of home configurations there — from newer subdivisions to older rural properties with less common setups.',
			},
			{
				q: 'Do you work on water heaters in homes with well water in Caledonia?',
				a: 'Yes. Hard water and well water can accelerate wear on water heater components. We are familiar with conditions in Caledonia and can advise on unit choices that hold up well in harder water environments.',
			},
			{
				q: 'How much does water heater replacement cost in Caledonia?',
				a: 'Pricing is the same across our service area. Use our 30-second instant quote tool to get your exact installed price for your Caledonia home. No salesman, no appointment, no hidden fees.',
			},
			{
				q: 'Do you serve rural Caledonia properties?',
				a: 'Yes. Whether you are in a Caledonia subdivision or a rural property south of Grand Rapids, we provide the same service quality, pricing, and warranty.',
			},
		],
	},
	{
		city: 'Zeeland',
		state: 'MI',
		slug: 'zeeland',
		description: 'Water heater replacement and repair in Zeeland, MI. Tank and tankless specialists, fast service, honest pricing.',
		intro: 'Zeeland is a growing Ottawa County community we serve regularly. Honest pricing, same-day availability, and a 2-year labor warranty are standard on every job we complete in Zeeland.',
		lat: 42.8128,
		lon: -86.0178,
		faqs: [
			{
				q: 'Do you serve Zeeland for water heater replacement?',
				a: 'Yes. Zeeland is within our regular Ottawa County service area. We can typically schedule same-day or next-day service and provide the same transparent pricing as anywhere in West Michigan.',
			},
			{
				q: 'Are there extra charges to come to Zeeland?',
				a: 'No. Our pricing is consistent and does not include travel surcharges. The price in your instant quote is what you pay in Zeeland.',
			},
			{
				q: 'What types of water heaters do you install in Zeeland?',
				a: 'We install gas and electric tank water heaters, tankless units, and heat pump/hybrid systems throughout Zeeland. Our instant quote tool will match you to the right unit based on your current setup.',
			},
			{
				q: 'Do you handle permits for Zeeland, MI water heater replacements?',
				a: 'Yes. Michigan mechanical permit requirements apply in Zeeland. We apply for the permit, coordinate the inspection, and make sure everything is code-compliant — included in your price.',
			},
		],
	},
	{
		city: 'Holland',
		state: 'MI',
		slug: 'holland',
		description: 'Water heater replacement in Holland, MI. Expert installation with same-day availability throughout West Michigan.',
		intro: 'Holland is at the western edge of our service area, but one we cover regularly. The community mix of full-time residents and lakeside properties means water heater needs can be urgent — we respond accordingly with fast scheduling and upfront pricing.',
		lat: 42.7875,
		lon: -86.1089,
		faqs: [
			{
				q: 'Do you replace water heaters in Holland, MI?',
				a: 'Yes. Holland is within our service area. We cover Holland proper and the surrounding Holland Township. Same-day availability depends on scheduling, but next-day appointments are typically available.',
			},
			{
				q: 'Is there a travel fee for Holland?',
				a: 'No — our pricing is flat and consistent across all cities we serve. There are no travel fees or area surcharges for Holland.',
			},
			{
				q: 'Can you install a tankless water heater in Holland?',
				a: 'Yes. We install tankless water heaters throughout Holland. Our quote process verifies your home venting, gas line, and plumbing configuration before we finalize the price.',
			},
			{
				q: 'Do you service seasonal or vacation properties in Holland?',
				a: 'Yes. If you have a seasonal home near Lake Macatawa or Lake Michigan, we can coordinate timing to fit your schedule. Call 616-315-0999 to discuss your situation.',
			},
		],
	},
	{
		city: 'Grandville',
		state: 'MI',
		slug: 'grandville',
		description: 'Fast water heater replacement in Grandville, MI. Licensed, insured, upfront pricing, 2-year labor warranty.',
		intro: 'Grandville sits just southwest of Grand Rapids and is one of our most active markets. Easy highway access means fast response times, and we have extensive experience with Grandville homes of all ages and configurations.',
		lat: 42.9084,
		lon: -85.7614,
		googleMapsUrl: 'https://www.google.com/maps/place/Grandville,+MI/@42.9038525,-85.7780549,8438m/data=!3m2!1e3!4b1!4m6!3m5!1s0x88185242bae1f0fd:0xeebf1778716ffe33!8m2!3d42.9097484!4d-85.7630885!16zL20vMHY5cjc',
		faqs: [
			{
				q: 'Do you replace water heaters in Grandville?',
				a: 'Yes. Grandville is one of our most frequently served cities. Easy highway access means fast response times, and same-day or next-day appointments are readily available.',
			},
			{
				q: 'How do I get a water heater quote in Grandville without a salesman?',
				a: 'Use our 30-second online instant quote tool. Enter your home water heater details and get your full installed price — no phone number, no email, no sales visit required.',
			},
			{
				q: 'Do you service both older and newer Grandville homes?',
				a: 'Yes. Grandville has a mix of older and newer homes with different venting and plumbing configurations. We handle all setups and verify your home specifics before locking in your final price.',
			},
			{
				q: 'Does a Grandville water heater replacement require a permit?',
				a: 'Yes. A Michigan mechanical permit is required in Grandville. We handle permitting and inspection scheduling as part of every job, included in your price.',
			},
		],
	},
];
