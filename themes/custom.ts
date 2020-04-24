import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    themeName?: string;
  }
}

const palette = {
  primary: { main: '#3f51b5' },
  secondary: { main: '#f50057' },
};

const themeName = 'Surveillo';

export default createMuiTheme({ palette, themeName });
