import './NumberInput.scss';

const NumberInput: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    color:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'quaternary'
      | 'quinary'
      | 'none'
      | string;
  }
> = ({
  color,
  className,
  onKeyDown,
  min = -Infinity,
  max = Infinity,
  onChange,
  onBlur,
  ...rest
}) => (
  <input
    type="number"
    className={`NumberInput ${color} ${className || ''}`}
    min={min}
    max={max}
    {...rest}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        (e.target as HTMLInputElement).blur();
      }
      onKeyDown?.(e);
    }}
    onChange={(e) => {
      if (e.target.value >= min && e.target.value <= max) onChange?.(e);
    }}
    onBlur={(e) => {
      onBlur?.(e);
      if (e.defaultPrevented) return;
      if (e.target.value < min) e.target.value = min as string;
      if (e.target.value > max) e.target.value = max as string;
      onChange?.(e);
    }}
  />
);

export default NumberInput;
