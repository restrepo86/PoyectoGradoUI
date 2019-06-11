import ServiceBase from "./ServiceBase";

class LoginService extends ServiceBase {
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

    addNewUser = async (addUserRequestDTO) => {
        this.setHeaders();
        const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.USER}`;
        return await this.postRequest(requestUrl, addUserRequestDTO)
    };

    loginUser = async (loginUserDTO) => {
        this.setHeaders();
        const requestUrl = `${this.url}/${this.urls.PROGRAM_MANAGEMENT_PACK_URL}/${this.urls.USER}/${this.urls.LOGIN}`;
        return await this.postRequest(requestUrl, loginUserDTO)
    };

}

export default LoginService;