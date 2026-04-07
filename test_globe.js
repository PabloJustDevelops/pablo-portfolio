const PI = Math.PI;
const LOCATIONS = [
  { name: "ESPAÑA", lat: 40.4168, lon: -3.7038 },
  { name: "UK", lat: 51.5074, lon: -0.1278 },
  { name: "FRANCIA", lat: 48.8566, lon: 2.3522 },
];

LOCATIONS.forEach(loc => {
    const phiAngle = Math.PI - (loc.lon * PI) / 180;
    const thetaAngle = (loc.lat * PI) / 180;

    const rawX = -Math.cos(phiAngle) * Math.cos(thetaAngle);
    const rawY = Math.sin(thetaAngle);
    const rawZ = Math.sin(phiAngle) * Math.cos(thetaAngle);
    console.log(loc.name, {rawX, rawY, rawZ});
});
