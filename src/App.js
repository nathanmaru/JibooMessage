import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Authentication from './hocs/authentication';
import MiniDrawer from './materialUI/components/drawer';
import { ThemeProvider } from '@mui/material/styles';
import { theme, outsideTheme } from './contexts/materialThemes';
import outsideRoutes from './routes/outsideRoutes';
import insideRoutes from './routes/insideRoutes';

function App() {
	return (
		<>
			<Switch>
				{outsideRoutes}
				<ThemeProvider theme={outsideTheme}>
					<Authentication>
						<MiniDrawer>{insideRoutes}</MiniDrawer>
					</Authentication>
				</ThemeProvider>
			</Switch>
		</>
	);
}

export default App;
