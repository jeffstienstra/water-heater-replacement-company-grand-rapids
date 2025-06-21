export default function PvcElbow({
	fillMain = 'white',
	fillAccent = '#b0b0b0'
}) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 315 293"
			width="50"
			height="82"
			style={{
				fillRule: 'evenodd',
				clipRule: 'evenodd',
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				strokeMiterlimit: 1.5
			}}
		>
			<g transform="translate(0.735,-9.194)">
                {/* Main elbow body */}
				<path
					d="M18.445,250.942C18.445,107.745 110.535,17.314 249.533,17.314C240.002,52.95 240.566,88.869 249.533,125.036C173.582,125.036 125.081,174.991 125.081,250.942L18.445,250.942Z"
					fill={fillMain}
					stroke="black"
					strokeWidth="5"
				/>

				{/* Right-side pipe outlet */}
				<path
					d="M293.5,138.166L253.111,138.166C239.958,94.995 238.05,51.387 253.111,7.119L293.5,7.119C275.108,51.612 275.912,95.259 293.5,138.166Z"
					fill={fillMain}
					stroke="black"
					strokeWidth="5"
				/>
				{/* Right-side pipe outlet inside */}
				<path
					d="M293.5,7.119C305.872,51.385 305.955,95.071 293.5,138.166C275.912,95.259 275.108,51.612 293.5,7.119Z"
					fill={fillAccent}
					stroke="black"
					strokeWidth="5"
				/>

				{/* Main body shine */}
				<path
					d="M191.87,46.345C193.232,46.123 194.518,47.048 194.74,48.41C194.963,49.772 194.038,51.058 192.676,51.28C137.811,60.234 79.53,105.941 60.11,171.466C59.718,172.789 58.326,173.545 57.003,173.153C55.68,172.761 54.924,171.369 55.316,170.046C75.313,102.573 135.376,55.565 191.87,46.345Z"
					fill={fillAccent}
				/>

				{/* Base outlet */}
				<rect
					x="6.34"
					y="250.942"
					width="131.047"
					height="43.967"
					fill={fillMain}
					stroke="black"
					strokeWidth="5"
				/>
			</g>
		</svg>
	);
}
