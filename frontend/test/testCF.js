import assert from "assert";

import {
  cfComputeAllResources,
  cfComputeAllResourceRelations,
  cfComputeAllResourceSequences,
} from "../src/testCoverage/coverageCriteria/computeCoverageCF.js";
import {
  emptyGraph,
  graphWithoutNodes,
  graphWithoutLinks,
  graphSimple1,
  graphSimple2,
  graphMedium1,
  graphMedium2,
  complexGraph1,
  complexGraph2,
  complexGraph3,
} from "./testGraphs.js";

describe("CF: emptyGraph", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(emptyGraph), 0);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(emptyGraph), 0);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(emptyGraph), 0);
  });
});

describe("CF: graphWithoutNodes", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphWithoutNodes), 0);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphWithoutNodes), 0);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphWithoutNodes), 0);
  });
});

describe("CF: graphWithoutLinks", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphWithoutLinks), 50);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphWithoutLinks), 0);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphWithoutLinks), 0);
  });
});

describe("CF: simpleGraph1", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphSimple1), 50);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphSimple1), 0);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphSimple1), 0);
  });
});

describe("CF: simpleGraph2", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphSimple2), 66.67);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphSimple2), 50);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphSimple2), 50);
  });
});

describe("CF: mediumGraph1", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphMedium1), 75);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphMedium1), 66.67);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphMedium1), 66.67);
  });
});

describe("CF: mediumGraph2", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(graphMedium2), 80);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(graphMedium2), 80);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(graphMedium2), 80);
  });
});

describe("CF: complexGraph1", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(complexGraph1), 57.14);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(complexGraph1), 50.0);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(complexGraph1), 44.44);
  });
});

describe("CF: complexGraph2", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(complexGraph2), 75);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(complexGraph2), 71.43);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(complexGraph2), 66.67);
  });
});

describe("CF: complexGraph3", () => {
  it("cfComputeAllResources", () => {
    assert.equal(cfComputeAllResources(complexGraph3), 75);
  });

  it("cfComputeAllResourceRelations", () => {
    assert.equal(cfComputeAllResourceRelations(complexGraph3), 71.43);
  });

  it("cfComputeAllResourceSequences", () => {
    assert.equal(cfComputeAllResourceSequences(complexGraph3), 72.73);
  });
});
