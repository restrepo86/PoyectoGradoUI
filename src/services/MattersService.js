import ServiceBase from './ServiceBase';

class MattersService extends ServiceBase {

    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
        console.log(this);
    }

    setHeaders = () => {
      this.headers = {
        'Accept': '*/*',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Content-Type':  'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'accept, content-type',
        'Access-Control-Max-Age': '1728000'
      };
    };

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

    updateMatter = async (programId, inp, updateMatterRequestDTO) => {
      this.setHeaders();
      const { PROGRAM_MANAGEMENT_PACK_URL, PROGRAM, CODIGO, MATTER } = this.urls;
      const requestUrl = `${this.url}/${PROGRAM_MANAGEMENT_PACK_URL}/${PROGRAM}/${programId}/${CODIGO}/${inp}/${MATTER}`;
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
