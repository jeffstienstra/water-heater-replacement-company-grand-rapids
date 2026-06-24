import { useState } from 'react';

const svgProps = {
	xmlns: 'http://www.w3.org/2000/svg',
	width: 28,
	height: 28,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 2,
	strokeLinecap: 'round',
	strokeLinejoin: 'round',
};

const IconWrench = () => (
	<svg {...svgProps}>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6 -6a6 6 0 0 1 -8 -8l3.5 3.5" />
	</svg>
);

const IconShieldDroplet = () => (
	<svg {...svgProps}>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
		<path d="M12 7c-1 2 -2 3.5 -2 5a2 2 0 1 0 4 0c0 -1.5 -1 -3 -2 -5z" />
	</svg>
);

const IconClipboardCheck = () => (
	<svg {...svgProps}>
		<path stroke="none" d="M0 0h24v24H0z" fill="none" />
		<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
		<path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
		<path d="M9 14l2 2l4 -4" />
	</svg>
);

const categories = [
	{
		id: 'safety',
		heading: 'Code-Compliant Safety Upgrades',
		icon: <IconWrench />,
		items: [
			{ title: 'Code-Compliant Venting', description: 'Metal or PVC venting installed per code for optimal safety and performance ensuring your home is protected' },
            { title: 'Gas Line Upgrades', description: 'New gas lines and fittings installed as needed to meet current code and ensure safe operation' },
            { title: 'Water Line Adjustments', description: 'Water lines and valves replaced or adjusted as needed to fit the new unit and meet code' },
        ],
	},
	{
		id: 'flood',
		heading: 'Dual-Layer Flood Protection',
		icon: <IconShieldDroplet />,
		items: [
			{ title: 'Heavy-Duty Drain Pan', description: 'Sits beneath the system to catch leaks and protect floors' },
			{ title: 'Drain Line Installation', description: 'Drain line piped from the pan to the nearest available floor drain (if available) to contain leaks' },
			{ title: 'Battery-Powered Water Alarm', description: 'Placed in the drain pan for instant audible leak alerts' },
		],
	},
	{
		id: 'compliance',
		heading: 'Performance & Legal Compliance',
		icon: <IconClipboardCheck />,
		items: [
			{ title: 'Unit Startup & Testing', description: 'Full system startup, safety check, and operational testing and optimization' },
			{ title: 'Local Mechanical Permit', description: 'We handle the paperwork and pay for the state-required mechanical permits' },
			{ title: 'Municipal Inspection & Approval', description: 'We coordinate the final safety inspection and approval–if a unit fails inspection, we fix it at no additional cost' },
		],
	},
];

export default function InstallationInclusions() {
	const [open, setOpen] = useState(false);
	const laborWarrantyTitle = 'Our Comprehensive 2-Year Labor Warranty';
	const laborWarrantyText = "We are so confident in our craftsmanship that we stand behind it with a 2-year labor warranty on every job–that's double the industry standard. If you have any issues related to our work, we’ll come back and fix it at no cost to you.";
	const productWarrantyTitle = 'A Decade of Equipment Protection';
	const productWarrantyText = 'Every system features at least 10+ years of premium factory backing for tanks and heat exchangers. This includes a minimum 10-to-12 year warranty on water heater tanks and a 15-year warranty on tankless heat exchangers, alongside separate long-term coverage for all other mechanical components.';

	return (
		<div className='w-full mx-auto px-4 pb-8'>
			{/* Mobile: standalone include button on white background */}
			<div className='md:hidden'>
				<button
					className='w-full btn btn-outline border-primary/30 text-primary bg-white hover:bg-primary/5 mx-auto'
					onClick={() => setOpen((v) => !v)}
					aria-expanded={open}
				>
					<span className='font-semibold text-sm'>See What's Included With Each Install</span>
					<span className='text-primary font-bold text-lg leading-none'>{open ? '▲' : '▼'}</span>
				</button>
				<div className={`grid transition-all duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
					<div className='overflow-hidden'>
						<div className='grid grid-cols-1 gap-6 pb-2 pt-1'>
							<div className='bg-primary/5 border-2 border-primary/50 rounded-lg p-3 text-left shadow-lg'>
								<div className='flex items-start gap-2'>
									<span className='text-primary font-bold text-sm shrink-0 mt-0.5'>✓</span>
									<div>
										<p className='font-bold text-sm text-gray-900'>{laborWarrantyTitle}</p>
										<p className='text-xs text-gray-600 mt-0.5'>{laborWarrantyText}</p>
									</div>
								</div>
								<div className='flex items-start gap-2 mt-2'>
									<span className='text-primary font-bold text-sm shrink-0 mt-0.5'>✓</span>
									<div>
										<p className='font-bold text-sm text-gray-900'>{productWarrantyTitle}</p>
										<p className='text-xs text-gray-600 mt-0.5'>{productWarrantyText}</p>
									</div>
								</div>
							</div>
							{categories.map((cat) => (
								<div key={cat.id} className='bg-white shadow-lg border border-primary/50 rounded-lg p-2 text-left'>
									<div className='flex items-center gap-2 text-primary mb-2'>
										{cat.icon}
										<p className='font-bold text-sm text-gray-900'>{cat.heading}</p>
									</div>
									<ul className='space-y-2'>
										{cat.items.map((item) => (
											<li key={item.title} className='flex gap-2 items-start'>
												<span className='text-primary font-bold text-sm shrink-0 mt-0.5'>✓</span>
												<div>
													<p className='font-semibold text-sm text-gray-900'>{item.title}</p>
													<p className='text-xs text-gray-500 mt-0.5'>{item.description}</p>
												</div>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Desktop: always visible 3-column grid */}
            <h2 className='hidden md:grid text-center text-2xl font-bold text-gray-900'>What’s Included With Every Installation</h2>

			<div className='hidden md:flex my-6 mx-auto max-w-5xl items-center gap-4 px-6 py-4 bg-primary/5 border border-primary/50 rounded-lg shadow-lg'>
				<div className='text-primary shrink-0'>
					<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='36' height='36' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3' />
						<path d='M9 12l2 2l4 -4' />
					</svg>
				</div>
				<div className='text-left'>
					<p className='font-bold text-sm text-gray-900'>{laborWarrantyTitle}</p>
					<p className='text-sm text-gray-700 mt-0.5'>{laborWarrantyText}</p>
				</div>
				<div className='text-left'>
					<p className='font-bold text-sm text-gray-900'>{productWarrantyTitle}</p>
					<p className='text-sm text-gray-700 mt-0.5'>{productWarrantyText}</p>
				</div>
			</div>

			<div className='hidden md:grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-6'>
				{categories.map((cat) => (
					<div key={cat.id} className='bg-white shadow-lg border border-primary/30 rounded-lg p-4 text-left'>
						<div className='flex items-center gap-2 mb-4 text-primary'>
							{cat.icon}
							<h3 className='font-bold text-base text-gray-900'>{cat.heading}</h3>
						</div>
						<ul className='space-y-3'>
							{cat.items.map((item) => (
								<li key={item.title} className='flex gap-2 items-start'>
									<span className='text-primary font-bold text-base shrink-0 mt-0.5'>✓</span>
									<div>
										<p className='font-bold text-sm text-gray-900'>{item.title}</p>
										<p className='text-sm text-gray-600 mt-0.5'>{item.description}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
}
