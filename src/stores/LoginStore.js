import { observable } from "mobx";

export default class LoginStore {

        @observable loginService;
        @observable addUserResponseData;
        @observable validateLoginUserResponse;
        @observable addNewUserSuccess = false;
        @observable isAuthenticated = false;
        @observable loginOutDisabled = false;

        constructor(loginService, process) {
            this.loginService = loginService;
            this.process = process;
        }

        validateLoginUser = async (loginUserDTO) => {
          
            this.process.processDTO.loading = true;
            this.process.processDTO.loadingMessage = 'VALIDANDO USUARIO ...';
            await this.loginService.loginUser(loginUserDTO)
            .then(response => {

                const { data } = response;
                this.validateLoginUserResponse = { "data": data , "accesstoken": response.headers.accesstoken };
                this.validateUserSuccess = true;
                this.process.processDTO.loading = false;
                
            })
            .catch(error => {
                const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
                this.process.showMessage(message, 'error');
                this.process.processDTO.loading = false;
            });

        };

        setIsAuthenticated = (isAuthenticated) => {
            this.isAuthenticated = isAuthenticated;
        };

        setLoginOutDisabled = (loginOutDisabled) => {
            this.loginOutDisabled = loginOutDisabled;
        };

}