const waterHeaterModels = [
	{
		id: 'gas_tank_40_good',
		type: 'tank',
		fuel: 'gas',
		size: '40',
		tier: 'good',
		label: 'Standard 40-Gallon Gas Water Heater',
		baseCost: [1200, 1500], // installed price range
		notes: 'Most common choice for 2–3 person households',
		conditions: {
			showers: ['1', '2', '3+'],
			interestedIn: ['tank'],
		}
	},
	{
		id: 'gas_tank_50_better',
		type: 'tank',
		fuel: 'gas',
		size: '50',
		tier: 'better',
		label: 'High Recovery 50-Gallon Gas Water Heater',
		baseCost: [1600, 2000],
		notes: 'Faster recovery for larger households',
		conditions: {
			showers: ['2', '3+'],
			interestedIn: ['tank'],
		}
	},
	{
		id: 'electric_tank_50_good',
		type: 'tank',
		fuel: 'electric',
		size: '50',
		tier: 'good',
		label: 'Standard 50-Gallon Electric Water Heater',
		baseCost: [1100, 1400],
		notes: 'No venting required',
		conditions: {
			fuel: ['electric'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'gas_tankless_best',
		type: 'tankless',
		fuel: 'gas',
		tier: 'best',
		label: 'High Efficiency Tankless Gas Water Heater',
		baseCost: [2400, 3500],
		notes: 'Endless hot water, compact design, high efficiency',
		conditions: {
			interestedIn: ['tankless'],
			fuel: ['gas']
		}
	}
];

export default waterHeaterModels;
