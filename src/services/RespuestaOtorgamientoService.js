import ServiceBase from './ServiceBase';

class RespuestaOtorgamientoService extends ServiceBase {
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
    
    getRespuestaOtorgamiento = async (document) => {
       this.setHeaders();
       const responseUrl = `${this.url}/${this.urls.CONTROL_PACK_URL}/${this.urls.REST}/${this.urls.GET_RESPUESTA_OTORGAMIENTO}/${document}`;
       return await this.getRequest({}, responseUrl);
    };


}

export default RespuestaOtorgamientoService;