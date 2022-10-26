import React, { useState, useEffect } from 'react';
import useUpdateEffect from 'react-use/lib/useUpdateEffect';
import './Toggle.scss';

const Toggle: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
    onChange?: (value: boolean) => void;
  }
> = ({ className, defaultChecked, onChange, ...elemProps }) => {
  const [value, setValue] = useState(!!defaultChecked);

  useUpdateEffect(() => {
    onChange?.(value);
  }, [value]);
  return (
    <label className={`Toggle ${className || ''}`}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
        {...elemProps}
      />
    </label>
  );
};

Toggle.defaultProps = {
  onChange() {},
};

export default Toggle;
