import { createMuiTheme } from '@material-ui/core/styles';

export const ColorsPicasso = {
	navy: '#131325',
	red: '#B22132',
	white: '#FFFFFF',
}

export const ThemePicasso = createMuiTheme({
	palette: {
		primary: {
			main: ColorsPicasso.navy,
			contrastText: ColorsPicasso.white,
		},
		secondary: {
			main: ColorsPicasso.white,
			contrastText: ColorsPicasso.navy,
		},
		text: {
			primary: ColorsPicasso.white,
		},
		background: {
			default: ColorsPicasso.navy,
		},
	},
	typography: {
		useNextVariants: true,
	},
	headerHeight: 64,
});
