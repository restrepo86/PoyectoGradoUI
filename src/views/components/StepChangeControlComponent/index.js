import React from 'react';
import DriveViewer from '../DrivePicker/DriveViewer';
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
    this.state = {
      current: 0,
      descriptionValue: '',
      statusStep: 'wait'
    };
  };

  next = async (stepChangeControlStore) => {
    
    if (this.state.descriptionValue !== '') {
      stepChangeControlStore.setDescription(this.state.descriptionValue);
      stepChangeControlStore.setIsDescription(true);
      const current = this.state.current + 1;
      this.setState({ current });
    } else {
      message.warning('Debe ingresar una descripción del cambio!');
    }
   
  };

  finish = async(process, stepChangeControlStore, matterStore, subjectData) => {
    console.log(stepChangeControlStore.isUploadFile);
    if (stepChangeControlStore.isUploadFile && stepChangeControlStore.isDescription) {
      
      const descripcionCambioDTO = new DescripcionCambioDTO(this.state.descriptionValue);
      await matterStore.addDescriptionBySubject(subjectData.codigo, descripcionCambioDTO)
      if (matterStore.addDescriptionResponse) {
        stepChangeControlStore.setIsUploadFile(false);
        process.showMessage('Proceso terminado correctamente', 'success');  
      } else {
        process.showMessage('No se pudo conectar el servicio para subir archivo!', 'error');
      }
    } else {
      message.warning('Debe cargar un archivo para finalizar!');
    }
    
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  handleChangeDescription = (e) => {
    this.setState({ descriptionValue: e.target.value })
  };
  
  render() {

    const {
      visible, onCancel, onCreate, process, matterStore, subjectData, stepChangeControlStore
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
        content: <DriveViewer { ...subjectData } { ...stepChangeControlStore } />,
      }
    ];


    const { current } = this.state;

   
    return (
    
      <Modal
        style={{ width: 1000 }}
        bodyStyle={{ width: 1000 }}
        width={1000}
        visible={visible}
        title="Carga de Planeadores de Asignaturas"
        okText="Aceptar"
        destroyOnClose={true}
        onCancel={onCancel}
        onOk={onCreate}
      >
        
        <div>
          <Steps current={current} status='wait'>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content" style={{paddingTop: '0px'}}>{steps[this.state.current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next(stepChangeControlStore)}>
                Siguiente
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => this.finish(process, stepChangeControlStore, matterStore, subjectData)}>
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