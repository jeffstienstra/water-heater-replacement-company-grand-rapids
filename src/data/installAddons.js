const installAddons = [
	{
		id: 'chimney_liner',
		label: 'Chimney liner install',
		cost: [300, 600],
		applyIf: (answers) => answers.vent === 'metal' && answers.chimney === 'chimney'
	},
	{
		id: 'upgrade_gas_line',
        label: 'Gas line upgrade',
        cost: [200, 500],
        applyIf: (answers) => answers.fuel === 'gas' && answers.interest === 'tankless'
	},
    {
        id: 'route_water_line',
        label: 'Water line reroute',
        cost: [150, 400],
        applyIf: (answers) => answers.interest === 'tankless'
    },
    {
        id: 'add_pvc_venting',
        label: 'PVC venting install',
        cost: [200, 400],
        applyIf: (answers) => answers.fuel === 'gas' && answers.vent === 'pvc'
    },
	{
		id: 'add_120v_outlet',
		label: '240V circuit upgrade',
		cost: [400, 800],
		applyIf: (answers) => answers.interest === 'tankless' && answers.fuel === 'electric'
	},
	{
		id: 'tight_space',
		label: 'Tight-space install adjustment',
		cost: [150, 300],
		applyIf: (answers) => answers.location === 'crawlspace' || answers.location === 'closet'
	}
];

export default installAddons;