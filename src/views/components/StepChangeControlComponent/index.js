import React from 'react';
import DriveViewer from '../DrivePicker/DriveViewer';
import { Steps, Button, Input, Modal, Form, message } from 'antd';
import DescripcionCambioDTO from '../../../dto/DescripcionCambioDTO'
import "./index.css";

const { TextArea } = Input;
const { Step } = Steps;


class StepLineChangeControlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      descriptionValue: '',
      statusStep: 'wait'
    };
  };

  next = async (matterStore, subjectData) => {
    if (this.state.descriptionValue !== '' && this.state.current + 1 === 1) {
      const descripcionCambioDTO = new DescripcionCambioDTO(this.state.descriptionValue);
      await matterStore.addDescriptionBySubject(subjectData.codigo, descripcionCambioDTO)
      if (matterStore.addDescriptionResponse) {
        const current = this.state.current + 1;
        this.setState({ current });
      } else {
        message.success('No se pudo conectar el servicio para subir archivo!');
      }
    
    } else {
      message.success('Debe ingresar una descripción del cambio!');
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
      visible, onCancel, onCreate, process, matterStore, subjectData
    } = this.props;

    const steps = 
    [
      {
        title: 'Agregar descripción',
        content: 
          <div>
            Descripción del cambio
            <TextArea onChange={this.handleChangeDescription} rows={4} />,
          </div>
      },
      {
        title: 'Cargar Archivo',
        content: <DriveViewer { ...subjectData } />,
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
        onCancel={onCancel}
        onOk={onCreate}
      >
        
        <div>
          <Steps current={current} status='wait'>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next(matterStore, subjectData)}>
                Siguiente
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => process.showMessage('Proceso terminado correctamente', 'success')}>
                Terminar Proceso
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