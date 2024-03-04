import React from 'react';
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
import './index.scss';
import Module from './module';

root.render(<Module/>)