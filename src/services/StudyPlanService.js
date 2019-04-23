import ServiceBase from './ServiceBase';

class StudyPlanService extends ServiceBase {

    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
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

    getStudyPlan = async (sniesCode) => {
       this.setHeaders();
       const responseUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${sniesCode}/${this.urls.STUDY_PLAN}`;
       return await this.getRequest({}, responseUrl);
    };

    saveStudyPlan = async (studyPlanRequestDTO, programId) => {  
      console.log('saveStudyPlan', studyPlanRequestDTO)
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}`;
      return await this.postRequest(requestUrl, studyPlanRequestDTO)
    }

}

export default StudyPlanService;
