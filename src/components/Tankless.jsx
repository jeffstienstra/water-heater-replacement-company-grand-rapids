

const TanklessIcon = ({showX = false}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="82" viewBox="0 0 50 82" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Vent pipe (top center) */}
        <rect x="22" y="1" width="6" height="9" className="fill-secondary" />

        {/* Tankless body */}
        <rect x="10" y="10" width="30" height="40" rx="4" ry="4"  />

        {/* Bottom water pipes: down then 90° toward edges */}
        <path d="M18 50 v10" /> {/* left pipe */}
        <path d="M32 50 v10" /> {/* right pipe */}

        {/* Access panel */}
        <rect x="20" y="38" width="10" height="8" className="fill-primary" />

        <line x1="0" y1="80" x2="100" y2="80" /> {/* floor */}
        {showX && (
            <>
                <line x1="2" y1="10" x2="47" y2="50" stroke="#10509B60" strokeWidth="4" /> {/* 'x' */}
                <line x1="47" y1="10" x2="2" y2="50" stroke="#10509B60" strokeWidth="4" /> {/* 'x' */}
            </>
        )}
›    </svg>
);

export default TanklessIcon;
