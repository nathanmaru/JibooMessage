import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

const outsideTheme = createTheme({
	palette: {
		type: 'light',

		primary: {
			main: '#838CFF',
			dark: '#5b62b2',
			light: '#9ba3ff',
			contrastText: 'rgba(255,255,222,0.87)',
		},
		secondary: {
			main: '#ea5a5a',
		},
	},
});

export const theme = createTheme({
	palette: {
		type: 'light',

		primary: {
			main: '#838CFF',
			dark: '#5b62b2',
			light: '#9ba3ff',
			contrastText: 'rgba(255,255,222,0.87)',
		},
	},
	// label: {
	// 	backgroundColor: 'white',
	// },
	components: {
		MuiListItemButton: {
			styleOverrides: {
				root: {
					':hover': { color: '#9ba3ff' },
					'&.Mui-selected': {
						backgroundColor: 'rgba(229, 231, 235, 1)',
					},
				},
			},
		},
		MuiListItemIcon: {
			styleOverrides: {
				root: {
					width: '10px',
					':hover': { color: 'rgba(229, 231, 235, 1)', color: '#9ba3ff' },
				},
			},
		},
	},
});
