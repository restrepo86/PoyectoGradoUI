import React from "react";
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button, Modal, Form, Input } from "antd";
import TrainingComponentRequestDTO from '../../../dto/TrainingComponentRequestDTO';
import "./index.css";


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Agregue un nuevo Componente de Formación"
          okText="Agregar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Nombre">
              {getFieldDecorator('nombre', {
                rules: [{ required: true, message: 'por favor ingrese un nombre para el componente de formación!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Abreviatura">
              {getFieldDecorator('abreviatura', {
                rules: [{ required: true, message: 'por favor ingrese una abreviatura para el componente de formación!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Color">
              {getFieldDecorator('color', {
                rules: [{ required: true, message: 'por favor ingrese un color para el componente de formación!' }],
              })(
                <Input />
              )}
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  }
);

@observer
class TrainingComponents extends React.Component {

  constructor(props) {
    super(props);
    this.trainingComponentStore = this.props.stores.trainingComponentStore;
  }

  state = {

    redirect: false,
    visible: false,

  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleCancel = () => {
    this.setState({ visible: false });
  }

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
      const trainingComponentRequestDTO = new TrainingComponentRequestDTO(values.nombre, values.abreviatura.toUpperCase(), values.color);
      this.trainingComponentStore.saveTrainigComponent(trainingComponentRequestDTO);

      form.resetFields();
      this.setState({ visible: false });
    });
  }

  componentDidMount() {

    if (!this.trainingComponentStore.trainingComponentsData) {
        this.trainingComponentStore.getTrainingComponents();
    }
    
  }
  /**
    onClickTrainingComponentButton = (trainingComponent) => {
      console.log('componente de Formacion', trainingComponent)
    }
 */
  render() {
      
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/main/programs/inps/studyplan' />
      }
      
        return(
          <div>

            <List
              grid={{ gutter: 8, column: 4 }}
              dataSource={this.trainingComponentStore.trainingComponentsData}
                renderItem={trainingComponent => (
                  <List.Item>
                        <Card 
                          title={trainingComponent.abreviatura}
                          extra={<span style={{
                            backgroundColor:trainingComponent.color,
                            height: '25px',
                            width: '25px',
                            borderRadius: '50%',
                            display: 'inline-block'  
                          }} ></span>}
                          hoverable={true}
                          >
                            <p>{trainingComponent.nombre}</p>
                        </Card>
                  </List.Item>
                )}
            />
            <br />
              <center>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#026F35', color: '#fff' }}
                  onClick={this.showModal}
                >
                  Agregar Componente de Formación
                </Button>
                <Button 
                  type="primary" 
                  style={{ backgroundColor: '#026F35', color: '#fff' }}
                  onClick={this.updateStudyPlan}
                >
                  Actualizar Componente de Formación
                </Button>
                <CollectionCreateForm
                  wrappedComponentRef={this.saveFormRef}
                  visible={this.state.visible}
                  onCancel={this.handleCancel}
                  onCreate={this.handleCreate}
                />
              </center>
            
          </div>

        );
    }

}

export default TrainingComponents;

