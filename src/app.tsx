import { hot } from 'react-hot-loader/root';
import * as React from 'react';

function App() {
  const [name, setName] = React.useState('');

  return (
    <main>
      <h1>Simple App</h1>
      <input value={name} onChange={ev => setName(ev.target.value)} />
    </main>
  );
}

export default hot(App);
