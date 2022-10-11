import { createRoot } from 'react-dom/client';
import React from 'react';

import App from './App';
import Error from './Error';

import controllers from '../../controllers/controllers';

import { loadAppConfig } from './appConfig';

console.log(controllers);

const container = document.getElementById('root')!;
const root = createRoot(container);
loadAppConfig()
  .then(() =>
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  )
  .catch(() =>
    root.render(
      <React.StrictMode>
        <Error detail="" />
      </React.StrictMode>
    )
  );
