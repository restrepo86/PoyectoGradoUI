import React from 'react';
import DriveUpload from '../DrivePicker/DriveUpload';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import { Steps, Button, Input, Modal, Form, message } from 'antd';
import DescripcionCambioDTO from '../../../dto/DescripcionCambioDTO'
import "./index.css";

const { TextArea } = Input;
const { Step } = Steps;

@observer
class StepLineChangeControlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.stepChangeControlStore = this.props.stepChangeControlStore;
    this.process = this.props.process;
    this.matterStore = this.props.matterStore;
    this.subjectData = this.props.subjectData;
  }

  state = {
    statusStep: 'wait'
  };



  next = async () => {
    
    if (this.stepChangeControlStore.description !== '') {
      this.stepChangeControlStore.setIsDescription(true);
      this.stepChangeControlStore.setCurrent(this.stepChangeControlStore.current + 1);
    } else {
      message.warning('Debe ingresar una descripción del cambio!');
    }
   
  };

  download = autorun(() => {
    if (this.stepChangeControlStore.isUploadFile) {
      this.stepChangeControlStore.setIsUploadFile(false);
      this.stepChangeControlStore.setCurrent(0);
      this.stepChangeControlStore.setDescription('');
      this.stepChangeControlStore.setIsUploadFile(false);
      this.stepChangeControlStore.setIsDescription(false);
      this.finish()
    }
    this.fileBytes = null;
  });

  finish = async() => {

    if (this.stepChangeControlStore.isUploadFile && this.stepChangeControlStore.isDescription) {
      
      const descripcionCambioDTO = new DescripcionCambioDTO(this.stepChangeControlStore.description);
      await this.matterStore.addDescriptionBySubject(this.subjectData.codigo, descripcionCambioDTO)
      this.stepChangeControlStore.setIsUploadFile(false);
      this.stepChangeControlStore.setCurrent(0);
      this.stepChangeControlStore.setDescription('');
      this.stepChangeControlStore.setIsUploadFile(false);
      this.stepChangeControlStore.setIsDescription(false);
      if (this.matterStore.addDescriptionResponse) {
        this.process.showMessage('Proceso terminado correctamente', 'success');  
      } else {
        this.process.showMessage('No se pudo conectar el servicio para subir archivo!', 'error');
      }
    } else {
      message.warning('Debe cargar un archivo para finalizar!');
    }
    
  };

  handleChangeDescription = (e) => {
    this.stepChangeControlStore.setDescription(e.target.value);
  };
  
  render() {

    const {
      visible, onCancel
    } = this.props;

    const steps = 
    [
      {
        title: 'Agregar descripción',
        content: 
          <div>
            Descripción del cambio
            <TextArea onChange={this.handleChangeDescription} rows={8} />
          </div>
      },
      {
        title: 'Cargar Archivo',
        content: <DriveUpload  
                    {...this.subjectData} 
                    stepChangeControlStore={this.stepChangeControlStore }
                    matterStore={this.matterStore}
                    process={this.process}
                  />,
      }
    ];

    return (

    
    
      <Modal
        style={{ width: 1000 }}
        bodyStyle={{ width: 1000 }}
        width={1000}
        visible={visible}
        title="Subir Plan de Estudio"
      
        onCancel={onCancel}
        footer={[
          <Button type="primary" onClick={onCancel}>Cancelar</Button>
        ]}
      >
        
        <div>
          <Steps current={this.stepChangeControlStore.current} status='wait'>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content" style={{paddingTop: '0px'}}>{steps[this.stepChangeControlStore.current].content}</div>
          <div className="steps-action">
            {this.stepChangeControlStore.current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Siguiente
              </Button>
            )}
            {this.stepChangeControlStore.current === steps.length - 1 && (
              <Button type="primary" disabled={!(this.stepChangeControlStore.isUploadFile && this.stepChangeControlStore.isDescription)} onClick={() => this.finish()}>
                Finalizar
              </Button>
            )}
          </div>
        </div>

      </Modal>

    );

  }
}

const StepLineChangeControlModal = Form.create({ name: 'form_in_modal' })(StepLineChangeControlComponent);

export default StepLineChangeControlModal;