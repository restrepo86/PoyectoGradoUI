import RespuestaOtorgamientoService from './RespuestaOtorgamientoService';
import Settings from '../Settings';

export const respuestaOtorgamientoService = new RespuestaOtorgamientoService(`${Settings.URL_WEBAPI}`);