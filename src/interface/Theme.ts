import { Theme as MuiTheme, Palette as MuiPalette, PaletteColor as MuiPaletteColor } from '@mui/material';
import { CustomShadow } from './CustomShadow';

export interface PaletteColor extends MuiPaletteColor {
  lighter: string;
  darker: string;
}

interface Palette extends MuiPalette {
  primary: PaletteColor;
  secondary: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  warning: PaletteColor;
  error: PaletteColor;
}

export interface Theme extends MuiTheme {
  customShadows: CustomShadow;
  palette: Palette;
}
