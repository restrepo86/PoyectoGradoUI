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

}

export default TrainingComponentService;