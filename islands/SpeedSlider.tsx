import { speed } from "../lib/speed.ts";
import IconPlus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/plus.tsx";
import IconMinus from "https://deno.land/x/tabler_icons_tsx@0.0.2/tsx/minus.tsx";

export default function SpeedSlider() {
  return (
    <div className="flex text-xs sm:text-base">
      <IconPlus
        onClick={() => speed.value = Math.max(speed.value - 50, 50)}
      />
      <input
        type="range"
        min="50"
        max="1000"
        step="50"
        value={speed.value}
        onChange={(e) =>
          speed.value = (e.target as HTMLInputElement).valueAsNumber}
      />
      <IconMinus
        onClick={() => speed.value = Math.min(speed.value + 50, 1000)}
      />
    </div>
  );
}
