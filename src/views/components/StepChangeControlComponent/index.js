import React from 'react';
import DriveUpload from '../DrivePicker/DriveUpload';
import { observer } from 'mobx-react';
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

  finish = async(process, matterStore, subjectData) => {

    if (this.stepChangeControlStore.isUploadFile && this.stepChangeControlStore.isDescription) {
      
      const descripcionCambioDTO = new DescripcionCambioDTO(this.stepChangeControlStore.description);
      await matterStore.addDescriptionBySubject(subjectData.codigo, descripcionCambioDTO)
      if (matterStore.addDescriptionResponse) {
        this.stepChangeControlStore.setIsUploadFile(false);
        process.showMessage('Proceso terminado correctamente', 'success');  
      } else {
        process.showMessage('No se pudo conectar el servicio para subir archivo!', 'error');
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
      visible, onCancel, process, matterStore, subjectData
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
        content: <DriveUpload { ...subjectData } { ...this.stepChangeControlStore } />,
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
              <Button type="primary" disabled={!(this.stepChangeControlStore.isUploadFile && this.stepChangeControlStore.isDescription)} onClick={() => this.finish(process, matterStore, subjectData)}>
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