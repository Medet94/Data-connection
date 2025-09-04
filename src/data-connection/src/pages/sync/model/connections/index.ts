import {sample} from "effector";

import {pageMounted, pageUnmounted} from "../events";
import {$isPageMounted} from "../stores";
import {loadPageDataFx} from "../effects";

//Page connections
$isPageMounted
  .on(pageMounted, () => true)
  .on(pageUnmounted, () => false);

sample({
  clock: pageMounted,
  target: loadPageDataFx,
});