function calculateLocation(lat1, lon1, lat2, lon2) {
    const R = 6371 * 1000; // Radius of the Earth in meters (6371 kilometers)
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lon1Rad = (lon1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const lon2Rad = (lon2 * Math.PI) / 180;
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInMeters = R * c; // Distance in meters
    return distanceInMeters;
  }
  const distanceInMeters = calculateLocation(37.7749, -122.4194, 34.0522, -118.2437);
console.log(`The distance is approximately ${distanceInMeters} meters.`);