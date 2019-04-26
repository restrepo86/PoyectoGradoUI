import { observable, runInAction, action } from 'mobx';

export default class Matters {

  @observable mattersService;
  @observable process;
  @observable mattersData = [];

  constructor(mattersService, process) {
    this.mattersService = mattersService;
    this.process = process
  }

  @action
  getMattersData = (programId, inp) => {
    this.mattersService.getMatters(programId, inp)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.mattersData = data;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  saveMatterData = (programId, inp, asignaturaRequest) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'GUARDANDO ...';
    this.mattersService.saveMatter(programId, inp, asignaturaRequest)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          sessionStorage.setItem('saveMatterResponse', JSON.stringify(data));
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

}
