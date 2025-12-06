export default function LocationIcon({ size, color, strokeColor }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        {/* Location pin shape */}
        <path
          d="M 100 20 C 70 20 45 45 45 75 C 45 110 100 160 100 160 C 100 160 155 110 155 75 C 155 45 130 20 100 20 Z"
          fill={color}
          stroke={strokeColor}
          strokeWidth="5"
        />
        {/* Inner circle */}
        <circle cx="100" cy="75" r="20" fill="white" />
      </g>
    </svg>
  );
}
