import { observable, runInAction, action } from 'mobx';

export default class Programs {

  @observable programsService;
  @observable process;
  @observable programsData;
  @observable programUpdateDataRequest;
  @observable saveSuccess =  false;
  @observable updateSuccess = false;
  @observable deleteSuccess = false;

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
          const programs = data.map(program => { return { 'title': program.nombre, 'programData': program }})
          this.programsData = programs;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  saveProgramData = (programRequestDTO) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'GUARDANDO ...';
    this.programsService.saveProgram(programRequestDTO)
      .then(response => {
        runInAction(() => {
          
          const { data } = response;
          const item = { 'title': data.nombre, 'programData': data };
          this.programsData.push(item);
          this.process.showMessage('Programa Guardado Correctamente', 'success');
          this.process.processDTO.loading = false;
          this.saveSuccess = true;
          
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
        this.process.processDTO.loading = false;
      });

  };

  @action
  updateProgramsData = (programId, programUpdateRequestDTO) => {
    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ACTUALIZANDO ...';
    this.programsService.updateProgram(programId, programUpdateRequestDTO)
      .then(response => {
        runInAction(() => {
         
          this.process.showMessage('Programa Actualizado Correctamente', 'success');
          this.process.processDTO.loading = false;
          this.updateSuccess = true;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  deleteProgram = (programId) => {
    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ELIMINANDO ...';
    this.programsService.deleteProgram(programId)
      .then(response => {
        runInAction(() => {
          this.deleteSuccess = true;
          this.process.showMessage('Programa Eliminado Correctamente', 'success');
          this.process.processDTO.loading = false;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  resetForm = () => {
    this.filterDataDTO.initialize();
    this.expressFormData = null;
  };

  getData = () => this.filterDataDTO.getData();

  setSaveSuccess = (saveSucess) => {
    this.saveSuccess = saveSucess;
  };

  setUpdateSuccess = (updateSuccess) => {
    this.updateSuccess = updateSuccess;
  };

  setProgramUpdateDataRequest = (programUpdateDataRequest) => {
    this.programUpdateDataRequest = programUpdateDataRequest;
  };

  setDeleteProgramSuccess = (deleteSuccess) => {
    this.deleteSuccess = deleteSuccess;
  };

}
