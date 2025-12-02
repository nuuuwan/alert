export default function GaugeStationIcon({ size, color, strokeColor }) {
  const markColor = "black";
  return `<svg width="${size}" height="${size}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" >
    <g>
      <!-- Water/flood base -->
      <path d="M 20 150 Q 40 145 60 150 Q 80 155 100 150 Q 120 145 140 150 Q 160 155 180 150 L 180 180 L 20 180 Z" fill="${color}" opacity="0.8"/>
      
      <!-- Gauge tower building -->
      <rect x="70" y="20" width="60" height="130" fill="${color}" stroke="${strokeColor}" stroke-width="5"/>
      
      <!-- Measurement marks -->
      <line x1="75" y1="40" x2="85" y2="40" stroke="${markColor}" stroke-width="4"/>
      <line x1="75" y1="60" x2="85" y2="60" stroke="${markColor}" stroke-width="4"/>
      <line x1="75" y1="80" x2="85" y2="80" stroke="${markColor}" stroke-width="4"/>
      <line x1="75" y1="100" x2="85" y2="100" stroke="${markColor}" stroke-width="4"/>
      <line x1="75" y1="120" x2="85" y2="120" stroke="${markColor}" stroke-width="4"/>
    </g>
  </svg>`;
}
