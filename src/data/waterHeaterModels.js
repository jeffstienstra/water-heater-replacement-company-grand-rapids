const waterHeaterModels = [
	// Natural Draft – Metal Vent
	{
		id: 'natdraft_40_good',
		type: 'tank',
		fuel: 'gas',
		venting: 'metal',
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
		baseCost: 1200,
		notes: 'Most common size for smaller households',
		conditions: {
			fuel: ['gas'],
			ventType: ['metal'],
			showers: ['1', '2'],
			interestedIn: ['tank']
		}
	},
	{		id: 'natdraft_40_recommended',
		type: 'tank',
		fuel: 'gas',
		venting: 'metal',
		tier: 'recommended',
		label: '40-Gallon Natural Draft Water Heater – Extended Warranty',
		size: 40,
		uef: 0.62,
		gpm: null,
		warranty: {
			tank: 10,
			parts: 6,
			labor: 2
		},
		baseCost: 1350, // $1200 + $150 warranty upgrade
		notes: 'Includes Rheem ProtectionPlus 10yr warranty + 2yr labor',
		conditions: {
			fuel: ['gas'],
			ventType: ['metal'],
			showers: ['1', '2'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'natdraft_50_recommended',
		type: 'tank',
		fuel: 'gas',
		venting: 'metal',
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
		baseCost: 1350,
		notes: 'Extra capacity for larger families',
		conditions: {
			fuel: ['gas'],
			ventType: ['metal'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'natdraft_50_best',
		type: 'tank',
		fuel: 'gas',
		venting: 'metal',
		tier: 'best',
		label: '50-Gallon Natural Draft Water Heater – Extended Warranty',
		size: 50,
		uef: 0.62,
		gpm: null,
		warranty: {
			tank: 10,
			parts: 6,
			labor: 2
		},
		baseCost: 1480, // $1350 + $130 warranty upgrade
		notes: 'Includes Rheem ProtectionPlus 10yr warranty',
		conditions: {
			fuel: ['gas'],
			vent: ['metal'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Power Vent – PVC
	{
		id: 'powervent_50_good',
		type: 'tank',
		fuel: 'gas',
		venting: 'pvc',
		tier: 'good',
		label: '50-Gallon Power Vent Water Heater',
		size: 50,
		uef: 0.72,
		gpm: null,
		warranty: {
			tank: 6,
			parts: 6,
			labor: 1
		},
		baseCost: 1650,
		notes: 'Ideal for PVC venting or newer installations',
		conditions: {
			fuel: ['gas'],
			vent: ['pvc'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'powervent_50_recommended',
		type: 'tank',
		fuel: 'gas',
		venting: 'pvc',
		tier: 'recommended',
		label: '50-Gallon Power Vent – Extended Warranty',
		size: 50,
		uef: 0.72,
		gpm: null,
		warranty: {
			tank: 10,
			parts: 6,
			labor: 2
		},
		baseCost: 1995,
		notes: 'Includes ProtectionPlus 10yr tank / 2yr labor warranty',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc', 'metal'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Electric Tank
	{
		id: 'electric_40_good',
		type: 'tank',
		fuel: 'electric',
		venting: 'none',
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
		baseCost: 1100,
		notes: 'Standard electric tank for smaller homes',
		conditions: {
			fuel: ['electric'],
			showers: ['1','2'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'electric_50_recommended',
		type: 'tank',
		fuel: 'electric',
		venting: 'none',
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
		baseCost: 1250,
		notes: 'Ideal for larger households',
		conditions: {
			fuel: ['electric'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},
	{
		id: 'electric_50_best',
		type: 'tank',
		fuel: 'electric',
		venting: 'none',
		tier: 'best',
		label: '50-Gallon Electric Water Heater – Extended Warranty',
		size: 50,
		uef: 0.93,
		gpm: null,
		warranty: {
			tank: 10,
			parts: 6,
			labor: 2
		},
		baseCost: 1380, // $1250 + $130 warranty upgrade
		notes: 'Includes ProtectionPlus 10yr tank / 2yr labor warranty',
		conditions: {
			fuel: ['electric'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		}
	},

	// Tankless – Gas (PVC)
	{
		id: 'tankless_prestige_recommended',
		type: 'tankless',
		fuel: 'gas',
		venting: 'pvc',
		tier: 'recommended',
		label: 'Prestige Series Tankless Water Heater',
		uef: 0.93,
		gpm: 9.5,
		warranty: {
			tank: 15, // Heat exchanger
			parts: 5,
			labor: 1
		},
		baseCost: 2800,
		notes: 'Compact, high-efficiency tankless system',
		conditions: {
			fuel: ['gas'],
			ventType: ['pvc'],
			showers: ['1', '2', '3'],
			interestedIn: ['tankless'],
		}
	},
	{
		id: 'tankless_ikonic_best',
		type: 'tankless',
		fuel: 'gas',
		venting: 'pvc',
		tier: 'best',
		label: 'Ikonic Series Tankless Water Heater',
		uef: 0.96,
		gpm: 9.5,
		warranty: {
			tank: 15,
			parts: 5,
			labor: 1
		},
		baseCost: 3050,
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
		type: 'tankless',
		fuel: 'gas',
		venting: 'pvc',
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
