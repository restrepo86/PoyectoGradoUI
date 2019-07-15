import React from 'react';
import { Steps, Button, message, Input } from 'antd';
import "./index.css";

const { TextArea } = Input;
const { Step } = Steps;

const steps = [
  {
    title: 'Agregar descripción',
    content: <TextArea rows={4} />,
  },
  {
    title: 'Cargar Archivo',
    content: 'Second-content',
  },
  { 
    title: 'Subiendo Archivo',
    content: ''
  },
  {
    title: 'Control de Cambios Exitoso',
    content: 'Last-content',
  },
];


class StepLineChangeControlComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  };

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  };

  
  render() {

    const { current } = this.state;

    const {
      visible, onCancel, onCreate,
    } = this.props;
    
    return (
    
      <Modal
        visible={visible}
        title="Carga de Planeadores de Asignaturas"
        okText="Agregar"
        onCancel={onCancel}
        onOk={onCreate}
      >
        
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Siguiente
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type="primary" onClick={() => message.success('Archivo Cargado Correctamente')}>
                Terminar Proceso
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Anterior
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