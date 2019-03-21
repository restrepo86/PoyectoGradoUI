import { observable, runInAction, action } from 'mobx';
import ProgramRequestDTO from '../dto/ProgramRequestDTO';
export default class Filter {

  @observable programsService;

  constructor(programsService) {
    this.programsService = programsService;
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
  saveProgramData = (programRequestDTO) => {

    this.programsService.saveProgram(programRequestDTO)
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
  resetForm = () => {
    this.filterDataDTO.initialize();
    this.expressFormData = null;
  }

  getData = () => this.filterDataDTO.getData();

}
