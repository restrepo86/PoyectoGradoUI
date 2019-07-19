import { observable } from "mobx";

export default class StepChangeControlStore {

    @observable isDescription = false;
    @observable isUploadFile = false;
    @observable description =  '';
    @observable process;
    @observable current = 0;
    @observable reloadState = false;

    constructor(process) {
        this.process = process;
    }

    setIsDescription = (isDescription) => {
        this.isDescription = isDescription;
    };

    setIsUploadFile = (isUploadFile) => {
        this.isUploadFile = isUploadFile;
    };

    setDescription = (description) => {
        this.description = description;
    };

    setCurrent = (current) => {
        this.current = current;
    };

    setReloadState = (reloadState) => {
        this.reloadState = reloadState;
    };
    
}