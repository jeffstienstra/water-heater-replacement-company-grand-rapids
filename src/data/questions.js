const questions = [
	{
		paramKey: 'currentSystem',
		question: 'What type of water heater do you currently have?',
		options: [
			{label: 'Tank', value: 'tank'},
			{label: 'Tankless', value: 'tankless'}
		],
	},
	{
		paramKey: 'showers',
		question: 'How many showers are in your home?',
		optionLayout: 'keypad-3',
		options: [
			{label: '1', value: '1'},
			{label: '2', value: '2'},
			{label: '3', value: '3'},
			{label: '4', value: '4'},
			{label: '5', value: '5'},
			{label: '6+', value: 'plus'}
		],
	},
	{
		paramKey: 'fuel',
		question: 'What type of fuel does your water heater use?',
		options: [
			{label: 'Natural Gas', value: 'gas'},
			{label: 'Propane', value: 'propane'},
			{label: 'Electric', value: 'electric'},
		],
		disclaimer: 'If you have a fuel oil water heater please call us to discuss converting to a gas or electric model.',
		subQuestion: {
			paramKey: 'ventType',
			question: 'How is your current water heater vented?',
			options: [
				{
					label: 'Plastic (white PVC pipe)',
					value: 'pvc',
					hintImages: [
						{src: '/images/wh-example-pv.webp', alt: 'A water heater with a PVC vent pipe.'},
					],
					hintTitle: 'PVC/Plastic Venting',
					hintText: `If your water heater plugs into an electrical outlet and has a fan/blower on top it is a power vent water heater, vented with white plastic PVC pipe directly to the outside.`
				},
				{
					label: 'Metal (silver or gray pipe)',
					value: 'metal',
					hintImages: [
							{src: '/images/wh-example-natDraft.webp', alt: 'Water heater with a metal vent pipe.'},
						],
						hintTitle: 'Metal Venting',
						hintText: `If your water heater has a metal vent pipe (usually silver or gray) that runs from the top of the water heater to the ceiling, wall, or chimney, it is vented with metal. This is common for natural draft gas water heaters.`
				},
				// {label: "I don't know", value: 'unsure'}
			],
			disclaimer: 'The exhaust vent pipe is typically the largest pipe connected to the top of your water heater. It may run horizontally or vertically and is usually made of metal or plastic.',
			shouldShow: (answers) => {
				const fuel = answers.fuel;
				const isMobileHome = answers.isMobileHome === 'true';
				// Mobile/manufactured homes only vent in metal. Hide this subquestion there.
				return fuel && fuel !== 'electric' && !isMobileHome;
			},
		},
	},
	{
		paramKey: 'isMobileHome',
		question: 'Is this for a mobile home or manufactured home?',
		options: [
			{label: 'Yes', value: 'true'},
			{label: 'No', value: 'false'},
		],
	},
];

export default questions;