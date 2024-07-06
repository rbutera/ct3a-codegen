import { envGenerator } from "./generators/env.js";
import { routerGenerator } from "./generators/router.js";

export default function (plop) {
  envGenerator(plop);
  routerGenerator(plop);
}
