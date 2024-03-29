import { defineConfig } from "@twind/core";
import presetAutoprefix from "https://esm.sh/@twind/preset-autoprefix@1.0.7";
import presetTailwind from "https://esm.sh/@twind/preset-tailwind@1.1.4";

export default {
  ...defineConfig({
    presets: [presetAutoprefix(), presetTailwind()],
  }),
  selfURL: import.meta.url,
};
