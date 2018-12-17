import { observable, runInAction, action } from 'mobx';
import FilterDataDTO from '../dto/FilterDataDTO';
export default class Filter {

  @observable filterDataDTO;
  @observable process;
  @observable expressFormData;
  @observable respuestaOtorgamientoService;

  constructor(respuestaOtorgamientoService, process) {
    this.process = process;
    this.filterDataDTO = new FilterDataDTO();
    this.respuestaOtorgamientoService = respuestaOtorgamientoService;
    this.expressFormData = null;
  }

  @action
  getExpressFormData = () => {
    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'CONSULTANDO...';
    this.respuestaOtorgamientoService.getRespuestaOtorgamiento(this.filterDataDTO.cedula)
        .then(response => {
          runInAction(() => {
            const { data } = response;
            this.expressFormData = data;
            this.process.processDTO.loading = false;
          });
        })
        .catch(error => {
          const message = error.response ? error.response.headers.internalerrormessage 
          : new Error(error).message;
          this.process.showError(message, 'error');
          this.process.processDTO.loading = false;
          this.expressFormData = null;
        });
  };



  @action
  resetForm = () => {
    this.filterDataDTO.initialize();
    this.expressFormData = null;
  }

  getData = () => this.filterDataDTO.getData();

}
