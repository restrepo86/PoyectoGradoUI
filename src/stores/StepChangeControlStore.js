import { observable } from "mobx";

export default class StepChangeControlStore {

    @observable isDescription = false;
    @observable isUploadFile = false;
    @observable description =  '';
    @observable process;

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
    
}