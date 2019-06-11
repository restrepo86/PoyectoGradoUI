import ProgramsService from './ProgramsService';
import StudyPlanService from './StudyPlanService';
import Settings from '../Settings';
import MattersService from './MattersService';
import LoginService from './LoginService';
import TrainingComponentService from './TrainingComponentService';

export const programsService = new ProgramsService(`${Settings.URL_WEBAPI}`);
export const studyPlanService = new StudyPlanService(`${Settings.URL_WEBAPI}`);
export const mattersService = new MattersService(`${Settings.URL_WEBAPI}`);
export const loginService = new LoginService(`${Settings.URL_WEBAPI}`);
export const trainingComponentService = new TrainingComponentService(`${Settings.URL_WEBAPI}`);