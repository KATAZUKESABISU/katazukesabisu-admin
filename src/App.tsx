import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import StyledChart from './components/chart/styles';
import Router from './routes';
import Snackbar from './components/snackbar';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
          <Snackbar />
        </ThemeProvider>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
