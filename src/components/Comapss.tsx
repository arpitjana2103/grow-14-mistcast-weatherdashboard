export default function Compass({ bearing = 0, size = 300, animated = true }) {
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;

    const ticks = [];
    for (let i = 0; i < 360; i += 2) {
        const isMajor = i === 0 || i % 30 === 0;
        const is10 = i % 10 === 0 && !isMajor;
        const outerR = r - 2;
        const innerR = isMajor ? r - 22 : is10 ? r - 14 : r - 10;

        const rad = ((i - 90) * Math.PI) / 180;
        const x1 = cx + Math.cos(rad) * outerR;
        const y1 = cy + Math.sin(rad) * outerR;
        const x2 = cx + Math.cos(rad) * innerR;
        const y2 = cy + Math.sin(rad) * innerR;

        ticks.push(
            <line
                key={"tick-" + i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? "#ffffff" : "#666"}
                strokeWidth={isMajor ? 2 : 1}
            />,
        );

        if (isMajor) {
            const labelR = r - 32;
            const lx = cx + Math.cos(rad) * labelR;
            const ly = cy + Math.sin(rad) * labelR;
            ticks.push(
                <text
                    key={"lbl-" + i}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={i >= 100 ? 9 : 10}
                    fontFamily="sans-serif"
                    fill="#888"
                    transform={`rotate(${i}, ${lx}, ${ly})`}
                >
                    {i}
                </text>,
            );
        }
    }
    const cardinals = [
        { label: "N", deg: 0, color: "#ff4444", sizee: 16 },
        { label: "NE", deg: 45, color: "#777", sizee: 11 },
        { label: "E", deg: 90, color: "#aaa", sizee: 16 },
        { label: "SE", deg: 135, color: "#777", sizee: 11 },
        { label: "S", deg: 180, color: "#aaa", sizee: 16 },
        { label: "SW", deg: 225, color: "#777", sizee: 11 },
        { label: "W", deg: 270, color: "#aaa", sizee: 16 },
        { label: "NW", deg: 315, color: "#777", sizee: 11 },
    ];

    const cardinalEls = cardinals.map(({ label, deg, color, sizee }) => {
        const rad = ((deg - 90) * Math.PI) / 180;
        const lx = cx + Math.cos(rad) * (r - 10);
        const ly = cy + Math.sin(rad) * (r - 10);
        return (
            <text
                key={"card-" + label}
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={sizee} // 👈 dynamic now
                fontWeight={500}
                fontFamily="sans-serif"
                fill={color}
            >
                {label}
            </text>
        );
    });

    const needleLen = r * 0.8;
    // const tailLen = r * 0.28;
    const needleW = 4;

    const needleN = `${cx},${cy - needleLen} ${cx - needleW},${cy} ${cx + needleW},${cy}`;
    // const needleS = `${cx},${cy + tailLen} ${cx - needleW / 1.5},${cy} ${cx + needleW / 1.5},${cy}`;
    // polygon(50% 0%, 60% 12%, 54% 12%, 54% 100%, 48% 100%, 48% 12%, 42% 12%);

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/*<circle cx={cx} cy={cy} r={r - 1} fill="#111" stroke="#333" strokeWidth={1.5} />*/}
            <circle cx={cx} cy={cy} r={r * 0.8} fill="none" stroke="#2a2a2a" strokeWidth={1} />

            {/*{ticks}*/}
            {cardinalEls}
            {/*
            <line
                x1={cx - r * 0.32}
                y1={cy}
                x2={cx + r * 0.32}
                y2={cy}
                stroke="#2a2a2a"
                strokeWidth={1}
            />*/}
            {/*<line
                x1={cx}
                y1={cy - r * 0.32}
                x2={cx}
                y2={cy + r * 0.32}
                stroke="#2a2a2a"
                strokeWidth={1}
            />*/}

            <g
                transform={`rotate(${bearing}, ${cx}, ${cy})`}
                style={animated ? { transition: "" } : {}}
            >
                <polygon points={needleN} fill="#ff4444" />
                {/*<polygon points={needleS} fill="#555" />*/}
            </g>

            <circle cx={cx} cy={cy} r={10} fill="#1a1a1a" stroke="#555" strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={6} fill="#888" />
        </svg>
    );
}
