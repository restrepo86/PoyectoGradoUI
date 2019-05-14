import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter  } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import es_ES from 'antd/lib/locale-provider/es_ES';
import { programsService, studyPlanService, mattersService, loginService} from './services/Services';
import Process from './stores/Process';
import './index.css';
import App from './App';
import ProgramsComponentStore from './stores/ProgramsComponentStore';
import Programs from './stores/Programs';
import StudyPlan from './stores/StudyPlan';
import Matters from './stores/Matters';
import InpComponentStore from './stores/InpComponentStore';
import LoginStore from './stores/LoginStore';


const process =  new Process();
const programs = new Programs(programsService, process);
const studyPlan = new StudyPlan(studyPlanService, process);
const matters = new Matters(mattersService, process);
const loginStore = new LoginStore(loginService, process);
const programsComponentStore = new ProgramsComponentStore();
const inpComponentStore = new InpComponentStore();

const stores = { programs, programsComponentStore, studyPlan, matters, loginStore, process, inpComponentStore };

const routes = (
    <BrowserRouter>      
        <LocaleProvider locale={es_ES}>
          <App stores={stores} />
        </LocaleProvider>
    </BrowserRouter>
);

ReactDOM.render(routes, document.getElementById('root'));
