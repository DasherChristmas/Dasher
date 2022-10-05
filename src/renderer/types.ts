const protocols = ['E131', 'LOR', 'ArtNet'] as const;
export type Protocol = typeof protocols[number]; // todo: make union type after finish dasher-controllers

interface T {
  optional?: boolean;
}
interface T1 extends T {
  type: 'string';
  enum?: readonly string[];
}
interface T2 extends T {
  type: 'number' | 'bigint' | 'boolean';
}
interface T3 extends T {
  type: 'array';
  items: SchemaDescriptor;
}
interface T4 extends T {
  type: 'object';
  properties: Record<string, SchemaDescriptor>;
}

type SchemaDescriptor = T1 | T2 | T3 | T4;

type SchemaString<S extends T1> = S['enum'] extends readonly string[]
  ? S['enum'][number]
  : string;
type SchemaArray<S extends T3> = FromSchema<S['items']>[];
type SchemaObject<S extends T4> = {
  [prop in keyof S['properties'] as S['properties'][prop] extends {
    optional: true;
  }
    ? never
    : prop]: FromSchema<S['properties'][prop]>;
} & {
  [prop in keyof S['properties'] as S['properties'][prop] extends {
    optional: true;
  }
    ? prop
    : never]?: FromSchema<S['properties'][prop]>;
};

export type FromSchema<S extends SchemaDescriptor> = S extends T1
  ? SchemaString<S>
  : S extends T2
  ? S['type'] extends 'number'
    ? number
    : S['type'] extends 'bigint'
    ? bigint
    : S['type'] extends 'boolean'
    ? boolean
    : never
  : S extends T3
  ? SchemaArray<S>
  : S extends T4
  ? SchemaObject<S>
  : never;

export const controllerSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
    },
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
      optional: true,
    },
    type: {
      type: 'string',
      enum: ['Ethernet', 'USB', 'Null'],
    },
    vendor: {
      type: 'string',
    },
    model: {
      type: 'string',
    },
    variant: {
      type: 'string',
    },
    autoSize: {
      type: 'boolean',
    },
    fullControl: {
      type: 'boolean',
    },
    defaultBrightness: {
      type: 'number',
    },
    activeState: {
      type: 'string',
      enum: ['Active', 'Inactive', 'Dasher Only'],
    },
    autoLayout: {
      type: 'boolean',
    },
    autoUpload: {
      type: 'boolean',
    },
    suppressDuplicateFrames: {
      type: 'boolean',
    },
    ip: {
      type: 'string',
    },
    protocol: {
      type: 'string',
      enum: protocols,
    },
    fppProxy: {
      type: 'string',
    },
    priority: {
      type: 'number',
    },
    version: {
      type: 'number',
    },
    expanded: {
      type: 'boolean',
    },
    ups: {
      type: 'boolean',
    },
    universes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          port: {
            type: 'string',
          },
          baudRate: {
            type: 'number',
          },
          networkType: {
            type: 'string',
            enum: protocols,
          },
          maxChannels: {
            type: 'number',
          },
        },
      },
    },
  },
} as const;

export type Controller = FromSchema<typeof controllerSchema>;
