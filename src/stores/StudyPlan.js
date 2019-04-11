import { observable, runInAction, action } from 'mobx';

export default class StudyPlan {

  @observable studyPlanService;
  @observable process;
  @observable studyPlanData;

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
          sessionStorage.setItem('studyPlanData', JSON.stringify(data));
        });
      })
      .catch(error => {
        const message = error.response ? error.response.headers.internalerrormessage
          : new Error(error).message;
      });
  };

}
