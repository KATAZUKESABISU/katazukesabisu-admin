import React from 'react';
import { useFormContext, Controller, FieldValues } from 'react-hook-form';

// Markdown
import { MdEditor, ToolbarNames } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

// MUI
import { useTheme } from '@mui/material/styles';

interface EditorProps {
  name: string;
}

const toolbarsExclude: ToolbarNames[] = ['katex', 'htmlPreview', 'github', 'mermaid', 'save'];

export default function MarkdownEditor({ name }: EditorProps) {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, ref, value } }: FieldValues) => (
          <MdEditor
            onBlur={onBlur}
            ref={ref}
            language="en-US"
            modelValue={value}
            // toolbars={[]}
            toolbarsExclude={toolbarsExclude}
            theme={theme.palette.mode}
            onChange={onChange}
            preview={false}
            // footers={[]}
          />
        )}
      />
    </>
  );
}
