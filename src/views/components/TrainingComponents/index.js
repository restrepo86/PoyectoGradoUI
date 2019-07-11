import React from "react";
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button, Modal, Form, Input, Icon, Divider, Tooltip } from "antd";
import TrainingComponentRequestDTO from '../../../dto/TrainingComponentRequestDTO';
import UpdatetrainingComponentDTO from '../../../dto/UpdateTrainingComponentDTO';
import "./index.css";
import { ChromePicker } from 'react-color';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    state = {
      color: '#fff',
    };

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
                rules: [{ required: true, message: 'seleccione un color' }],
              })(
                <Input disabled='true' style={{display: 'none'}}/>
              )}
              <ChromePicker
                color = {this.state.color}
                onChange={ pickedColor => {
                  this.setState({ color: pickedColor.hex });
                  this.props.form.setFieldsValue({
                    color: pickedColor.hex
                  })
                } }
              />
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  }
);

const UpdateCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    constructor(props) {
      super(props);
      console.log('Initial Constructor', props.trainingComponentData.color);
      this.state = {
          isPicked: false
      };
      console.log('isPicket', this.state.isPicked);
  }

  cleanIsPicked = () => {this.setState({isPicked: false})}

  componentWillReceiveProps(newProps) {
    console.log('componentWillReceiveProps', newProps.trainingComponentData.color);
    console.log('isPicked????', this.state.isPicked);

    if (!this.state.isPicked){
      this.setState({color: newProps.trainingComponentData.color});
    }
  }

    render() {
      const {
        visible, onCancel, onCreate, form, trainingComponentData, destroyOnClose
      } = this.props;
      
      const { getFieldDecorator } = form;


      return (
        <Modal
          visible={visible}
          destroyOnClose={destroyOnClose}
          centered={true}
          title="Actualizar Componente de Formación"
          okText="Actualizar"
          onCancel={ (e) => {
            this.cleanIsPicked(); 
            onCancel();
          }
        }
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
                rules: [{ required: true, message: 'seleccione un color' }],
              })(
                <Input disabled={true} style={{display:'none'}}/>
              )}
              <ChromePicker
                color = { this.state.color }
                onChange={ pickedColor => {
                  this.setState({isPicked: true})
                  this.setState({ color: pickedColor.hex});
                  this.props.form.setFieldsValue({
                    color: pickedColor.hex
                  })
                } }
              />
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
    this.setState({ visibleUpdateModal: false, trainingComponent: {}});
  }

  updateShowModal = (trainingComponent) => {
    this.setState({ 
      visibleUpdateModal: true, 
      trainingComponent: trainingComponent
    });
  }

  updateHandleCreate = () => {
    const form = this.updateForm.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
 
      const updatetrainingComponentDTO = new UpdatetrainingComponentDTO(values.nombre, values.abreviatura, values.color);
      this.trainingComponentStore.updateTrainigComponent(updatetrainingComponentDTO, this.state.trainingComponent.id);

      form.resetFields();
      this.updateHandleCancel();
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
              grid={{gutter: 16, column: 3}}
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
                          destroyOnClose={'true'}
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
