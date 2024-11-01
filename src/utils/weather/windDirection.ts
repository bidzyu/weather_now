export function getWindDirection(deg: number): string {
  if (deg >= 0 && deg < 22.5) {
    return 'Северный';
  } else if (deg >= 22.5 && deg < 67.5) {
    return 'Северо-восточный';
  } else if (deg >= 67.5 && deg < 112.5) {
    return 'Восточный';
  } else if (deg >= 112.5 && deg < 157.5) {
    return 'Юго-восточный';
  } else if (deg >= 157.5 && deg < 202.5) {
    return 'Южный';
  } else if (deg >= 202.5 && deg < 247.5) {
    return 'Юго-западный';
  } else if (deg >= 247.5 && deg < 292.5) {
    return 'Западный';
  } else if (deg >= 292.5 && deg < 337.5) {
    return 'Северо-западный';
  } else {
    return 'Северный';
  }
}
