import React from "react";
import { Redirect, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button, Modal, Form, Input } from "antd";
import StudyPlanRequestDTO from '../../../dto/StudyPlanRequestDTO';
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
          title="Agregue un nuevo Plan de Estudio"
          okText="Agregar"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Ingrese el INP">
              {getFieldDecorator('inp', {
                rules: [{ required: true, message: 'por favor ingrese un INP para el plan de estudio!' }],
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
class InpsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.programsComponentStore = this.props.stores.programsComponentStore;
<<<<<<< Updated upstream
    this.programId = this.programsComponentStore.programClickData ? this.programsComponentStore.programClickData.programData.id : null;
=======
    this.sniesCode = this.programsComponentStore.programClickData.programData.id;
>>>>>>> Stashed changes
    this.studyPlan = this.props.stores.studyPlan;
    this.inpComponentStore = this.props.stores.inpComponentStore
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
      const studyPlanRequestDTO = new StudyPlanRequestDTO(values.inp);
      this.studyPlan.saveStudyPlanData(studyPlanRequestDTO, this.programId);

      form.resetFields();
      this.setState({ visible: false });
    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }


  componentDidMount() {

    if (sessionStorage.getItem( 'Authorization' ) == null || this.programId == null) {
      window.location.href = '/';
    }; 
    this.programsComponentStore.setProgramClickSuccess(false);
    this.studyPlan.getStudyPlanData(this.programId);
    this.studyPlan.setStudyPlanDeleted(false);
  }

  onClickInpButton = (item) => {

    this.inpComponentStore.setInpData(item);
    this.setState({ redirect: true }); 
    
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
              dataSource={this.studyPlan.studyPlanData}
                renderItem={item => (
                  <List.Item>
                    <Button 
                        style={{ 
                            backgroundColor: '#026F35', 
                            color: '#fff',
                            height: 'auto'    
                        }}
                        onClick={() => this.onClickInpButton(item)}
                    >
                        <Card title={item.inp}>
                          {`Creditos: ${item.creditos}`}<br />
                          {`Fecha de Registro: ${(item.fechaDeRegistro).substring(0, 10)}`}<br />
                          {`Fecha de Modificación: ${(item.fechaDeModificacion).substring(0, 10)}`}<br />
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
                  Agregar Plan de Estudio
                </Button>
              
                <Link to = '/main/programs/inps/delete'>
                  <Button 
                    type="primary" 
                    style={{ backgroundColor: '#026F35', color: '#fff' }}
                  >
                    Borrar Plan de Estudio
                  </Button>
                </Link>
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

export default InpsComponent;

