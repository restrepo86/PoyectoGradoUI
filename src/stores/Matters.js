import { observable, runInAction, action } from 'mobx';

export default class Matters {

  @observable process;
  @observable mattersData = [];
  @observable subjetBySniesCodeData = {};
  @observable addDescriptionResponse;
  @observable descriptionsData = [];
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
          this.mattersData =  data;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  getMatterBySniesCode = async (sniesCode) => {
    await this.mattersService.getMatterBySniesCode(sniesCode)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.subjetBySniesCodeData =  data;
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

  @action
  getDescriptionsBySniesCode = async (sniesCode) => {
    await this.mattersService.getDescriptionsBySniesCode(sniesCode)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.descriptionsData =  data;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };


  @action
  addDescriptionBySubject = async (sniesCode, descripcionCambioDTO) => {
    //this.process.processDTO.loading = true;
    //this.process.processDTO.loadingMessage = 'AGREGANDO DESCRIPCIÓN ...';
    await this.mattersService.addDescriptionBySubject(sniesCode, descripcionCambioDTO)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.addDescriptionResponse = data;  
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.processDTO.loading = false;        
        this.process.showMessage(message, 'error');
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
