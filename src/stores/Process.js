import { observable, autorun } from 'mobx';
import { notification } from 'antd';
import ProcessDTO from '../dto/ProcessDTO';
export default class Process {
  @observable processDTO;

  constructor() {
    this.processDTO = new ProcessDTO();
  }

  showError = (message, type) => {
    this.processDTO.responseMessage = message;
    this.processDTO.showMessage = true;
    this.processDTO.requestState = type;                    
  };

  showNotification = autorun(() => { 
    if (this.processDTO && this.processDTO.showMessage) {
      const description =  this.processDTO.responseMessage.replace('<h1>','').replace('</h1>', '');
      notification[this.processDTO.requestState]({
        message: 'Notificación',
        description,
        duration: 5,
      });
    }
  });

  closeNotification = autorun(() => {
    if (this.processDTO && this.processDTO.showMessage) {
      setTimeout(() => {
        this.reset();
      }, 5000);
    }
  });

  reset = () => {
    this.processDTO.initialize();
  }

  getData = ()  => this.processDTO.getData(); 
}
