import { observable, runInAction, action } from 'mobx';

export default class Filter {

  @observable programsService;
  @observable process;

  constructor(programsService, process) {
    this.programsService = programsService;
    this.process = process
  }

  @action
  getProgramsData = () => {
    this.programsService.getPrograms()
      .then(response => {
        runInAction(() => {
          const { data } = response;
        });
      })
      .catch(error => {
        const message = error.response ? error.response.headers.internalerrormessage
          : new Error(error).message;
      });
  };

  @action
  saveProgramData = (programRequestDTO, dataListComponenStore) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'GUARDANDO...';
    this.programsService.saveProgram(programRequestDTO)
      .then(response => {
        runInAction(() => {
          
          const { data } = response;
          const item = { 'title': response.data.nombre, 'url': response.data.id };
          dataListComponenStore.data.push(item);
          localStorage.setItem('data', JSON.stringify(dataListComponenStore.data));
          this.process.showMessage('Programa Guardado Correctamente', 'success');
          this.process.processDTO.loading = false;
          
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
        this.process.processDTO.loading = false;
      });

  };

  @action
  resetForm = () => {
    this.filterDataDTO.initialize();
    this.expressFormData = null;
  }

  getData = () => this.filterDataDTO.getData();

}
