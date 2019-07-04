import { observable, runInAction, action } from 'mobx';

export default class StudyPlan {

  @observable studyPlanService;
  @observable process;
  @observable studyPlanData = [];
  @observable studyPlanDeleted = false;
  @observable reportSubjectsByInpData;

  constructor(studyPlanService, process) {
    this.studyPlanService = studyPlanService;
    this.process = process
  }

  @action
  getStudyPlanData = (sniesCode) => {

    this.studyPlanService.getStudyPlan(sniesCode)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.studyPlanData = data;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  @action
  saveStudyPlanData = (studyPlanRequestDTO, programId) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'GUARDANDO ...';
    this.studyPlanService.saveStudyPlan(studyPlanRequestDTO, programId)
      .then(response => {
        runInAction(() => {
          const { dataSave } = response;
          this.process.showMessage('Plan de Estudio Guardado Correctamente', 'success');
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
  deleteStudyPlanData = (programId, inp) => {

    this.process.processDTO.loading = true;
    this.process.processDTO.loadingMessage = 'ELIMINANDO ...';
    this.studyPlanService.deleteStudyPlan(programId, inp)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.studyPlanDeleted = true;
          this.process.showMessage('Plan de Estudio Eliminado Correctamente', 'success');
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
  getReportSubjectsByInp = (programId, inp) => {

    this.studyPlanService.getReportSubjectsByInp(programId, inp)
      .then(response => {
        runInAction(() => {
          const { data } = response;
          this.reportSubjectsByInpData = data;
        });
      })
      .catch(error => {
        const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
        this.process.showMessage(message, 'error');
      });
  };

  
  setStudyPlanDeleted = (studyPlanDeleted) => {
    this.studyPlanDeleted = studyPlanDeleted;
  };
  
}
