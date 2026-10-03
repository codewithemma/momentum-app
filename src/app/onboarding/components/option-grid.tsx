import { Option } from "./data";
import { OptionButton } from "./option-button";

interface OptionGridProps {
  label: string;
  options: Option[];
  multi: boolean;
  isSelected: (value: string) => boolean;
  onToggle: (value: string) => void;
  columns: string;
}

export function OptionGrid({
  label,
  options,
  multi,
  isSelected,
  onToggle,
  columns,
}: OptionGridProps) {
  return (
    <fieldset className="mt-8">
      <legend className="sr-only">{label}</legend>

      <div className={`grid grid-cols-1 gap-2 ${columns}`}>
        {options.map(({ label: optionLabel, value, Icon }) => (
          <OptionButton
            key={value}
            label={optionLabel}
            Icon={Icon}
            multi={multi}
            selected={isSelected(value)}
            onToggle={() => onToggle(value)}
          />
        ))}
      </div>
    </fieldset>
  );
}
