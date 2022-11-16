import { referencingSameLink } from "../../util/graphUtils";
import { calculatePercentage } from "../../util/utils";
import { findDevCoverage } from "../../util/dataCoverageUtils";

/**
 * Computes the all-resources-defs criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function dfComputeAllResourcesDefs(coverages, allDefs) {
  try {
    const defs = allDefs.length;
    if (defs === 0) return 100;

    const coveredDefs = allDefs.filter((def) => {
      const defCoverage = findDevCoverage(coverages, def);
      if (defCoverage) return defCoverage.uses.length > 0;
      return false;
    }).length;

    return calculatePercentage(coveredDefs, defs);
  } catch (error) {
    return 0;
  }
}

/**
 * Computes the all-resources-defuse criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function dfComputeAllResourcesDefUse(coverages, allDefs, allUses) {
  try {
    const defs = allDefs.length;
    const uses = allUses.length;
    if (defs + uses === 0) return 100;

    const coveredDefs = allDefs.filter((def) => {
      const defCoverage = findDevCoverage(coverages, def);
      if (defCoverage) return defCoverage.uses.length > 0;
      return false;
    }).length;

    const coveredUses = allUses.filter((use) => {
      for (const coverage of coverages) {
        if (
          coverage.uses.some((element) => {
            return referencingSameLink(use, element);
          })
        )
          return true;
      }
      return false;
    }).length;

    return calculatePercentage(coveredDefs + coveredUses, defs + uses);
  } catch (error) {
    return 0;
  }
}

/**
 * Computes the all-resources-uses criterion based on Winzinger and Wirtz.
 * @param {Object} graph - graph on which criterion is calculated on.
 */
export function dfComputeAllResourcesUses(coverages, allDefs) {
  const defs = allDefs.length;
  if (defs === 0) return 100;

  try {
    const coveredDefs = allDefs.filter((def) => {
      const defCoverage = findDevCoverage(coverages, def);
      if (!defCoverage) return false;
      for (const requiredUseOperation of defCoverage.allUses) {
        if (
          !defCoverage.uses.some((use) => {
            return referencingSameLink(use, requiredUseOperation);
          })
        ) {
          return false;
        }
      }

      return true;
    }).length;

    return calculatePercentage(coveredDefs, defs);
  } catch (error) {
    return 0;
  }
}
