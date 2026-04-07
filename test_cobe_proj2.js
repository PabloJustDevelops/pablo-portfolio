const PI = Math.PI;

const LOCATIONS = [
  { name: "ESPAÑA", lat: 40.4168, lon: -3.7038 },
  { name: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "FRANCIA", lat: 48.8566, lon: 2.3522 },
];

LOCATIONS.forEach(loc => {
    const lat = (loc.lat * PI) / 180;
    const lon = (loc.lon * PI) / 180 - PI;

    const t = Math.cos(lat);
    const pX = -t * Math.cos(lon);
    const pY = Math.sin(lat);
    const pZ = t * Math.sin(lon);

    // Apply rotations
    const phi = -2.5;
    const theta = 0;

    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const cosTheta = Math.cos(theta);
    const sinTheta = Math.sin(theta);

    const lX = pX * cosPhi + pZ * sinPhi;
    const lY =
      pX * (sinPhi * sinTheta) +
      pY * cosTheta +
      pZ * (-cosPhi * sinTheta);
    const lZ =
      pX * (-sinPhi * cosTheta) +
      pY * sinTheta +
      pZ * (cosPhi * cosTheta);

    const aX = 0.8 * lX;
    const aY = 0.8 * lY;
    
    console.log(loc.name, {lX, lY, lZ, aX, aY});
});
