import { NodePlopAPI } from "plop";
import { envGenerator } from "./generators/env.js";
import { routerGenerator } from "./generators/router.js";

export default function (plop: NodePlopAPI) {
  envGenerator(plop);
  routerGenerator(plop);
}
