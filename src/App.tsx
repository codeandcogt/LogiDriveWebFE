import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './router';
import { Loading } from './components';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppRouter />
      </Suspense>
    </Router>
  );
}

export default App;