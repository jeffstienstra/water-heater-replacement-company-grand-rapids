const waterHeaterModels = [
	// Natural Draft – Metal Venting
	{
		baseCost: 1600,
		brand: 'Rheem',
		fuel: 'gas',
		gpm: null,
		id: 'natdraft_40_good',
		imagePath: '/images/rheem/PROG40-40N-RH62.webp',
		label: 'Rheem 40 Gallon Professional Classic Series Water Heater: Atmospheric',
		modelNumber: 'PROG40-40N RH62',
		notes: 'Most common size for smaller households',
		size: 40,
		tankCapacity: '40',
		tier: 'good',
		type: 'tank',
		uef: 0.62,
		ventType: 'metal',
		warranty: {tank: 6, parts: 6, labor: 1},
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['metal'],
			showers: ['1', '2'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROG40-40N RH62'},
			{label: 'UEF', value: 0.62},
			{label: 'Capacity', value: '40 Gallon'},
			{label: 'Ignition', value: 'Standing Pilot'},
			{label: 'Venting', value: 'Metal Venting'},
			{label: '1st Hour Delivery', value: '53 GPH'},
			{label: 'Recovery', value: '34.3 GPH at 90°F Rise'}
		],
	},
	{
		id: 'natdraft_50_recommended',
		brand: 'Rheem',
		label: 'Rheem 50 Gallon Professional Classic Series Water Heater: Atmospheric',
		modelNumber: 'PROG50-42N RH67',
		type: 'tank',
		tankCapacity: '50',
		fuel: 'gas',
		ventType: 'metal',
		tier: 'recommended',
		size: 50,
		uef: 0.62,
		gpm: null,
		warranty: {tank: 6, parts: 6, labor: 1},
		baseCost: 1750,
		notes: 'Extra capacity for larger families',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['metal'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROG50-42N RH67'},
			{label: 'UEF', value: 0.62},
			{label: 'Capacity', value: '50 Gallon'},
			{label: 'Ignition', value: 'Standing Pilot'},
			{label: 'Venting', value: 'Metal Venting'},
			{label: '1st Hour Delivery', value: '87 GPH'},
			{label: 'Recovery', value: '42.4 GPH at 90°F Rise'}
		],
	},

	// Power Vent – PVC
	{
		id: 'powervent_40_good',
		brand: 'Rheem',
		label: 'Rheem 40 Gallon Professional Classic Series Water Heater: Power Vent',
		modelNumber: 'PROG40S-36N RH62 PV',
		type: 'tank',
		tankCapacity: '40',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'good',
		size: 40,
		uef: 0.72,
		gpm: null,
		warranty: {tank: 8, parts: 8, labor: 1},
		baseCost: 2250,
		notes: 'Ideal for PVC venting or newer installations',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['pvc'],
			showers: ['1', '2', '3'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROG40S-36N RH62 PV'},
			{label: 'UEF', value: 0.72},
			{label: 'Capacity', value: '40 Gallon'},
			{label: 'Ignition', value: 'Spark Ignition'},
			{label: 'Venting', value: 'Power Venting (PVC)'},
			{label: '1st Hour Delivery', value: '69 GPH'},
			{label: 'Recovery', value: '36.4 GPH at 90°F Rise'},
		]
	},
	{
		id: 'powervent_50_good',
		brand: 'Rheem',
		label: 'Rheem 50 Gallon Professional Classic Series Water Heater: Power Vent',
		modelNumber: 'PROG50-42N RH67 PV',
		type: 'tank',
		tankCapacity: '50',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'better',
		size: 50,
		uef: 0.72,
		gpm: null,
		warranty: {tank: 8, parts: 8, labor: 1},
		baseCost: 2475,
		notes: 'Ideal for PVC venting or newer installations',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['pvc'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROG50-42N RH67 PV'},
			{label: 'UEF', value: 0.72},
			{label: 'Capacity', value: '50 Gallon'},
			{label: 'Ignition', value: 'Spark Ignition'},
			{label: 'Venting', value: 'Power Venting (PVC)'},
			{label: '1st Hour Delivery', value: '87 GPH'},
			{label: 'Recovery', value: '42.4 GPH at 90°F Rise'},
		]
	},

	// Electric Tank
	{
		id: 'electric_40_good',
		brand: 'Rheem',
		label: 'Rheem 40 Gallon Professional Classic Series Water Heater: Standard Electric',
		modelNumber: 'PROE40 T2 RH95',
		type: 'tank',
		tankCapacity: '40',
		fuel: 'electric',
		ventType: 'none',
		tier: 'good',
		size: 40,
		uef: 0.93,
		gpm: null,
		warranty: {tank: 6, parts: 6, labor: 1},
		baseCost: 1495,
		notes: 'Standard electric tank for smaller homes',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'mobileHome', 'condo'],
			fuel: ['electric'],
			showers: ['1', '2'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROE40 T2 RH95'},
			{label: 'UEF', value: 0.93},
			{label: 'Capacity', value: '40 Gallon'},
			{label: 'Elements', value: 'Dual 4500W'},
			{label: 'Venting', value: 'No Venting Required'},
			{label: '1st Hour Delivery', value: '53 GPH'},
			{label: 'Recovery', value: '21 GPH at 90°F Rise'}
		],
	},
	{
		id: 'electric_50_recommended',
		brand: 'Rheem',
		label: 'Rheem 50 Gallon Professional Classic Series Water Heater: Standard Electric',
		modelNumber: 'PROE50 T2 RH95',
		type: 'tank',
		tankCapacity: '50',
		fuel: 'electric',
		ventType: 'none',
		tier: 'better',
		size: 50,
		uef: 0.93,
		gpm: null,
		warranty: {tank: 6, parts: 6, labor: 1},
		baseCost: 1595,
		notes: 'Ideal for larger households',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'mobileHome', 'condo'],
			fuel: ['electric'],
			showers: ['2', '3'],
			interestedIn: ['tank']
		},
		features: [
			{label: 'Model', value: 'PROE50 T2 RH95'},
			{label: 'UEF', value: 0.93},
			{label: 'Capacity', value: '50 Gallon'},
			{label: 'Elements', value: 'Dual 4500W'},
			{label: 'Venting', value: 'No Venting Required'},
			{label: '1st Hour Delivery', value: '62 GPH'},
			{label: 'Recovery', value: '21 GPH at 90°F Rise'},
		],
	},

	// Tankless – Gas (PVC)
	{
		id: 'tankless_prestige_recommended',
		brand: 'Rheem',
		label: 'Rheem Prestige Series Super High Efficiency Condensing Gas Water Heater: Tankless',
		modelNumber: 'RTGH-95DVLN',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'recommended',
		uef: 0.93,
		gpm: 9.5,
		warranty: {tank: 15, parts: 5, labor: 1},
		baseCost: 2800,
		notes: 'Compact, high-efficiency tankless system',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['pvc', 'metal', 'unsure'],
			showers: ['1', '2', '3']
		},
		features: [
			{label: 'Model', value: 'RTGH-95DVLN'},
			{label: 'UEF', value: 0.93},
			{label: 'Max Flow', value: '9.5 GPM'},
			{label: 'Ignition', value: 'Spark Ignition'},
			{label: 'Venting', value: 'Power Venting (PVC)'},
			{label: 'Design', value: 'Condensing Tankless'},
			{label: 'Certification', value: 'ENERGY STAR® Certified'},
			{label: 'Recirculation', value: 'Built-in Recirculation Compatible'}
		]
	},
	{
		id: 'tankless_ikonic_best',
		brand: 'Rheem',
		label: 'Rheem Ikonic Series Tankless Water Heater',
		modelNumber: 'RTGHS11iN',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'best',
		uef: 0.96,
		gpm: 11,
		warranty: {tank: 15, parts: 5, labor: 1},
		baseCost: 3250,
		notes: 'Ultra-high efficiency, ENERGY STAR rated',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['pvc'],
			showers: ['3'],
			interestedIn: ['tankless']
		},
		features: [
			{label: 'Model', value: 'RTGHS11iN'},
			{label: 'UEF', value: 0.96},
			{label: 'Max Flow', value: '11 GPM'},
			{label: 'Ignition', value: 'Spark Ignition'},
			{label: 'Venting', value: 'Power Venting (PVC)'},
			{label: 'Design', value: 'Condensing Tankless'},
			{label: 'Certification', value: 'ENERGY STAR® Certified'},
			{label: 'LeakGuard', value: 'Auto Shut-Off Included'}
		]
	},
	{
		id: 'tankless_thermaforce_special',
		brand: 'Rheem',
		label: 'Rheem ThermaForce Tankless (Hard Water Optimized)',
		modelNumber: 'RTGHL199iN',
		type: 'tankless',
		fuel: 'gas',
		ventType: 'pvc',
		tier: 'special',
		uef: 0.90,
		gpm: 10.1,
		warranty: {tank: 15, parts: 5, labor: 1},
		baseCost: 3250,
		notes: 'Great for hard water areas. High flow with scale-resistance.',
		conditions: {
			homeType: ['singleFamily', 'townhome', 'condo'],
			fuel: ['gas', 'propane'],
			ventType: ['pvc'],
			hardWater: ['yes'],
			showers: ['3'],
			interestedIn: ['tankless']
		},
		features: [
			{label: 'Model', value: 'RTGHL199iN'},
			{label: 'UEF', value: 0.90},
			{label: 'Max Flow', value: '10.1 GPM'},
			{label: 'Ignition', value: 'Spark Ignition'},
			{label: 'Venting', value: 'Power Venting (PVC)'},
			{label: 'Design', value: 'Condensing Tankless'},
			{label: 'Technology', value: 'ScaleShield™ Technology'},
			{label: 'Recirculation', value: 'Built-in Recirculation Ready'}
		]
	}
	// Hybrid water heaters

];

export default waterHeaterModels;
