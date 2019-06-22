import { observable, action, runInAction } from "mobx";

export default class LoginStore {

        @observable loginService;
        @observable addUserResponseData;
        @observable validateLoginUserResponse= {};
        @observable addNewUserSuccess = false;
        @observable isAuthenticated = false;

        constructor(loginService, process) {
            this.loginService = loginService;
            this.process = process;
        }

        @action
        addNewUser = (addUserRequestDTO) => {

            this.process.processDTO.loading = true;
            this.process.processDTO.loadingMessage = 'REGISTRANDO USUARIO ...';
            this.loginService.addNewUser(addUserRequestDTO)
            .then(response => {
                runInAction(() => {
                
                const { data } = response;
                this.addUserResponseData = data;

                this.process.showMessage('Programa Guardado Correctamente', 'success');
                this.process.processDTO.loading = false;
                this.addNewUserSuccess = true;
                
                });
            })
            .catch(error => {
                const message = error.response ? `${error.response.data.codigo}: ${error.response.data.mensaje}` : 'ERROR';
                this.process.showMessage(message, 'error');
                this.process.processDTO.loading = false;
            });

        };

        @action
        validateLoginUser = (loginUserDTO) => {
          
            this.process.processDTO.loading = true;
            this.process.processDTO.loadingMessage = 'VALIDANDO USUARIO ...';
            this.loginService.loginUser(loginUserDTO)
            .then(response => {
                runInAction(() => {
                console.log(response)
                const { data } = response;
                this.validateLoginUserResponse = { "data": data , "accesstoken": response.headers.accesstoken };

                this.validateUserSuccess = true;
                this.process.processDTO.loading = false;
                
                });
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

}