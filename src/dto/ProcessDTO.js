import Dto from './Dto';
import { observable } from 'mobx';
class ProcessDTO extends Dto {

  @observable loading;
  @observable showMessage;
  @observable requestState;
  @observable responseMessage;

  constructor () {
    super();
    this.initialize();
  }

  initialize = () => {
    this.loading = false;
    this.loadingMessage = null;
    this.showMessage = false;
    this.requestState = null;
    this.responseMessage = null;
    this.instantsNumber = 0;
  }

  getData = () => {
    const { showMessage, requestState, responseMessage, loading, loadingMessage, instantsNumber } = this;
    return {
      showMessage,
      requestState,
      responseMessage,
      loading,
      loadingMessage,
      instantsNumber,
    }
  }
    
}

export default ProcessDTO;
