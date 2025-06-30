const waterHeaterModels = [
	// Natural Draft – Metal Venting
	{
		id: 'natdraft_40_good',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'gas',
		ventType: 'metal',
		tier: 'good',
		label: '40-Gallon Natural Draft Water Heater',
		size: 40,
		uef: 0.62,
		gpm: null,
		warranty: {
			tank: 6,
			parts: 6,
			labor: 1
		},
		baseCost: 1600,
		notes: 'Most common size for smaller households',
		conditions: {
			fuel: ['gas'],
			ventType: ['metal'],
			showers: ['1', '2'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'natdraft_50_recommended',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'gas',
		ventType: 'metal',
		tier: 'recommended',
		label: '50-Gallon Natural Draft Water Heater',
		size: 50,
		uef: 0.62,
		gpm: null,
		warranty: {
			tank: 6,
			parts: 6,
			labor: 1
		},
		baseCost: 1750,
		notes: 'Extra capacity for larger families',
		conditions: {
			fuel: ['gas'],
			ventType: ['metal'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Power Vent – PVC
	{
		id: 'powervent_40_good',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'good',
		label: '40-Gallon Power Vent Water Heater',
		size: 50,
		uef: 0.72,
		gpm: null,
		warranty: {
			tank: 8,
			parts: 8,
			labor: 1
		},
		baseCost: 2250,
		notes: 'Ideal for PVC venting or newer installations',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc'],
			showers: ['1', '2', '3'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'powervent_50_good',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'better',
		label: '50-Gallon Power Vent Water Heater',
		size: 50,
		uef: 0.72,
		gpm: null,
		warranty: {
			tank: 8,
			parts: 8,
			labor: 1
		},
		baseCost: 2475,
		notes: 'Ideal for PVC venting or newer installations',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Electric Tank
	{
		id: 'electric_40_good',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'electric',
		ventType: 'none',
		tier: 'good',
		label: '40-Gallon Electric Water Heater',
		size: 40,
		uef: 0.93,
		gpm: null,
		warranty: {
			tank: 6,
			parts: 6,
			labor: 1
		},
		baseCost: 1495,
		notes: 'Standard electric tank for smaller homes',
		conditions: {
			fuel: ['electric'],
			showers: ['1','2'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'electric_50_recommended',
		brand: 'Rheem',
		type: 'tank',
		fuel: 'electric',
		ventType: 'none',
		tier: 'recommended',
		label: '50-Gallon Electric Water Heater',
		size: 50,
		uef: 0.93,
		gpm: null,
		warranty: {
			tank: 6,
			parts: 6,
			labor: 1
		},
		baseCost: 1595,
		notes: 'Ideal for larger households',
		conditions: {
			fuel: ['electric'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Tankless – Gas (PVC)
	{
		id: 'tankless_prestige_recommended',
		brand: 'Rheem',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'recommended',
		label: 'Prestige Series Tankless Water Heater',
		uef: 0.93,
		gpm: 9.5,
		warranty: {
			tank: 15,
			parts: 5,
			labor: 1
		},
		baseCost: 2800,
		notes: 'Compact, high-efficiency tankless system',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc', 'metal', 'unsure'],
			showers: ['1', '2', '3'],
		}
	},
	{
		id: 'tankless_ikonic_best',
		brand: 'Rheem',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'best',
		label: 'Ikonic Series Tankless Water Heater',
		uef: 0.96,
		gpm: 9.5,
		warranty: {
			tank: 15,
			parts: 5,
			labor: 1
		},
		baseCost: 3250,
		notes: 'Ultra-high efficiency, ENERGY STAR rated',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc'],
			showers: ['3'],
			interestedIn: ['tankless']
		}
	},
	{
		id: 'tankless_thermaforce_special',
		brand: 'Rheem',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'special',
		label: 'ThermaForce Tankless (Hard Water Optimized)',
		uef: 0.90,
		gpm: 10.1,
		warranty: {
			tank: 15,
			parts: 5,
			labor: 1
		},
		baseCost: 3250,
		notes: 'Great for hard water areas. High flow with scale-resistance.',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc'],
			hardWater: ['yes'],
			showers: ['3'],
			interestedIn: ['tankless'],
		}
	}
];

export default waterHeaterModels;
