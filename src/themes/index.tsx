import { ReactNode, useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';
import useConfig from 'hooks/useConfig';
import Palette from './palette';
import Typography from './typography';
import componentsOverride from './overrides';

type ThemeCustomizationProps = {
  children: ReactNode;
};

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { fontFamily } = useConfig();

  const theme: Theme = useMemo<Theme>(() => Palette(), []);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(fontFamily, theme),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fontFamily]
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      typography: themeTypography
    }),
    [themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
