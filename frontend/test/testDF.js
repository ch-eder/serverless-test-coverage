import assert from "assert";

import {
  dfComputeAllResourcesDefs,
  dfComputeAllResourcesDefUse,
  dfComputeAllResourcesUses,
} from "../src/testCoverage/coverageCriteria/computeCoverageDF.js";
import {
  emptyGraph,
  graphWithoutNodes,
  graphWithoutLinks,
  graphSimple1,
  graphSimple2,
  graphMedium1,
  graphMedium2,
  complexGraph1,
} from "./testGraphs.js";
import {
  getCoverages,
  getAllOperationsOfClass,
} from "../src/util/dataCoverageUtils";

describe("DF: emptyGraph", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(emptyGraph),
        getAllOperationsOfClass("def", "database", emptyGraph)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(emptyGraph),
        getAllOperationsOfClass("def", "database", emptyGraph),
        getAllOperationsOfClass("use", "database", emptyGraph)
      ),
      100
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(emptyGraph),
        getAllOperationsOfClass("def", "database", emptyGraph)
      ),
      100
    );
  });
});

describe("DF: graphWithoutNodes", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphWithoutNodes),
        getAllOperationsOfClass("def", "database", graphWithoutNodes)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphWithoutNodes),
        getAllOperationsOfClass("def", "database", graphWithoutNodes),
        getAllOperationsOfClass("use", "database", graphWithoutNodes)
      ),
      100
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphWithoutNodes),
        getAllOperationsOfClass("def", "database", graphWithoutNodes)
      ),
      100
    );
  });
});

describe("DF: graphWithoutLinks", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphWithoutLinks),
        getAllOperationsOfClass("def", "database", graphWithoutLinks)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphWithoutLinks),
        getAllOperationsOfClass("def", "database", graphWithoutLinks),
        getAllOperationsOfClass("use", "database", graphWithoutLinks)
      ),
      100
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphWithoutLinks),
        getAllOperationsOfClass("def", "database", graphWithoutLinks)
      ),
      100
    );
  });
});

describe("DF: graphSimple1", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphSimple1),
        getAllOperationsOfClass("def", "database", graphSimple1)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphSimple1),
        getAllOperationsOfClass("def", "database", graphSimple1),
        getAllOperationsOfClass("use", "database", graphSimple1)
      ),
      100
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphSimple1),
        getAllOperationsOfClass("def", "database", graphSimple1)
      ),
      100
    );
  });
});

describe("DF: graphSimple2", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphSimple2),
        getAllOperationsOfClass("def", "database", graphSimple2)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphSimple2),
        getAllOperationsOfClass("def", "database", graphSimple2),
        getAllOperationsOfClass("use", "database", graphSimple2)
      ),
      0
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphSimple2),
        getAllOperationsOfClass("def", "database", graphSimple2)
      ),
      100
    );
  });
});

describe("DF: graphMedium1", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphMedium1),
        getAllOperationsOfClass("def", "database", graphMedium1)
      ),
      50
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphMedium1),
        getAllOperationsOfClass("def", "database", graphMedium1),
        getAllOperationsOfClass("use", "database", graphMedium1)
      ),
      66.67
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphMedium1),
        getAllOperationsOfClass("def", "database", graphMedium1)
      ),
      50
    );
  });
});

describe("DF: graphMedium2", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(graphMedium2),
        getAllOperationsOfClass("def", "database", graphMedium2)
      ),
      33.33
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(graphMedium2),
        getAllOperationsOfClass("def", "database", graphMedium2),
        getAllOperationsOfClass("use", "database", graphMedium2)
      ),
      40
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(graphMedium2),
        getAllOperationsOfClass("def", "database", graphMedium2)
      ),
      33.33
    );
  });
});

describe("DF: graphComplex", () => {
  it("dfComputeAllResourcesDefs", () => {
    assert.equal(
      dfComputeAllResourcesDefs(
        getCoverages(complexGraph1),
        getAllOperationsOfClass("def", "database", complexGraph1)
      ),
      100
    );
  });

  it("dfComputeAllResourcesDefUse", () => {
    assert.equal(
      dfComputeAllResourcesDefUse(
        getCoverages(complexGraph1),
        getAllOperationsOfClass("def", "database", complexGraph1),
        getAllOperationsOfClass("use", "database", complexGraph1)
      ),
      66.67
    );
  });

  it("dfComputeAllResourcesUses", () => {
    assert.equal(
      dfComputeAllResourcesUses(
        getCoverages(complexGraph1),
        getAllOperationsOfClass("def", "database", complexGraph1)
      ),
      0
    );
  });
});
