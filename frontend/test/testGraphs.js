export const emptyGraph = {};

export const graphWithoutNodes = {
  links: [
    {
      source: "1",
      target: "2",
      operation: "GET",
    },
  ],
};

export const graphWithoutLinks = {
  nodes: [
    {
      id: "1",
    },
    {
      id: "2",
      visited: true,
    },
  ],
};

export const graphSimple1 = {
  nodes: [
    {
      id: "1",
    },
    {
      id: "2",
      visited: true,
    },
  ],
  links: [
    {
      source: "1",
      target: "2",
      operation: "GET",
    },
  ],
};

export const graphSimple2 = {
  nodes: [
    {
      id: "1",
    },
    {
      id: "2",
      visited: "true",
      type: "database",
    },
    {
      id: "3",
      visited: "true",
    },
  ],
  links: [
    {
      source: "1",
      target: "2",
      operation: "GET",
    },
    {
      source: "3",
      target: "2",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: "all" },
        },
      ],
    },
  ],
};

export const graphMedium1 = {
  nodes: [
    {
      id: "1",
    },
    {
      id: "2",
      visited: "true",
    },
    {
      id: "3",
      visited: "true",
    },
    {
      id: "4",
      visited: "true",
      type: "database",
    },
  ],
  links: [
    {
      source: "1",
      target: "4",
      operation: "PutItem",
    },
    {
      source: "2",
      target: "4",
      operation: "PutItem",
      visited: "true",
      traceDetails: [
        {
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "3",
      target: "4",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          startTime: 3,
          endTime: 4,
          variable: { resourceName: "NameA", variableName: "all" },
        },
      ],
    },
  ],
};

export const graphMedium2 = {
  nodes: [
    {
      id: "1",
      visited: "true",
      type: "database",
    },
    {
      id: "2",
      visited: "true",
    },
    {
      id: "3",
      visited: "true",
    },
    {
      id: "4",
      visited: "true",
      type: "database",
    },
    {
      id: "5",
    },
  ],
  links: [
    {
      source: "2",
      target: "1",
      operation: "PutItem",
      visited: "true",
      traceDetails: [
        {
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "2",
      target: "1",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          startTime: 3,
          endTime: 4,
          variable: { resourceName: "NameA", variableName: "all" },
        },
      ],
    },
    {
      source: "3",
      target: "1",
      operation: "PutItem",
      visited: "true",
      traceDetails: [
        {
          startTime: 5,
          endTime: 6,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "2",
      target: "4",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          startTime: 7,
          endTime: 8,
          variable: { resourceName: "NameB", variableName: "all" },
        },
      ],
    },
    {
      source: "5",
      target: "4",
      operation: "PutItem",
      traceDetails: [
        {
          startTime: 9,
          endTime: 10,
          variable: { resourceName: "NameB", variableName: 8 },
        },
      ],
    },
  ],
};

export const complexGraph1 = {
  nodes: [
    {
      id: "1",
      visited: "true",
    },
    {
      id: "2",
      visited: "true",
    },
    {
      id: "3",
      visited: "true",
      type: "database",
    },
    {
      id: "4",
    },
    {
      id: "5",
      visited: "true",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
  ],
  links: [
    {
      source: "1",
      target: "2",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "1",
          parentSpanId: "null",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "2",
      target: "3",
      operation: "PutItem",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "2",
          parentSpanId: "1",
          startTime: 2.5,
          endTime: 3,
          variable: { resourceName: "NameA", variableName: 8 },
        },
        {
          traceId: "2",
          spanId: "1",
          parentSpanId: "7",
          startTime: 4,
          endTime: 5,
          variable: { resourceName: "NameA", variableName: 7 },
        },
        {
          traceId: "3",
          spanId: "1",
          parentSpanId: "8",
          startTime: 8,
          endTime: 9,
          variable: { resourceName: "NameB", variableName: 8 },
        },
        {
          traceId: "4",
          spanId: "1",
          parentSpanId: "9",
          startTime: 10,
          endTime: 11,
          variable: { resourceName: "NameA", variableName: 4 },
        },
        {
          traceId: "5",
          spanId: "1",
          parentSpanId: "20",
          startTime: 15,
          endTime: 16,
          variable: { resourceName: "NameA", variableName: 4 },
        },
      ],
    },
    {
      source: "4",
      target: "3",
      operation: "Scan",
    },
    {
      source: "5",
      target: "3",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          traceId: "346",
          spanId: "sfsg",
          parentSpanId: "sdf",
          startTime: 6,
          endTime: 7,
          variable: { resourceName: "NameA", variableName: "all" },
        },
        {
          traceId: "sdgg",
          spanId: "23rf",
          parentSpanId: "454",
          startTime: 12,
          endTime: 13,
          variable: { resourceName: "NameA", variableName: "all" },
        },
        {
          traceId: "134rs",
          spanId: "2wt",
          parentSpanId: "234",
          startTime: 12,
          endTime: 14,
          variable: { resourceName: "NameA", variableName: "all" },
        },
        {
          traceId: "sg",
          spanId: "fh",
          parentSpanId: "342",
          startTime: 15,
          endTime: 18,
          variable: { resourceName: "NameB", variableName: "all" },
        },
      ],
    },
    {
      source: "6",
      target: "5",
      operation: "Invoke",
    },
    {
      source: "7",
      target: "5",
      operation: "Invoke",
    },
  ],
};

