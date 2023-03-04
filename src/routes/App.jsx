import React, { useState } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const App = () => {
  const [validation, setValidation] = useState(Boolean(localStorage.getItem('VALIDATION')) === true ? true : false);

  return (
    <section>
      {
        validation ? <PrivateRoutes /> : <PublicRoutes validation={setValidation} />
      }
    </section>
  );
};

export default App;