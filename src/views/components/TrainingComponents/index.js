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

  showModal = () => {
    this.setState({ visible: true });
  }

  handleCancel = () => {
    this.setState({ visible: false });
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

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  componentDidMount() {

    if (!this.trainingComponentStore.trainingComponentsData) {
        this.trainingComponentStore.getTrainingComponents();
    }
    
  }

  onClickTrainingComponentButton = (trainingComponent) => {

    console.log('componente de Formacion', trainingComponent)
    //this.setState({ redirect: true }); 
    
  }

  render() {
      
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/main/programs/inps/studyplan' />
      }
      
        return(

          <div>

            <List
              grid={{ gutter: 10, column: 3 }}
              dataSource={this.trainingComponentStore.trainingComponentsData}
                renderItem={trainingComponent => (
                  <List.Item>
                    <Button 
                        style={{ 
                            backgroundColor: '#026F35', 
                            color: '#fff',
                            height: 'auto',  
                        }}
                        onClick={() => this.onClickTrainingComponentButton(trainingComponent)}
                    >
                        <Card 
                          title={trainingComponent.nombre}
                          bodyStyle={{ background: trainingComponent.color }}>
                            {`Abreviatura: ${trainingComponent.abreviatura}`}<br />
                            {`Color en hexadecimal: ${(trainingComponent.color)}`}<br />
                        </Card>
                    </Button>
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

