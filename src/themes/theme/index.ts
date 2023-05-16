import Default from './default';

import { PaletteThemeProps } from 'types/theme';
import { PalettesProps } from '@ant-design/colors';

const Theme = (colors: PalettesProps): PaletteThemeProps => {
  return Default(colors);
};

export default Theme;
