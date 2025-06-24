const TankIcon = ({showX = false}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="82" viewBox="0 0 50 82" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="22" y="1" width="6" height="9" /> {/* vent pipe */}
        <rect x="10" y="10" width="30" height="70" rx="4" ry="4" /> {/* water heater body */}
        <line x1="17" y1="10" x2="17" y2="3" /> {/* left pipe */}
        <line x1="33" y1="10" x2="33" y2="3" /> {/* right pipe */}
        <rect x="20" y="60" width="10" height="8" /> {/* bottom access panel */}
        <line x1="0" y1="80" x2="100" y2="80" /> {/* floor */}

    {showX && (
        <>
            <line x1="2" y1="15" x2="48" y2="60" stroke="#10509B60" strokeWidth="4" /> {/* 'x' */}
            <line x1="48" y1="15" x2="2" y2="60" stroke="#10509B60" strokeWidth="4" /> {/* 'x' */}
        </>
    )}
    </svg>
);

export default TankIcon;
