import { observable, runInAction, action } from 'mobx';

export default class Matters {

  @observable process;
  @observable mattersData = [];
  @observable matterUpdateSelected;
  @observable matterUpdateIsSelected = false;
  @observable deleteSuccess = false;
  @observable updateSuccess = false;

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
         

          this.mattersData =  data;//.map((subject, index) => subject['key'] = index);
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
          this.process.showMessage('Asignatura Guardada Correctamente', 'success');
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
  updateMatterData = (programId, inp, updateMatterRequestDTO, subjectId) => {
    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ACTUALIZANDO ...';
    this.mattersService.updateMatter(programId, inp, updateMatterRequestDTO, subjectId)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.updateSuccess = true;
          this.process.showMessage('Asignatura Actualizada Correctamente', 'success');
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
  deleteMatterData = (programId, inp, matterId) => {
    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ELIMINANDO ...';
    this.mattersService.deleteMatter(programId, inp, matterId)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.deleteSuccess = true;
          this.process.showMessage('Asignatura Eliminada Correctamente', 'success');
          this.process.processDTO.loading = false;
        });
      })
      .catch(error => {
        
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
        this.process.processDTO.loading = false;
        
      });
  };

  setMatterUpdateSelected = (matterUpdateSelected) => {
    this.matterUpdateSelected = matterUpdateSelected;
  };

  setMatterUpdateIsSelected = (matterUpdateIsSelected) => {
    this.matterUpdateIsSelected = matterUpdateIsSelected;
  };

  setDeleteSuccess = (deleteSuccess) => {
    this.deleteSuccess = deleteSuccess;
  };

  setUpdateSuccess = (updateSuccess) => {
    this.updateSuccess = updateSuccess;
  };

}