export const complexGraph2 = {
  nodes: [
    {
      id: "0",
      visited: "true",
    },
    {
      id: "1",
      visited: "true",
    },
    {
      id: "2",
      visited: "true",
    },
    {
      id: "3",
      visited: "true",
    },
    {
      id: "4",
    },
    {
      id: "5",
      visited: "true",
    },
    {
      id: "6",
      visited: "true",
    },
    {
      id: "7",
    },
  ],
  links: [
    {
      source: "0",
      target: "1",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "1",
          parentSpanId: "null",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "1",
      target: "2",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "2",
          parentSpanId: "1",
          startTime: 3,
          endTime: 4,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "2",
      target: "3",
      operation: "Write",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "3",
          parentSpanId: "2",
          startTime: 5,
          endTime: 6,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "4",
      target: "3",
      operation: "Scan",
    },
    {
      source: "5",
      target: "3",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          traceId: "2",
          spanId: "2",
          parentSpanId: "1",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "6",
      target: "5",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "3",
          spanId: "1",
          parentSpanId: "null",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "7",
      target: "5",
      operation: "Invoke",
    },
  ],
};

export const complexGraph3 = {
  nodes: [
    {
      id: "0",
      visited: "true",
    },
    {
      id: "1",
      visited: "true",
    },
    {
      id: "2",
      visited: "true",
    },
    {
      id: "3",
      visited: "true",
    },
    {
      id: "4",
    },
    {
      id: "5",
      visited: "true",
    },
    {
      id: "6",
      visited: "true",
    },
    {
      id: "7",
    },
  ],
  links: [
    {
      source: "0",
      target: "2",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "1",
          parentSpanId: "null",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "1",
      target: "2",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "2",
          spanId: "1",
          parentSpanId: "null",
          startTime: 4,
          endTime: 5,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "2",
      target: "3",
      operation: "Write",
      visited: "true",
      traceDetails: [
        {
          traceId: "1",
          spanId: "2",
          parentSpanId: "1",
          startTime: 2,
          endTime: 3,
          variable: { resourceName: "NameA", variableName: 8 },
        },
        {
          traceId: "2",
          spanId: "2",
          parentSpanId: "1",
          startTime: 6,
          endTime: 7,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "4",
      target: "3",
      operation: "Scan",
    },
    {
      source: "5",
      target: "3",
      operation: "Scan",
      visited: "true",
      traceDetails: [
        {
          traceId: "3",
          spanId: "2",
          parentSpanId: "1",
          startTime: 5,
          endTime: 6,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "6",
      target: "5",
      operation: "Invoke",
      visited: "true",
      traceDetails: [
        {
          traceId: "3",
          spanId: "1",
          parentSpanId: "null",
          startTime: 1,
          endTime: 2,
          variable: { resourceName: "NameA", variableName: 8 },
        },
      ],
    },
    {
      source: "7",
      target: "5",
      operation: "Invoke",
    },
  ],
};
