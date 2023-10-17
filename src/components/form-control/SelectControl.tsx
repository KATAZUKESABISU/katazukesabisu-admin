import React, { useCallback, useEffect, SyntheticEvent } from 'react';
import {
  useFormContext,
  Controller,
  FieldValues,
  ControllerRenderProps,
  UseFormStateReturn,
  ControllerFieldState,
} from 'react-hook-form';
import { Autocomplete, TextField, Chip } from '@mui/material';
import { styled, alpha, Theme } from '@mui/material/styles';

const StyledSearch = styled(Autocomplete)(({ theme }: { theme: Theme }) => ({
  width: 430,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    boxShadow: `0 8px 16px 0 ${alpha(theme.palette.grey[500], 0.16)}`,
    '& fieldset': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

type Option = {
  label: string;
  value: number;
};

interface SelectControlProps {
  label: string;
  name: string;
  initValue?: string;
  options: Option[];
}

interface FieldControlProps {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}

const SelectControl = ({ label, name, initValue = '', options = [] }: SelectControlProps) => {
  const { control, setValue } = useFormContext();

  useEffect(() => {
    if (initValue) {
      setValue(name, initValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initValue]);

  const renderInput = useCallback(
    ({ field }: FieldControlProps) => {
      return (
        <StyledSearch
          multiple
          sx={(theme) => ({ backdropFilter: theme.palette.mode === 'dark' ? 'blur(20px)' : 'unset' })}
          options={options}
          getOptionLabel={(option) => (option as Option).label}
          onChange={(event: SyntheticEvent<Element, Event>, newValue: unknown) => {
            const fieldValue = (newValue as Option[]).map((item) => item.value);
            field.onChange(fieldValue);
          }}
          renderTags={(value, getTagProps) =>
            (value as Option[]).map((option: Option, index: number) => (
              <React.Fragment key={index}>
                <Chip variant="outlined" label={option.label} {...getTagProps({ index })} />
              </React.Fragment>
            ))
          }
          renderInput={(params) => <TextField {...params} variant="outlined" placeholder={label} name={name} />}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <React.Fragment>
      <Controller name={name} control={control} render={renderInput} />
    </React.Fragment>
  );
};

export default SelectControl;
