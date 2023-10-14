import React, { useEffect } from 'react';
import { useDropzone, DropzoneInputProps } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

// Mui
import { Box, Typography, alpha, styled, useTheme } from '@mui/material';

const StyledImage = styled('img')({
  position: 'absolute',
  width: 'calc(100% - 2rem)',
  height: 'calc(100% - 2rem)',
  objectFit: 'cover',
  top: '1rem',
  left: '1rem',
  backgroundPosition: 'center center',
});

const StyledContainer = styled(Box)({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dashed #919EAB',
  borderRadius: '8px',
  padding: '2rem',
  cursor: 'pointer',
  gap: '2rem',
  height: '400px',
});

interface InputFileUploadProps {
  name: string;
  label: string;
  url?: string;
}

const InputFileUpload = ({ name, label, url }: InputFileUploadProps) => {
  const { control, setValue } = useFormContext();
  const theme = useTheme();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone();

  useEffect(() => {
    setValue(name, acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles]);

  const {
    onChange: onDropChange,
    onClick: onDropClick,
    ref: dropRef,
  } = getInputProps() as DropzoneInputProps & React.ClassAttributes<HTMLInputElement>;

  return (
    <>
      <Typography>{label}</Typography>
      <StyledContainer
        {...getRootProps()}
        sx={{
          ...(isDragActive && {
            background: alpha('#00AB55', 0.12),
          }),
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        }}
      >
        <Controller
          name={name}
          control={control}
          render={() => (
            <input
              ref={dropRef}
              hidden
              type="file"
              accept="image/png, image/jpeg"
              name={name}
              onClick={onDropClick}
              multiple={false}
              onChange={onDropChange}
            />
          )}
        />

        <img src="/assets/illustrations/upload.svg" alt="Upload your image" />

        {isDragActive ? (
          <Box
            sx={{
              width: '400px',
              [theme.breakpoints.down('sm')]: {
                width: 'fit-content',
              },
            }}
          >
            <Typography variant="h3">Select file</Typography>
            <Typography variant="body1">Drop the files here ...</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: '400px',
              [theme.breakpoints.down('sm')]: {
                width: 'fit-content',
              },
            }}
          >
            <Typography variant="h3">Select file</Typography>
            <Typography variant="body1">Drag and drop some files here, or click to select files</Typography>
          </Box>
        )}
        {acceptedFiles.map((item, idx) => {
          if (idx !== 0) {
            return null;
          }

          const src = URL.createObjectURL(item);

          return (
            <React.Fragment key={idx}>
              <StyledImage src={src} alt={item.name} />
            </React.Fragment>
          );
        })}

        {acceptedFiles.length === 0 && url && (
          <React.Fragment>
            <StyledImage src={url} alt={name} />
          </React.Fragment>
        )}
      </StyledContainer>
    </>
  );
};

export default InputFileUpload;
