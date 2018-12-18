import ServiceBase from './ServiceBase';

class ProgramsService extends ServiceBase {
    constructor(url) {
        super();
        this.url = url;
        this.headers = '';
        this.setHeaders();
    }

    setHeaders = () => {
      this.headers = {
        "gsec-user-token" : localStorage.getItem("gco_auth_token")
      };
    };

    getPrograms = async () => {
       this.setHeaders();
       const responseUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.REST}/${this.urls.GET_PROGRAMS}`;
       return await this.getRequest({}, responseUrl);
    };


}

export default ProgramsService;
