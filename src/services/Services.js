import ProgramsService from './ProgramsService';
import StudyPlanService from './StudyPlanService';
import Settings from '../Settings';

export const programsService = new ProgramsService(`${Settings.URL_WEBAPI}`);
export const studyPlanService = new StudyPlanService(`${Settings.URL_WEBAPI}`);
