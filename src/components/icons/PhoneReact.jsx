export default function PhoneReact({ className = '', width = 20, height = 20, ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width={width}
            height={height}
            className={className}
            {...props}
        >
            <path d="M21 16.5a2 2 0 0 1-2 2c-6.075 0-11-4.925-11-11a2 2 0 0 1 2-2h1.5a1 1 0 0 1 1 .75l.5 2a1 1 0 0 1-.25.94l-1.2 1.2a10.5 10.5 0 0 0 4.95 4.95l1.2-1.2a1 1 0 0 1 .94-.25l2 .5A1 1 0 0 1 21 16.5z" />
        </svg>
    );
}