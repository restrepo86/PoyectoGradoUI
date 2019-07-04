import ServiceBase from "./ServiceBase";

class TrainingComponentService extends ServiceBase {

    constructor(url){
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    };

    getTrainigComponents = async () => {
        this.setHeaders();
        const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.COMPONENT}`;
        return await this.getRequest({}, requestUrl);
    };
 
    addTrainigComponent = async (trainingComponentRequestDTO) => {  
       this.setHeaders();
       const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.COMPONENT}`;
       return await this.postRequest(requestUrl, trainingComponentRequestDTO)
    };

    updateTrainingComponent = async (updatetrainingComponentDTO, id) => {
        this.setHeaders();
        const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.COMPONENT}/${id}`;
        return await this.putRequest(requestUrl, updatetrainingComponentDTO)
    };

}

export default TrainingComponentService;