/**
 * Calculates the percentage of a given numerator and denominator.
 * @param {Number} numerator - numerator of the calculation.
 * @param {Number} denominator - denominator of the calculation.
 */
export function calculatePercentage(numerator, denominator) {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 10000) / 100;
}

/**
 * Flattens a given array.
 * @param {Object} array - array to be flattened.
 */
export function flattenArray(array) {
  return [].concat.apply([], array);
}
