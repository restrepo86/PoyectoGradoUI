import { observable, runInAction, action } from 'mobx';

export default class Matters {

  @observable mattersService;
  @observable process;

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
          sessionStorage.setItem('mattersData', JSON.stringify(data));
        });
      })
      .catch(error => {
        const message = error.response ? error.response.headers.internalerrormessage
          : new Error(error).message;
      });
  };

}
