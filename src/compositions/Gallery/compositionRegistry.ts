import { CompositionDef } from "./types";
import { CORE_REGISTRY } from "./registries/core";
import { MANGO_GIRAFFE_REGISTRY } from "./registries/mangoGiraffe";

export * from "./types";

export const REGISTRY: CompositionDef[] = [
  ...CORE_REGISTRY,
  ...MANGO_GIRAFFE_REGISTRY,
];
