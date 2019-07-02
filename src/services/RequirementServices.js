import ServiceBase from "./ServiceBase";

class RequirementServices extends ServiceBase {

    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    }

    addRequirement = async (addRequirementDTO, subjectCode) => {
      this.setHeaders();
      const requestUrl = 
               `${this.url}/
                ${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/
                ${this.urls.GET_PROGRAMS}/
                ${this.urls.STUDY_PLAN}/
                ${this.urls.MATTER}/
                ${subjectCode}/
                ${this.urls.REQUIREMENT}`;
      return await this.postRequest(requestUrl, addRequirementDTO)
    };

    updateRequirement = async (updateRequirementDTO, subjectCode, requirementId) => {
      this.setHeaders();
      const requestUrl = 
               `${this.url}/
                ${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/
                ${this.urls.GET_PROGRAMS}/
                ${this.urls.STUDY_PLAN}/
                ${this.urls.MATTER}/
                ${subjectCode}/
                ${this.urls.REQUIREMENT}
                ${requirementId}`;
      return await this.putRequest(requestUrl, updateRequirementDTO);
    };

    deleteRequirement = async (subjectCode, requirementId) => {
      this.setHeaders();
      const requestUrl = 
               `${this.url}/
                ${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/
                ${this.urls.GET_PROGRAMS}/
                ${this.urls.STUDY_PLAN}/
                ${this.urls.MATTER}/
                ${subjectCode}/
                ${this.urls.REQUIREMENT}
                ${requirementId}`;
      return await this.deleteRequest(requestUrl);
    };

}

export default RequirementServices;