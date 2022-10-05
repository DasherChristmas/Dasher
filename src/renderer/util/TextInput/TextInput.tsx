import './TextInput.scss';

const TextInput: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    color?:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'quaternary'
      | 'quinary'
      | 'none';
  }
> = ({ color, className, ...rest }) => (
  <input
    type="text"
    className={`TextInput ${color} ${className || ''}`}
    {...rest}
  />
);

export default TextInput;
