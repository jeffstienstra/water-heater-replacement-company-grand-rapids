import waterHeaterModels from '../data/waterHeaterModels.js';
import installAddons from '../data/installAddons.js';

export default function getRecommendations(answers) {
	// Filter valid base models
	const matchingModels = waterHeaterModels.filter(model => {
		return Object.entries(model.conditions).every(([key, validValues]) => {
			return validValues.includes(answers[key]);
		});
	});

	// Add applicable add-ons
	const applicableAddons = installAddons.filter(addon => addon.applyIf(answers));
	const addonTotal = (rangeIndex) =>
		applicableAddons.reduce((sum, addon) => sum + addon.cost[rangeIndex], 0);

	// Return recommendations with pricing
	return matchingModels.map(model => ({
		...model,
		totalPrice: [
			model.baseCost[0] + addonTotal(0),
			model.baseCost[1] + addonTotal(1)
		],
		addons: applicableAddons.map(a => a.label)
	}));
}
