import ServiceBase from './ServiceBase';

class MattersService extends ServiceBase {

    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    }

    getMatters = async (programId, inp) => {
      this.setHeaders();
      const responseUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}/${inp}/${this.urls.MATTER}`;
      return await this.getRequest({}, responseUrl);
    };

    saveMatter = async (programId, inp, asignaturaRequest) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}/${inp}/${this.urls.MATTER}`;
      return await this.postRequest(requestUrl, asignaturaRequest);
    };

    updateMatter = async (programId, inp, updateMatterRequestDTO, subjectId) => {
      this.setHeaders();
      const { PROGRAM_MANAGEMENT_PACK_URL, PROGRAM, PLAN_ESTUDIO, MATTER } = this.urls;
      const requestUrl = `${this.url}/${PROGRAM_MANAGEMENT_PACK_URL}/${PROGRAM}/${programId}/${PLAN_ESTUDIO}/${inp}/${MATTER}/${subjectId}`;
      console.log(requestUrl, programId, inp, updateMatterRequestDTO)
      return await this.putRequest(requestUrl, updateMatterRequestDTO);
    };

    deleteMatter = async (programId, inp, matterId) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}/${inp}/${this.urls.MATTER}/${matterId}`;
      return await this.deleteRequest(requestUrl);
    };
  

}

export default MattersService;
