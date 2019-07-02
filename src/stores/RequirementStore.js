import { observable, runInAction, action } from 'mobx';

export default class RequirementStore {

  @observable requirementServices;
  @observable process;

  constructor(requirementServices, process) {
    this.requirementServices = requirementServices;
    this.process = process
  }

  @action
  addRequirement = (addRequirementDTO, subjectCode) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'GUARDANDO ...';
    this.requirementServices.addRequirement(addRequirementDTO, subjectCode)
      .then(response => {
        runInAction(() => {
          
            const { data } = response;
            this.process.showMessage('Requisito Agregado Correctamente', 'success');
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
  updateRequirement = (updateRequirementDTO, subjectCode, requirementId) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ACTUALIZANDO ...';
    this.requirementServices.updateRequirement(updateRequirementDTO, subjectCode, requirementId)
      .then(response => {
        runInAction(() => {
          
            const { data } = response;
            this.process.showMessage('Requisito Actualizado Correctamente', 'success');
            this.process.processDTO.loading = false;

        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });

  };

  @action
  deleteRequirement = (subjectCode, requirementId) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ELIMINANDO ...';
    this.requirementServices.deleteRequirement(subjectCode, requirementId)
      .then(response => {
        runInAction(() => {

            const { data } = response;
            this.process.showMessage('Requisito Eliminado Correctamente', 'success');
            this.process.processDTO.loading = false;

        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });

  };

}
