import './Button.scss';

const Button: React.FC<
  {
    color:
      | 'accent'
      | 'secondary'
      | 'tertiary'
      | 'quaternary'
      | 'quinary'
      | 'red';
  } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
> = ({ color, className, children, ...rest }) => (
  <button
    type="button"
    className={`Button ${color} ${className || ''}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
