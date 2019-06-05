import { observable, runInAction, action } from 'mobx';


export default class TrainingComponentStore {

    @observable trainingComponentService;
    @observable process;
    @observable trainingComponentsData;
    @observable saveSuccess = false;

    constructor(trainingComponentService, process) {
        this.trainingComponentService = trainingComponentService;
        this.process = process;
    };

    @action
    getTrainingComponents = () => {
      this.trainingComponentService.getTrainigComponents()
        .then(response => {
          runInAction(() => {
            const { data } = response;
            this.trainingComponentsData = data;
          });
        })
        .catch(error => {
          const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
          this.process.showMessage(message, 'error');
        });
    };
  
    @action
    saveTrainigComponent = (trainingComponentRequestDTO) => {
  
      this.process.processDTO.loading = true;
      this.process.processDTO.loadingMessage = 'GUARDANDO ...';
      this.trainingComponentService.addTrainigComponent(trainingComponentRequestDTO)
        .then(response => {
          runInAction(() => {
            
            const { data } = response;
            //const item = { 'title': data.nombre, 'programData': data };
            this.trainingComponentsData.push(data);
            this.process.showMessage('Commponente de Formación Guardado Correctamente', 'success');
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

    setSaveSuccess = (saveSuccess) => {
        this.saveSuccess = saveSuccess;
    };

}
