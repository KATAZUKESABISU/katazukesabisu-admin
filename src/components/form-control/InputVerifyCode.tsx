import React, { ChangeEvent, KeyboardEvent } from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';
import { FormGroup, alpha, styled, TextField, Typography, Box } from '@mui/material';

interface InputVerifyCodeProps {
  name: string;
  label?: string;
  size: number;
}

const StyledInput = styled(TextField)(() => ({
  width: '56px',
  height: '56px',

  '.MuiOutlinedInput-input': {
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
}));

const InputVerifyCode = ({ name, label, size }: InputVerifyCodeProps) => {
  const { control, getValues } = useFormContext();

  const focusNextInput = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    if (index < size - 1 && e.key.length === 1 && e.key !== ' ') {
      const input = document.querySelector(`input[name="${name}.${index + 1}"]`) as HTMLInputElement;
      input.focus();
    }
  };

  const focusPrevInput = (e: KeyboardEvent<HTMLDivElement>, index: number) => {
    const inputValue = getValues(`${name}.${index}`);

    if (inputValue === '' && e.code === 'Backspace' && index > 0) {
      const input = document.querySelector(`input[name="${name}.${index - 1}"]`) as HTMLInputElement;
      input.focus();
      return;
    }
  };

  return (
    <React.Fragment>
      <FormGroup>
        <Typography variant="body1">{label}</Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {[...Array(size)].map((_, idx) => (
            <React.Fragment key={idx}>
              <Controller
                name={`${name}.${idx}`}
                control={control}
                render={({ field: { onChange, onBlur, ref, value }, formState: { errors } }) => (
                  <StyledInput
                    ref={ref}
                    name={`${name}.${idx}`}
                    inputProps={{ maxLength: '1' }}
                    value={value}
                    error={Boolean(errors[name])}
                    onBlur={onBlur}
                    onChange={onChange}
                    onKeyUp={(e) => focusNextInput(e, idx)}
                    onKeyDown={(e) => focusPrevInput(e, idx)}
                  />
                )}
              />
            </React.Fragment>
          ))}
        </Box>
      </FormGroup>
    </React.Fragment>
  );
};

export default InputVerifyCode;
