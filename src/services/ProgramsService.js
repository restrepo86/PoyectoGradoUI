import ServiceBase from './ServiceBase';

class ProgramsService extends ServiceBase {
  
    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    }

    getPrograms = async () => {
       this.setHeaders();
       const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.GET_PROGRAMS}`;
       return await this.getRequest({}, requestUrl);
    };

    saveProgram = async (ProgramRequestDTO) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.GET_PROGRAMS}`;
      return await this.postRequest(requestUrl, ProgramRequestDTO)
    };

    updateProgram = async (programId, programUpdateRequestDTO) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.GET_PROGRAMS}/${programId}`;
      return await this.putRequest(requestUrl, programUpdateRequestDTO);
    };

    deleteProgram = async (programId) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.GET_PROGRAMS}/${programId}`;
      return await this.deleteRequest(requestUrl);
    };

}

export default ProgramsService;
