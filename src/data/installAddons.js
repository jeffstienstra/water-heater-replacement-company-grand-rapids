const installAddons = [
	{
		id: 'chimney_liner',
		label: 'Chimney liner install',
		cost: [400, 1000],
		applyIf: (answers, model) => {
            return (
                answers.ventType === 'metal'
                && answers.ventingTermination === 'chimney'
                && answers.hasChimneyLiner === 'no'
            );
        }
	},
	{
		id: 'upgrade_gas_line',
        label: 'Gas line upgrade',
        cost: [300, 500],
        applyIf: (answers, model) => {
            return (
                answers.fuel === 'gas'
                && answers.typeToRemove === 'tank'
                && model.type === 'tankless'
            );
        }
	},
    {
        id: 'route_water_line',
        label: 'Water line reroute',
        cost: [250, 500],
        applyIf: (answers, model) => {
            return (
                answers.typeToRemove === 'tank'
                && model.type === 'tankless'
            );
        }
    },
    {
        id: 'add_pvc_venting',
        label: 'PVC venting install',
        cost: [200, 400],
        applyIf: (answers, model) => {
            return (
                answers.fuel === 'gas'
                && answers.ventType === 'metal'
                && model.venting === 'pvc'
            );
        }
    },
	{
		id: 'add_120v_outlet',
		label: 'Add 120V outlet',
		cost: [200, 400],
		applyIf: (answers, model) => {
            return (
                answers.fuel !== 'electric'
                && answers.typeToRemove === 'tank'
                && answers.ventType === 'metal'
                && model.ventType === 'pvc'
            );
        }
	},
	{
		id: 'tight_space',
		label: 'Tight-space Install',
		cost: [150, 300],
		applyIf: (answers) => answers.location === 'crawlspace' || answers.location === 'closet'
	},

    // User-selectable Add-Ons
    {
        id: 'add_extended_warranty',
        userSelectable: true,
        label: 'Extended Warranty',
        cost: [350, 350],
        getDetails: (model) => [
            `Tank: ${model.warranty.tank + 4} Years`,
            `Parts: ${model.warranty.parts + 4} Years`,
            `Labor: ${model.warranty.labor + 1} Years`
        ],
        applyIf: () => false // uses UI toggle
    },
    {
        id: 'expansion_tank',
        userSelectable: true,
        label: 'Expansion Tank',
        cost: [200, 300],
        getDetails: () => [
            'Extends water heater life',
            'Protects water heater and pipes',
            'Absorbs thermal expansion',
        ],
        applyIf: () => false
    },
    {
        id: 'pressure_valve',
        userSelectable: true,
        label: 'Pressure-Reducing Valve',
        cost: [250, 350],
        getDetails: () => [
            'Protects against high water pressure',
            'Improves efficiency and consistency',
            'Extends plumbing lifespan'
        ],
        applyIf: () => false
    },
    {
        id: 'mixing_valve',
        userSelectable: true,
        label: 'Mixing Valve',
        cost: [300, 450],
        getDetails: () => [
            'Prevents scalding',
            'Increases hot water availability',
            'Supports safe higher tank temps'
        ],
        applyIf: () => false
    },
    {
        id: 'recirc_pump',
        userSelectable: true,
        label: 'Recirculation Pump',
        cost: [500, 700],
        getDetails: () => [
            'Instant hot water at fixtures',
            'Reduces water waste',
            'Extends water heater lifespan'
        ],
        applyIf: () => false
    },
    {
        id: 'water_alarm',
        userSelectable: true,
        label: 'Water Leak Alarm',
        cost: [100, 200],
        getDetails: () => [
            'Alerts you to leaks early',
            'Can prevent major water damage',
            'May qualify for insurance discounts'
        ],
        applyIf: () => false
    },
    {
        id: 'pipe_insulation',
        userSelectable: true,
        label: 'Piping Insulation Upgrades',
        cost: [150, 250],
        getDetails: () => [
            'Reduces heat loss',
            'Delivers hot water faster',
            'Protects pipes in cold weather'
        ],
        applyIf: () => false
    },
    {
        id: 'drain_valve',
        userSelectable: true,
        label: 'Drain Valve Upgrade',
        cost: [100, 150],
        getDetails: () => [
            'Makes flushing easier',
            'Reduces leak risk',
            'Supports longer heater lifespan'
        ],
        applyIf: () => false
    },
    {
        id: 'condensate_kit',
        userSelectable: true,
        label: 'Condensate Neutralizer Kit',
        cost: [150, 250],
        getDetails: () => [
            'Neutralizes acidic condensate',
            'Protects plumbing and drains',
            'Helps meet code requirements'
        ],
        applyIf: () => false
    },
    {
        id: 'flush_kit',
        userSelectable: true,
        label: 'Flush / Descaling Valve Kit',
        cost: [200, 300],
        getDetails: () => [
            'Makes maintenance easy',
            'Prevents scale buildup',
            'Extends unit lifespan'
        ],
        applyIf: () => false
    }
];

export default installAddons;