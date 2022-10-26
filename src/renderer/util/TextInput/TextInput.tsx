import './TextInput.scss';

const TextInput: React.FC<
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
> = ({ color, className, onKeyDown, ...rest }) => (
  <input
    type="text"
    className={`TextInput ${color} ${className || ''}`}
    {...rest}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        (e.target as HTMLInputElement).blur();
      }
      onKeyDown?.(e);
    }}
  />
);

export default TextInput;
