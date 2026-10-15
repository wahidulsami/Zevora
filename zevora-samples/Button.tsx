import React, { useState, useCallback, ReactNode } from 'react';

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'ghost';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  disabled?: boolean;
}

export function Button({ label, variant = 'primary', onClick, children, disabled }: ButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  const handlePress = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(true);
      onClick?.(event);
    },
    [onClick]
  );

  return (
    <>
      <button
        className={`btn btn--${variant}`}
        type="button"
        aria-pressed={pressed}
        data-testid="zevora-button"
        disabled={disabled}
        onClick={handlePress}
      >
        {children ?? <span className="btn__label">{label}</span>}
      </button>
      <p className="btn__hint">Press to activate</p>
    </>
  );
}

export default Button;
