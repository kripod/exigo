import { Button } from '@chakra-ui/core';
import React from 'react';

type RadioButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  isChecked?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
};

const RadioButton = React.forwardRef(
  (
    { isChecked, isDisabled, ...restProps }: RadioButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <Button
        ref={ref}
        aria-checked={isChecked}
        role="radio"
        isDisabled={isDisabled}
        {...restProps}
      />
    );
  },
);

export default RadioButton;
