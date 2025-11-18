const questions = [
	{
		paramKey: 'interestedIn',
		question: 'What type of water heater are you interested in?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'},
		],
	},
	{
		paramKey: 'neededCapacity',
		question: 'What size tank water heater do you need?',
		options: [
			{label: 'Standard: 40-50 Gallons (most common)', value: 'standard'},
			{label: 'Large: 60-75 Gallons', value: 'large'},
			{label: 'Extra Large: 80+ Gallons', value: 'XL'},
		],
		shouldShow: (answers) => answers.interestedIn === 'tank',
	},
	{
		paramKey: 'typeToRemove',
		question: 'What type of water heater will be removed?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'}
		],
		shouldShow: (answers) => answers.interestedIn === 'tankless',
	},
	{
		paramKey: 'homeType',
		question: 'What type of home do you have?',
		options: [
			{label: 'Single Family Home', value: 'singleFamily'},
			{label: 'Townhome', value: 'townhome'},
			{label: 'Mobile Home', value: 'mobileHome'},
			{label: 'Condo/Apartment', value: 'condo'},
		],
	},
	{
		paramKey: 'showers',
		question: 'How many showers are in your home?',
		options: [
			{label: '1', value: '1'},
			{label: '2', value: '2'},
			{label: '3+', value: '3'}
		],
	},
	{
		paramKey: 'location',
		question: 'Where is your water heater located?',
		options: [
			{label: 'Basement', value: 'basement'},
			{label: 'Crawlspace', value: 'crawlspace'},
			{label: 'Closet', value: 'closet'},
			{label: "I don't know", value: 'unsure'}
		],
	},
	{
		paramKey: 'fuel',
		question: 'What fuel type does your water heater use?',
		options: [
			{label: 'Natural Gas', value: 'gas'},
			{label: 'Electric', value: 'electric'},
			{label: 'Propane', value: 'propane'},
			{label: 'Fuel Oil', value: 'oil'}
		],
		subQuestion: {
			paramKey: 'ventType',
			question: 'How is your current water heater vented?',
			options: [
				{label: 'Plastic', value: 'pvc'},
				{label: 'Metal', value: 'metal'},
				// {label: "I don't know", value: 'unsure'}
			],
			shouldShow: (answers) => {
				const fuel = answers.fuel;
				return fuel && fuel === 'gas' || fuel === 'propane';
			},
			subQuestion: {
				paramKey: 'ventingTermination',
				question: "How does your water heater's metal vent exit the home?",
				options: [
					{
						label: 'Vertically through a metal vent',
						value: 'metalVent',
						hintImages: [
							{src: '/images/wh-bvent.webp', alt: 'A metal vent pipe running vertically from a water heater through the ceiling'},
						],
						hintTitle: 'Vertical Metal Venting',
						hintText: `This is a standard natural draft water heater vented vertically with metal venting.<br/><br/>
							It may connect to a larger metal vent or combine with your furnace or other metal vent pipe and exit together through the ceiling.<br/><br/>
							Your setup may vary, but the place it exits the room is most important — vertically through the ceiling.`
					},
					{
						label: 'Horizontally into a chimney (brick, cinder block, cement, etc)',
						value: 'chimney',
						hintImages: [
							{src: '/images/wh-metalVenting.webp', alt: 'A metal vent pipe running horizontally from a water heater to a masonry chimney'},
						],
						hintTitle: 'Horizontal Venting Into Chimney',
						hintText: `This is a standard natural draft water heater vented horizontally into a masonry chimney.<br/><br/>
							It has a metal vent pipe that runs from the top of the water heater to the chimney. Your water heater may combine its metal vent with your furnace or other metal vent pipes before reaching the chimney — that is perfectly fine.<br/><br/>
							This is the general idea of what to look for.`
					},
					{label: "I don't know", value: 'unsure'}
				],
				subQuestion: {
					paramKey: 'hasChimneyLiner',
					question: 'Does your chimney already have a flexible stainless steel liner installed?',
					options: [
						{
							label: 'Yes',
							value: 'yes',
							hintImages: [
								{src: '/images/wh-linerCap4.webp', alt: `If your home's chimney has a metal cap similar to this, its a good sign that a chimney liner is already installed. Your cap may have a slightly different design but should be metal.`},
								{src: '/images/wh-linerCap2.webp', alt: `If your home's chimney has a metal cap similar to this, its a good sign that a chimney liner is already installed. Your cap may have a slightly different design but should be metal.`},
								{src: '/images/wh-LinerCap3.webp', alt: `If your home's chimney has a metal cap similar to this, its a good sign that a chimney liner is already installed. Your cap may have a slightly different design but should be metal.`},
								{src: '/images/wh-linerCap.webp', alt: `If your home's chimney has a metal cap similar to this, its a good sign that a chimney liner is already installed. Your cap may have a slightly different design but should be metal.`},
								{src: '/images/wh-chimneyLiner.webp', alt: 'A chimney liner may look like a shiny metal corrugated tube protruding from the chimney'},
								{src: '/images/wh-chimneyLiner-sleeve-cutaway.webp', alt: `The mortar around this liner has been cut away so you can see the liner's protective metal sleeve. Sometimes the smooth sleeve is all you'll see protruding from the chimney, not the corrugated tube passing through it.`},
								{src: '/images/wh-chimneyLiner3.webp', alt: 'You can see the sleeve and corrugated metal liner inside the chimney, indicating this chimney is already properly lined.'},
							],
							hintTitle: 'Identifying A Chimney Liner',
							hintText: `
								<strong>Look for:</strong> A shiny metal sleeve or corrugated tubing protruding from the chimney.<br/><br/>
								<strong>Here’s why a chimney liner matters:</strong>
								<ul class="list-disc text-left pl-6 mb-4">
									<li>A chimney liner install adds to your cost</li>
									<li>Michigan Mechanical Code requires us to install one if it does not exist</li>
									<li>It protects the masonry from acidic flue gases</li>
									<li>Improves venting efficiency and appliance performance</li>
									<li>Reduces carbon monoxide risk in your home</li>
								</ul>
							`
						},
						{
							label: 'No',
							value: 'no',
							hintImages: [
								{
									src: '/images/wh-noLiner4.webp',
									alt: `If your chimney has no metal cap on top, it likely does not have a stainless liner installed.`
								},
								{
									src: '/images/wh-noLiner5.webp',
									alt: `If your chimney has no metal cap on top, it likely does not have a stainless liner installed.`
								},
								{
									src: '/images/wh-noLiner3.webp',
									alt: `There is no sign of a sleeve or corrugated tube in this chimney. The metal vent is inserted directly through a metal plate and into the chimney.<br/>`
								},
								{
									src: '/images/wh-noLiner1.webp',
									alt: `<span class="font-bold">A</span>. Uneven or crumbling mortar around the vent pipe.
										<span class="font-bold">B</span>. No sign of a sleeve and corrugated tube passing through it to connect to the metal vent.<br/>
										These are signs that the chimney has not been lined.`
								},
								{
									src: '/images/wh-noLiner2.webp',
									alt: `There is no sign of a sleeve or corrugated tube in this chimney. The water heater's metal vent is inserted directly into the chimney.<br/>
										This is a sign that the chimney has not been lined.`
								},
							],
							hintTitle: 'No Chimney Liner Present',
							hintText: `<strong>Look for:</strong> A rough, unlined interior of the chimney.<br/><br/>
								<strong>What this means:</strong>
								<ul class="list-disc text-left pl-6 mb-4">
									<li>We will need to install a chimney liner for safety and code compliance</li>
									<li>This adds to your installation cost</li>
									<li>It protects your chimney from acidic flue gases</li>
									<li>Improves venting efficiency and appliance performance</li>
									<li>Reduces carbon monoxide risk in your home</li>
								</ul>
							`
						},
						{label: "I don't know", value: 'unsure'}
					],
					shouldShow: (answers) => answers.ventingTermination === 'chimney',
				},
				shouldShow: (answers) => {
					const ventType = answers.ventType;
					const fuel = answers.fuel;
					return ventType && ventType === 'metal' || fuel && fuel === 'oil';
				},
			}
		},
	},
];

export default questions;