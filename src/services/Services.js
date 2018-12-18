import ProgramsService from './ProgramsService';
import Settings from '../Settings';

export const programsService = new ProgramsService(`${Settings.URL_WEBAPI}`);
