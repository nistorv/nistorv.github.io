export interface CircleNavProps {
  name: string;
  onLinkedInClick?: () => void;
  onGithubClick?: () => void;
  onEmailClick?: () => void;
  onMoreClick?: () => void;
}

export function CircleNav(props: CircleNavProps) {
  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const innerRadius = 85;
  const ringInnerRadius = 95;
  const outerRadius = 125;

  const firstName = props.name.split(" ")[0];
  const lastName = props.name.split(" ")[1];

  const createQuarterPath = (startAngle: number, endAngle: number) => {
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1Outer = centerX + outerRadius * Math.cos(startAngleRad);
    const y1Outer = centerY + outerRadius * Math.sin(startAngleRad);
    const x2Outer = centerX + outerRadius * Math.cos(endAngleRad);
    const y2Outer = centerY + outerRadius * Math.sin(endAngleRad);

    const x1Inner = centerX + ringInnerRadius * Math.cos(endAngleRad);
    const y1Inner = centerY + ringInnerRadius * Math.sin(endAngleRad);
    const x2Inner = centerX + ringInnerRadius * Math.cos(startAngleRad);
    const y2Inner = centerY + ringInnerRadius * Math.sin(startAngleRad);

    return `
      M ${x1Outer} ${y1Outer}
      A ${outerRadius} ${outerRadius} 0 0 1 ${x2Outer} ${y2Outer}
      L ${x1Inner} ${y1Inner}
      A ${ringInnerRadius} ${ringInnerRadius} 0 0 0 ${x2Inner} ${y2Inner}
      Z
    `;
  };

  const ringButtons = [
    {
      label: "LinkedIn",
      startAngle: -180,
      endAngle: -90,
      onClick: props.onLinkedInClick,
    },
    {
      label: "Github",
      startAngle: -90,
      endAngle: 0,
      onClick: props.onGithubClick,
    },
    {
      label: "More",
      startAngle: 0,
      endAngle: 90,
      onClick: props.onMoreClick,
    },
    {
      label: "E-mail",
      startAngle: 90,
      endAngle: 180,
      onClick: props.onEmailClick,
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* center circle stuff */}
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.1" />
          </filter>
          <filter id="ringShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
          </filter>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="rgba(255, 255, 255, 1)"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth="3"
          filter="url(#shadow)"
        />

        <text
          x={centerX}
          y={centerY - 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-3xl font-bold fill-slate-800 font-sans"
        >
          {firstName}
        </text>
        <text
          x={centerX}
          y={centerY + 20}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-3xl font-bold fill-slate-800 font-sans"
        >
          {lastName}
        </text>

        {/* outer ring buttons */}
        {ringButtons.map((button, index) => {
          const textRadius = (ringInnerRadius + outerRadius) / 2;
          const pathId = `textPath-${index}`;

          const isBottomQuarter = button.startAngle >= 0;

          let textPath;
          if (isBottomQuarter) {
            // bottom half of ring text flipped for better reading ye ye
            const textArcStartAngle = ((button.endAngle - 5) * Math.PI) / 180;
            const textArcEndAngle = ((button.startAngle + 5) * Math.PI) / 180;
            const x1 = centerX + textRadius * Math.cos(textArcStartAngle);
            const y1 = centerY + textRadius * Math.sin(textArcStartAngle);
            const x2 = centerX + textRadius * Math.cos(textArcEndAngle);
            const y2 = centerY + textRadius * Math.sin(textArcEndAngle);
            textPath = `M ${x1} ${y1} A ${textRadius} ${textRadius} 0 0 0 ${x2} ${y2}`;
          } else {
            const textArcStartAngle = ((button.startAngle + 5) * Math.PI) / 180;
            const textArcEndAngle = ((button.endAngle - 5) * Math.PI) / 180;
            const x1 = centerX + textRadius * Math.cos(textArcStartAngle);
            const y1 = centerY + textRadius * Math.sin(textArcStartAngle);
            const x2 = centerX + textRadius * Math.cos(textArcEndAngle);
            const y2 = centerY + textRadius * Math.sin(textArcEndAngle);
            textPath = `M ${x1} ${y1} A ${textRadius} ${textRadius} 0 0 1 ${x2} ${y2}`;
          }

          return (
            <g key={index} className="group">
              <path
                d={createQuarterPath(button.startAngle, button.endAngle)}
                fill="#f1f5f9"
                stroke="#e2e8f0"
                strokeWidth="1"
                className="cursor-pointer group-hover:fill-slate-700 transition-all duration-200 ease-in-out"
                onClick={button.onClick}
                filter="url(#ringShadow)"
              />
              <defs>
                <path id={pathId} d={textPath} fill="none" />
              </defs>
              <text className="text-xs font-semibold fill-slate-600 group-hover:fill-white pointer-events-none select-none transition-all duration-200 ease-in-out font-sans tracking-wider">
                <textPath
                  href={`#${pathId}`}
                  startOffset="50%"
                  textAnchor="middle"
                >
                  {button.label.toUpperCase()}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
