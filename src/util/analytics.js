import ReactGA  from 'react-ga';

// Set up Google Analytics to track
export const track = ({ location }) => {
  ReactGA.initialize('UA-103015118-1');
  
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}