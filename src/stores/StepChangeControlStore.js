import { observable } from "mobx";

export default class StepChangeControlStore {

    @observable isDescription = false;
    @observable isUploadFile = false;
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
    
}