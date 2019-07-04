import ServiceBase from './ServiceBase';

class StudyPlanService extends ServiceBase {

    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    };

    getStudyPlan = async (sniesCode) => {
       this.setHeaders();
       const responseUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${sniesCode}/${this.urls.STUDY_PLAN}`;
       return await this.getRequest({}, responseUrl);
    };

    saveStudyPlan = async (studyPlanRequestDTO, programId) => {  
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}`;
      return await this.postRequest(requestUrl, studyPlanRequestDTO)
    };

    deleteStudyPlan = async (programId, inp) => {
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}/${inp}`;
      return await this.deleteRequest(requestUrl);
    };

    getReportSubjectsByInp = async (programId, inp) => {  
      this.setHeaders();
      const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.PROGRAM}/${programId}/${this.urls.STUDY_PLAN}/${inp}/${this.urls.REPORT}`;
      return await this.getRequest({}, requestUrl)
    };

}

export default StudyPlanService;
