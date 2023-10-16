import React from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';

// Markdown
import { MdEditor, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

// MUI
import { useTheme } from '@mui/material/styles';
import { postUpload } from 'src/api/image/postUpload';

// Message
import message from 'src/lang/en.json';
import { useAppDispatch } from 'src/store/hook';
import { endLoading, openSnackbar, startLoading } from 'src/store/ui';

interface EditorProps {
  name: string;
}

const toolbarsExclude: ToolbarNames[] = ['katex', 'htmlPreview', 'github', 'mermaid', 'save'];

export default function MarkdownEditor({ name }: EditorProps) {
  const { control } = useFormContext();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleUploadImage = async (image: File[], renderURL: (urls: string[]) => void) => {
    try {
      dispatch(startLoading());

      const formData = new FormData();
      formData.append('image', image[0]);

      const { data } = await postUpload(formData);
      renderURL([data]);
    } catch (e) {
      dispatch(openSnackbar({ message: message['error.upload.image'], severity: 'error' }));
    } finally {
      dispatch(endLoading());
    }
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref, value } }: FieldValues) => (
          <MdEditor
            editorId={name}
            ref={ref}
            language="en-US"
            modelValue={value}
            toolbarsExclude={toolbarsExclude}
            theme={theme.palette.mode}
            onChange={onChange}
            onUploadImg={handleUploadImage}
          />
        )}
      />
    </>
  );
}
