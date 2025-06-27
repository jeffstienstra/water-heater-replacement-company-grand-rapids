const installAddons = [
	{
		id: 'chimney_liner',
		label: 'Chimney liner install',
		cost: [400, 1000],
		applyIf: (answers) => answers.ventType === 'metal' && answers.ventingTermination === 'chimney'
	},
	{
		id: 'upgrade_gas_line',
        label: 'Gas line upgrade',
        cost: [200, 500],
        applyIf: (answers) => answers.fuel === 'gas' && answers.interestedIn === 'tankless'
	},
    {
        id: 'route_water_line',
        label: 'Water line reroute',
        cost: [150, 400],
        applyIf: (answers) => answers.interestedIn === 'tankless'
    },
    {
        id: 'add_pvc_venting',
        label: 'PVC venting install',
        cost: [200, 400],
        applyIf: (answers, matchingModels) => {
            console.log('Checking PVC venting for answers:', answers, 'and models:', matchingModels);
            return answers.fuel === 'gas' && answers.ventType === 'metal' &&
                matchingModels?.some(model => model.venting === 'pvc');
        }
    },
	{
		id: 'add_120v_outlet',
		label: 'Add 120V outlet for tankless',
		cost: [400, 800],
		applyIf: (answers) => answers.interestedIn === 'tankless' && answers.typeToRemove === 'tank'
	},
	{
		id: 'tight_space',
		label: 'Tight-space Install',
		cost: [150, 300],
		applyIf: (answers) => answers.location === 'crawlspace' || answers.location === 'closet'
	},

];

export default installAddons;