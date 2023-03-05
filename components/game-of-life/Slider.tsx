interface SliderProps {
  speed: number;
  onSpeedChange: (s: number) => void;
}

export function Slider(props: SliderProps) {
  const handleChange = (e: Event) =>
    props.onSpeedChange((e.target as HTMLInputElement).valueAsNumber);

  return (
    <input
      type="range"
      min="50"
      max="1000"
      step="50"
      value={props.speed}
      onChange={handleChange}
    />
  );
}
