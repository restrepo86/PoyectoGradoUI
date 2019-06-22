class LoginUserDTO {

    gTokenId;
    gAccessToken;

    constructor(gTokenId, gAccessToken) {
        this.gTokenId = gTokenId;
        this.gAccessToken = gAccessToken;
    }

}

export default LoginUserDTO;