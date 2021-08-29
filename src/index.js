import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Details from './components/Details';
import NotFound from './components/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/details/:id">
          <Details />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  </QueryClientProvider>,
  document.getElementById('root')
);
