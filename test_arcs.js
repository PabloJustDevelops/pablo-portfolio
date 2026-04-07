const PI = Math.PI;

const LOCATIONS = [
  { name: "ESPAÑA", lat: 40.4168, lon: -3.7038 },
  { name: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "FRANCIA", lat: 48.8566, lon: 2.3522 },
];

function getArcPoints(loc1, loc2, maxAlt = 0.2, segments = 10) {
  const getV = (loc) => {
    const lat = (loc.lat * PI) / 180;
    const lon = (loc.lon * PI) / 180 - PI;
    const t = Math.cos(lat);
    return {
      x: -t * Math.cos(lon),
      y: Math.sin(lat),
      z: t * Math.sin(lon)
    };
  };

  const v1 = getV(loc1);
  const v2 = getV(loc2);

  const dot = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  const omega = Math.acos(Math.max(-1, Math.min(1, dot)));

  const points = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const alt = Math.sin(t * PI) * maxAlt;
    
    let x, y, z;
    if (Math.abs(omega) < 1e-6) {
      x = v1.x; y = v1.y; z = v1.z;
    } else {
      const s0 = Math.sin((1 - t) * omega) / Math.sin(omega);
      const s1 = Math.sin(t * omega) / Math.sin(omega);
      x = v1.x * s0 + v2.x * s1;
      y = v1.y * s0 + v2.y * s1;
      z = v1.z * s0 + v2.z * s1;
    }

    const r = 1 + alt;
    points.push({ x: x * r, y: y * r, z: z * r });
  }
  return points;
}

const points = getArcPoints(LOCATIONS[0], LOCATIONS[2], 0.1);
console.log("Arc from ESPAÑA to FRANCIA:", points.length, "points");
console.log("Start:", points[0]);
console.log("Mid:", points[5]);
console.log("End:", points[10]);
