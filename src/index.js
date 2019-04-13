import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { programsService } from './services/Services';
import { studyPlanService } from './services/Services';
import { mattersService } from './services/Services';
import Process from './stores/Process';
import './index.css';
import App from './App';
import ListComponentStore from './stores/ListComponentStore';
import Programs from './stores/Programs';
import StudyPlan from './stores/StudyPlan';
import Matters from './stores/Matters';


const process =  new Process();
const programs = new Programs(programsService, process);
const studyPlan = new StudyPlan(studyPlanService, process);
const matters = new Matters(mattersService, process);
const dataListComponent = new ListComponentStore();
const stores = { programs, dataListComponent, studyPlan, matters };

const routes = (
    <BrowserRouter>      
        <LocaleProvider locale={es_ES}>
          <App stores={stores} />
        </LocaleProvider>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
