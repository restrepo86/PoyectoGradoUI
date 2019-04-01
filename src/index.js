import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { programsService } from './services/Services';
import Process from './stores/Process';
import Filter from './stores/Filter';
import './index.css';
import App from './App';
import ListComponentStore from './stores/ListComponentStore';


const process =  new Process();
const filter = new Filter(programsService, process);
const dataListComponent = new ListComponentStore();
const stores = { filter, dataListComponent };

const routes = (
    <BrowserRouter>      
        <LocaleProvider locale={es_ES}>
          <App stores={stores} />
        </LocaleProvider>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
