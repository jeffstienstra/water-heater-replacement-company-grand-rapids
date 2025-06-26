const installAddons = [
	{
		id: 'chimney_liner',
		label: 'Chimney liner install',
		cost: [300, 600],
		applyIf: (answers) => answers.ventType === 'metal' && answers.chimney === 'chimney'
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
        applyIf: (answers) => answers.fuel === 'gas' && answers.ventType === 'pvc'
    },
	{
		id: 'add_120v_outlet',
		label: '240V circuit upgrade',
		cost: [400, 800],
		applyIf: (answers) => answers.interestedIn === 'tankless' && answers.fuel === 'electric'
	},
	{
		id: 'tight_space',
		label: 'Tight-space Install',
		cost: [150, 300],
		applyIf: (answers) => answers.location === 'crawlspace' || answers.location === 'closet'
	}
];

export default installAddons;