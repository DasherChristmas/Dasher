import React, { useState, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';
import { mod } from '../../util';
import TextInput from '../TextInput/TextInput';
import './TypeableDropdown.scss';

const Option: React.FC<{
  option: string;
  setValue: (value: string) => void;
  search: string;
  focused: boolean;
}> = ({ option, setValue, search, focused }) => {
  const searchStart = search
    ? option.toLowerCase().indexOf(search.toLowerCase())
    : 0;
  const searchEnd = searchStart + search.length;
  return (
    <p
      className={`Option ${focused ? 'Focused' : ''}`}
      onMouseDown={() => {
        setValue(option);
      }}
      onKeyDown={() => setValue(option)}
      role="menuitem"
      tabIndex={-1}
    >
      {option.slice(0, searchStart)}
      <span className="Match">{option.slice(searchStart, searchEnd)}</span>
      {option.slice(searchEnd)}
    </p>
  );
};

const TypeableDropdown: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
    options: string[] | readonly string[];
    onChange?: (value: string) => void;
    color:
      | 'primary'
      | 'secondary'
      | 'tertiary'
      | 'quaternary'
      | 'quinary'
      | 'none'
      | string;
    className?: string;
    force?: boolean;
  }
> = ({
  color,
  options,
  onChange,
  defaultValue,
  className,
  force,
  disabled,
  ...rest
}) => {
  const [value, setValue] = useState<string>((defaultValue as string) || '');
  const [focused, setFocused] = useState(0);
  const filtered = options.filter((opt) =>
    value === '' ? true : opt?.toLowerCase()?.includes(value?.toLowerCase())
  );

  useUpdateEffect(() => {
    onChange?.(value);
  }, [value]);

  useEffect(() => {
    if (force && !options.includes(value)) setValue(options[0]);
  }, [options]);

  return (
    <div className={`TypeableDropdown ${color} ${className}`}>
      <TextInput
        color={color}
        {...rest}
        value={value}
        disabled={options.length <= 1 || disabled}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        onBlur={(e) => {
          if (force && !options.includes(value)) {
            setValue(options[0]);
          }
        }}
        spellCheck={false}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setValue(filtered[focused]);
          else if (e.key === 'ArrowUp')
            setFocused(mod(focused - 1, filtered.length));
          else if (e.key === 'ArrowDown')
            setFocused(mod(focused + 1, filtered.length));
          else if (e.key !== 'Shift') setFocused(0);
        }}
        onWheel={(e) => {
          if (
            (filtered.length > 0 || options.includes(value)) &&
            document.activeElement === e.currentTarget
          ) {
            setFocused(
              mod(
                focused + Math.abs(e.deltaY) / e.deltaY,
                options.includes(value) ? options.length : filtered.length
              )
            );
          } else {
            setValue(
              options[
                mod(
                  (options.includes(value) ? options.indexOf(value) : 0) +
                    Math.abs(e.deltaY) / e.deltaY,
                  options.length
                )
              ]
            );
          }
        }}
        onScrollCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
      <div className="OptionsContainer">
        {(options.includes(value) ? options : filtered).map((opt, idx) => (
          <Option
            option={opt}
            setValue={(newValue) => {
              setValue(newValue);
            }}
            search={options.includes(value) ? '' : value}
            focused={focused === idx}
            key={opt}
          />
        ))}
      </div>
    </div>
  );
};

TypeableDropdown.defaultProps = {
  onChange() {},
  defaultValue: '',
  className: '',
  force: false,
};

export default TypeableDropdown;
