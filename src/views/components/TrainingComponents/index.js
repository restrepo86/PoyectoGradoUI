import React from "react";
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button, Modal, Form, Input, Icon, Divider, Tooltip } from "antd";
import TrainingComponentRequestDTO from '../../../dto/TrainingComponentRequestDTO';
import UpdatetrainingComponentDTO from '../../../dto/UpdateTrainingComponentDTO';
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

const UpdateCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form, trainingComponentData
      } = this.props;
      
      const { getFieldDecorator } = form;
      
      return (
        <Modal
          visible={visible}
          title="Actualizar Componente de Formación"
          okText="Actualizar"
          onCancel={onCancel}
          onOk={onCreate}
        >
        
          <Form layout="vertical">

            <Form.Item label="Nombre">
              {getFieldDecorator('nombre', {
                initialValue: trainingComponentData.nombre,
                rules: [{ required: true, message: 'por favor ingrese un nombre para el componente de formación!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Abreviatura">
              {getFieldDecorator('abreviatura', {
                initialValue: trainingComponentData.abreviatura,
                rules: [{ required: true, message: 'por favor ingrese una abreviatura para el componente de formación!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Color">
              {getFieldDecorator('color', {
                initialValue: trainingComponentData.color,
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
    visibleUpdateModal: false,
    trainingComponent: {}

  }

  componentDidMount() {

    if (!this.trainingComponentStore.trainingComponentsData || this.trainingComponentStore.updateSuccess) {
        this.trainingComponentStore.getTrainingComponents();
        this.trainingComponentStore.setUpdateSuccess(false);
    }
    
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

  updateFormRef = (updateForm) => {
    this.updateForm = updateForm;
  }

  updateHandleCancel = () => {
    this.setState({ visibleUpdateModal: false });
  }

  updateShowModal = (trainingComponent) => {
    this.setState({ visibleUpdateModal: true, trainingComponent: trainingComponent });
  }

  updateHandleCreate = () => {
    const form = this.updateForm.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
      console.log('training', this.state.trainingComponent.id)
      console.log('updateValues', values);
      const updatetrainingComponentDTO = new UpdatetrainingComponentDTO(values.nombre, values.abreviatura, values.color);
      this.trainingComponentStore.updateTrainigComponent(updatetrainingComponentDTO, this.state.trainingComponent.id);

      form.resetFields();
      this.setState({ visibleUpdateModal: false });
    });
  }

  render() {
      
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/main/programs/inps/studyplan' />
      }
      
        return(
          <div>

            <List
              grid={{gutter: 80, column: 3}}
              dataSource={this.trainingComponentStore.trainingComponentsData}
                renderItem={trainingComponent => (
                  <List.Item>
                        <Card 
                          title={trainingComponent.abreviatura}
                          extra={
                            <div>
                              <span style={{
                                backgroundColor:trainingComponent.color,
                                height: '25px',
                                width: '25px',
                                borderRadius: '10%',
                                display: 'inline-block'  
                              }}>
                              </span>
                              <Divider type="vertical" />
                              <a>
                              <Tooltip placement="top" title={"Editar Componente"}>
                                <Icon type="edit" onClick={() => this.updateShowModal(trainingComponent)}/>
                              </Tooltip>
                              </a>
                            
                            </div>
                          }
                          >
                            <p>{trainingComponent.nombre}</p>
                        </Card>
                        <UpdateCreateForm
                          wrappedComponentRef={this.updateFormRef}
                          visible={this.state.visibleUpdateModal}
                          onCancel={this.updateHandleCancel}
                          onCreate={this.updateHandleCreate}
                          trainingComponentData = {this.state.trainingComponent}
                        />
                  </List.Item>
                )}
            />
            <br />
              <center>
              <Tooltip placement="top" title={"Agregar Componente de formación"}>
                <Button 
                  type="primary"
                  shape="circle"
                  size="large"
                  style={{ backgroundColor: '#026F35', borderColor:'#026F35', color: '#fff' }}
                  onClick={this.showModal}
                >

                    <Icon type="plus"/>
                  
                </Button>
                </Tooltip>
               
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
