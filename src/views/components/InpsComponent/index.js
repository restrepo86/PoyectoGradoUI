import React from "react";
import { Redirect, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { List, Card, Button, Modal, Form, Input, Tooltip, Icon } from "antd";
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
    this.programId = this.programsComponentStore.programClickData ? this.programsComponentStore.programClickData.programData.id : null;
    this.studyPlan = this.props.stores.studyPlan;
    this.inpComponentStore = this.props.stores.inpComponentStore
  };

  state = {

    redirect: false,
    visible: false,

  };

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

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
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };


  componentDidMount() {

    if (sessionStorage.getItem( 'Authorization' ) == null || this.programId == null) {
      window.location.href = '/';
    }; 
    this.programsComponentStore.setProgramClickSuccess(false);
    this.studyPlan.getStudyPlanData(this.programId);
    this.studyPlan.setStudyPlanDeleted(false);
  };

  onClickInpButton = (item) => {

    this.inpComponentStore.setInpData(item);
    this.setState({ redirect: true }); 
    
  };

  onClickDownloadReport = async (e, inpSelected) => {
    
    e.stopPropagation();
    this.studyPlan.getReportSubjectsByInp(inpSelected.programId, inpSelected.inp);
    
  };

  render() {
      
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to='/main/programs/inps/studyplan' />
      }
      
        return(

          <div>

            <List
              grid={{ gutter: 10, column: 3 }}
              dataSource={this.studyPlan.studyPlanData.sort((a, b) => b.inp - a.inp)}
                renderItem={item => (
                  <List.Item>

                    <Card
                      style={{textAlignVertical: "center",textAlign: "center",}}
                      title={item.inp}
                      size={"small"}
                      extra={
                        <div onClick = {(e) => {e.stopPropagation();}}>
                          <Link to = '/main/programs/inps/delete'>
                            <Tooltip placement="top" title={"Borrar INP"}>
                              <Icon type="delete" />
                            </Tooltip>
                          </Link>
                        </div>
                      }
                      actions={[
                        <Tooltip placement="top" title={"Descargar Reporte"}>
                          <Icon type="download" onClick = {(e) => {this.onClickDownloadReport(e, item)}}/>
                        </Tooltip>
                      ]}
                      onClick={() => this.onClickInpButton(item)}
                      hoverable = "true"
                    > 
                      <p style={{textAlignVertical: "center",textAlign: "center",}}>
                        Creditos: {item.creditos} <br/>
                        Creado {(item.fechaDeRegistro).substring(0, 10)} <br/>
                        Modificado {(item.fechaDeModificacion).substring(0, 10)}
                      </p>
                    </Card>
                  </List.Item>
                )}
            />
            <br />
              <center>
                <Button 
                  type="primary"
                  onClick={this.showModal}
                >
                  Agregar Plan de Estudio
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

export default InpsComponent;

