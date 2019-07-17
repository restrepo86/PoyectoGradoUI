import React from 'react';
import { observer } from 'mobx-react';
import { 
  Table, 
  pagination, 
  Form, 
  Input, 
  Modal, 
  Button, 
  Select, 
  Popover, 
  InputNumber, 
  DatePicker, 
  Popconfirm,
  Tooltip, 
  Radio, 
  Row,
  Col,
  Icon
  } from 'antd';
import CardMatter from '../CardMatter';
import AsignaturaRequestDTO from '../../../dto/AsignaturaRequestDTO';
import UpdateMatterRequestDTO from '../../../dto/UpdateMatterRequestDTO';
import AddRequirementDTO from '../../../dto/AddRequirementDTO';
import UpdateRequirementDTO from '../../../dto/UpdateRequirementDTO';
import StepLineChangeControlComponent from '../StepChangeControlComponent';
import TimelineChangesFolder from '../TimelineChangesFolder';
import moment from 'moment';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        nivelData: 0
      }
    };
    
    handleNivel = (value) => {
      this.setState({ nivelData: value })
    };

    render() {

      const {
        visible, onCancel, onCreate, form, trainingComponentsData
      } = this.props;

      const { getFieldDecorator } = form;
      const Option = Select.Option;
      const requisitosDeNivel = ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5', 'Nivel 6', 'Nivel 7', 'Nivel 8', 'Nivel 9'];
      return (
        <Modal
          visible={visible}
          title="Agregue una nueva asignatura"
          okText="Agregar"
          onCancel={onCancel}
          onOk={onCreate}
          destroyOnClose={'true'}
        >
          <Form layout="vertical">

            <Form.Item label="Código">
              {getFieldDecorator('codigoAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nombre">
              {getFieldDecorator('nombreAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Nivel" layout='inline'>
              {getFieldDecorator('nivelAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <InputNumber onChange={this.handleNivel} min={1} max={10} />
              )}
            </Form.Item>

            <Form.Item label="Créditos" layout='inline'>
              {getFieldDecorator('creditosAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
              })(
                <InputNumber min={1} max={10} />
              )}
            </Form.Item>

            <Form.Item label="Requisito de nivel">
              {getFieldDecorator('requisitoNivel', {
                rules: [{ required: true, message: 'Por favor seleccione un requisito de nivel!' }],
                initialValue: "No"
              })(
                <Select style={{ width: 120 }}>
                  <Option key={0} value={"No"}>No</Option>
                  { 
                    requisitosDeNivel.filter(requisito => requisito.substring(6, 7) < this.state.nivelData).map((requisito, index) =>
                    <Option key={index+1} value={requisito}>{requisito}</Option>
                  )}
                </Select>
              
              )}
            </Form.Item>

            <Row>
              <h3>Horas</h3>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item label="Teóricas">
                  {getFieldDecorator('horasTeoricasAgregar', {
                    rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
                    })(
                      <InputNumber min={0} max={10} /> 
                    )}
                </Form.Item>
              </Col>
              <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item label="Laboratorio">
                  {getFieldDecorator('horasLaboratorioAgregar', {
                  rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
                })(<InputNumber min={0} max={10} />)}
                </Form.Item>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                <Form.Item label="Prácticas">
                  {getFieldDecorator('horasPracticasAgregar', {
                    rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
                  })(
                    <InputNumber min={0} max={10} />
                  )}
                </Form.Item>
              </Col>
            </Row>
      
            <Form.Item label="Seleccione un Componente de Formación">
              {getFieldDecorator('componenteDeFormacionNombreAgregar', {
                    rules: [{ required: true, message: 'Por favor seleccione un componente de formacion!' }],
                  })(
               
                  <Radio.Group buttonStyle="solid">
                  {trainingComponentsData.map((trainingComponent, index) =>
                  <Radio.Button key={index} value={trainingComponent.nombre}>
                  <Tooltip placement="bottom" title={trainingComponent.nombre}>
                  {trainingComponent.abreviatura}
                  </Tooltip>
                  </Radio.Button>)}
              </Radio.Group>
              )}
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  }
);


const SubjectDetail = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    deleteSubject = (subjectId, mattersStore, programId, inp) => {
      mattersStore.deleteMatterData(programId, inp, subjectId);
    };

    state = {
      visible: false,
      visibleModalUpdate: false,
      visibleModalDelete: false, 
      visibleModalStepChangeControl: false,
      visibleModalTimelineChangesControl: false,
      popoverVisible: false, 
      expand: false,
      subjetBySniesCodeData: {}
    };
  
    showModalAddRequirement = () => {
      this.setState({ visible: true });
    };
  
    handleCancelAddRequirement = () => {
      this.setState({ visible: false });
    };
  
    handleCreateAddRequirement = (subjectCode, requirementStore) => {
      const { form } = this.formRefAddRequirement.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        const addRequirementDTO = new AddRequirementDTO(values.codigoRequisito, values.tipoRequisito);
        requirementStore.addRequirement(addRequirementDTO, subjectCode);
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRefAddRequirement = formRefAddRequirement => {
      this.formRefAddRequirement = formRefAddRequirement;
    };

    showModalUpdateRequirement = () => {
      this.setState({ visibleModalUpdate: true });
    };
  
    handleCancelUpdateRequirement = () => {
      this.setState({ visibleModalUpdate: false });
    };
  
    handleCreateUpdateRequirement = (subjectCode, requirementStore) => {
      const { form } = this.formRefUpdateRequirement.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }  
        const updateRequirementDTO = new UpdateRequirementDTO(values.tipoRequisito);
        requirementStore.updateRequirement(updateRequirementDTO, subjectCode, values.codigoRequisito);
        form.resetFields();
        this.setState({ visibleModalUpdate: false });
      });
    };
  
    saveFormRefUpdateRequirement = formRefUpdateRequirement => {
      this.formRefUpdateRequirement = formRefUpdateRequirement;
    };

    showModalDeleteRequirement = () => {
      this.setState({ visibleModalDelete: true });
    };
  
    handleCancelDeleteRequirement = () => {
      this.setState({ visibleModalDelete: false });
    };
  
    handleCreateDeleteRequirement = (subjectCode, requirementStore) => {
      const { form } = this.formRefDeleteRequirement.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }  
        requirementStore.deleteRequirement(subjectCode, values.codigoRequisito);
        form.resetFields();
        this.setState({ visibleModalDelete: false });
      });
    };
  
    saveFormRefDeleteRequirement = formRefDeleteRequirement => {
      this.formRefDeleteRequirement = formRefDeleteRequirement;
    };

    handleVisibleChangePopover = visible => {
      this.setState({ popoverVisible: visible });
    };

    clickPrerequisito = async (codigoPrerequisito, mattersStore) => {
      
      await mattersStore.getMatterBySniesCode(codigoPrerequisito);
      this.setState({ subjetBySniesCodeData: mattersStore.subjetBySniesCodeData });
    
    };

    showModalStepChangeControl = () => {
      this.setState({ visibleModalStepChangeControl: true });
    };

    cancelModalStepChangeControl = () => {
      this.setState({ visibleModalStepChangeControl: false });
    };
    
    handleUploadFile = (process) => {
      process.showMessage('Proceso terminado correctamente', 'success');
      this.setState({ visibleModalStepChangeControl: false });
    };
  
    timelineFormRef = formRefTime => {
      this.formRefTime = formRefTime;
    };

    showModalTimelineChangesFolder = () => {
      this.setState({ visibleModalTimelineChangesControl: true });
    };

    cancelModalTimelineChangesFolder = () => {
      this.setState({ visibleModalTimelineChangesControl: false });
    };
    
    handleTimelineChangesFolder = () => {
      this.setState({ visibleModalTimelineChangesControl: false });
    };
  
    uploapFormRefFile = formRefFile => {
      this.formRefFile = formRefFile;
    };

    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
    };

    getFields(form, trainingComponentsData, subjectData, mattersStore) {

      const { getFieldDecorator } = form;
      const children = [];
      const Option = Select.Option;
      const trainingComponentSubject = { ...subjectData.componenteDeFormacion };
      const requisitos = subjectData.requisitos ? subjectData.requisitos : [];
      const dateFormat = 'YYYY-MM-DD';
      const requisitosDeNivel = ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5', 'Nivel 6', 'Nivel 7', 'Nivel 8', 'Nivel 9'];

     
      children.push(
        <Col span={8} key={0} style={{ display: 'block' }}>
          <Form.Item label="Código">
            {getFieldDecorator('codigo', {
              initialValue: subjectData.codigo,
              rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
            })(
              <Input />
            )}
          </Form.Item>
        </Col>,
      );
        
      children.push(
        <Col span={8} key={1} style={{ display: 'block' }}>
          <Form.Item label="Nombre">
            {getFieldDecorator('nombre', {
              initialValue: subjectData.nombre,
              rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
            })(
              <Input />
            )}
          </Form.Item>
        </Col>,
      );

      children.push(
        <Col span={8} key={2} style={{ display: 'block' }}>
          <Form.Item label="Créditos">
            {getFieldDecorator('creditos', {
              initialValue: subjectData.creditos,
              rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
            })(
              <InputNumber min={1} max={10} />
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={3} style={{ display: 'block' }}>
          <Form.Item label="Nivel">
            {getFieldDecorator('nivel', {
              initialValue: subjectData.nivel,
              rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
            })(
              <InputNumber onChange={this.handleNivel} min={1} max={10} />
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={4} style={{ display: 'block' }}>
           <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion', {
                  initialValue: trainingComponentSubject.nombre,
              })(
                <Radio.Group buttonStyle="solid">
                  {
                    trainingComponentsData.map((trainingComponent, index) =>
                      <Radio.Button key={index} value={trainingComponent.nombre}>
                        <Tooltip placement="bottom" title={trainingComponent.nombre}>
                          {trainingComponent.abreviatura}
                        </Tooltip>
                      </Radio.Button>
                      )
                  }
                </Radio.Group>
              )}
            </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={5} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Horas Teóricas">
            {getFieldDecorator('horasTeoricas', {
              initialValue: subjectData.horasTeoricas,
              rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
            })(
              <InputNumber min={0} max={10} />
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={6} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Horas Laboratorio">
            {getFieldDecorator('horasLaboratorio', {
              initialValue: subjectData.horasLaboratorio,
              rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
            })(
              <InputNumber min={0} max={10} />
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={7} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Horas Prácticas">
            {getFieldDecorator('horasPracticas', {
              initialValue: subjectData.horasPracticas,
              rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
            })(
              <InputNumber min={0} max={10} />
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={8} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Horas Trabajo Independiente del Estudiante">
            {getFieldDecorator('trabajoIndependienteEstudiante', {
              initialValue: subjectData.horasIndependientesDelEstudiante,
              rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
            })(
              <InputNumber disabled = {true}/>
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={9} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Fecha de creacion:">
            <DatePicker defaultValue={moment(subjectData.fechaDeRegistro ? subjectData.fechaDeRegistro : '', dateFormat)} disabled />
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={10} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Ultima modificacion:">
            <DatePicker defaultValue={moment(subjectData.fechaDeModificacion ? subjectData.fechaDeModificacion : '', dateFormat)} disabled />
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={11} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Requisito de nivel">
            {getFieldDecorator('requisitoNivel', {
              initialValue: subjectData.requisitoNivel,
            })(
              <Select style={{width:120}}>
              <Option key={0} value={"No"}>No</Option>
                { 
                  requisitosDeNivel.filter(requisito => requisito.substring(6, 7) < subjectData.nivel).map((requisito, index) =>
                  <Option key={index+1} value={requisito}>{requisito}</Option>
                )}
              </Select>
            )}
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={12} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Prerequisitos">
            { requisitos.filter(requisito => requisito.tipo === 'Prerequisito')
                .map(prerequisito => 
                    <Popover
                      content={`Nivel ${this.state.subjetBySniesCodeData.nivel}`}
                      title={this.state.subjetBySniesCodeData.nombre}
                      trigger="click"
                      onVisibleChange={this.handleVisibleChangePopover}
                    >
                      <Button 
                        onClick = {() => this.clickPrerequisito(prerequisito.codigo, mattersStore)}
                      >
                        { prerequisito.codigo }
                      </Button>
                    </Popover>
                ) 
            }
          </Form.Item>
        </Col>,
      );
      children.push(
        <Col span={8} key={13} style={{ display: this.state.expand ? 'block' : 'none' }}>
          <Form.Item label="Corequisitos">
            { requisitos.filter(requisito => requisito.tipo === 'Corequisito')
                .map(corequisito => 
                  <Popover
                    content={`Nivel ${this.state.subjetBySniesCodeData.nivel}`}
                    title={this.state.subjetBySniesCodeData.nombre}
                    trigger="click"
                    onVisibleChange={this.handleVisibleChangePopover}
                  >
                    <Button 
                      onClick = {() => this.clickPrerequisito(corequisito.codigo, mattersStore)}
                    >
                      { corequisito.codigo }
                    </Button>
                  </Popover>
                ) 
            }
          </Form.Item>
        </Col>,
      );
      return children;
    }

    render() {

      const {
        visibleSubject, 
        onCancel, 
        onCreateSubjectUpdate, 
        form, 
        nameSubject, 
        subjectData, 
        trainingComponentsData,
        mattersStore,
        programId, 
        inp,
        requirementStore,
        process
      } = this.props;

   
      return (
        <Modal
          visible={visibleSubject}
          title={nameSubject}
          centered
          width={700}
          onCancel={onCancel}
          destroyOnClose={'true'}
          footer={[
            <Button type="primary" onClick={onCancel}>Cerrar</Button>,
            <Popconfirm placement="top" title={"Estas segur@ que deseas eliminar esta asignatura"} onConfirm={() => this.deleteSubject(subjectData.codigo, mattersStore, programId, inp)} okText="Si" cancelText="No">
              <Button>Eliminar</Button>
            </Popconfirm>,
            <Popconfirm placement="top" title={"Estas segur@ que deseas actualizar esta asignatura"} onConfirm={onCreateSubjectUpdate} okText="Si" cancelText="No">
              <Button>Actualizar</Button>
            </Popconfirm>
          ]}
          
        >
          <Form layout="vertical">

            <center>
              <Button
                type="primary"
                onClick = {() => this.showModalStepChangeControl()}
              >
                Cargar Planeador
              </Button>

              <StepLineChangeControlComponent
                wrappedComponentRef={this.uploapFormRefFile}
                visible={this.state.visibleModalStepChangeControl}
                onCancel={this.cancelModalStepChangeControl}
                onCreate={() => this.handleUploadFile(process)}
                process={process}
                matterStore={mattersStore}
                subjectData={subjectData}
              />

              <br/>
              <br/>

              <Button
                type="primary"
                onClick = {() => this.showModalTimelineChangesFolder()}
              >
                Ver historico de cambios en planeador
              </Button>

              <TimelineChangesFolder
                wrappedComponentRef={this.timelineFormRef}
                visible={this.state.visibleModalTimelineChangesControl}
                onCancel={this.cancelModalTimelineChangesFolder}
                onCreate={this.handleTimelineChangesFolder}
                matterStore={mattersStore}
                subjectData={subjectData}
              />

            </center>
            <br />

            <Row gutter={24}>{this.getFields(form, trainingComponentsData, subjectData, mattersStore)}</Row>

            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>

                <Button
                  onClick = {() => this.showModalAddRequirement()}
                >
                  Agregar Requisito
                </Button>

                <AddRequirement
                  wrappedComponentRef={this.saveFormRefAddRequirement}
                  visible={this.state.visible}
                  onCancel={this.handleCancelAddRequirement}
                  onCreateAddRequirement={() => this.handleCreateAddRequirement(subjectData.codigo, requirementStore)}
                  mattersData={mattersStore.mattersData}
                  subjectData={subjectData}
                />

                <Button
                  style={{ marginLeft: 12 }}
                  disabled = {subjectData.requisitos && (subjectData.requisitos).length === 0 }
                  onClick = {() => this.showModalUpdateRequirement()}
                >
                  Actualizar Requisito
                </Button>

                <UpdateRequirement
                  wrappedComponentRef={this.saveFormRefUpdateRequirement}
                  visible={this.state.visibleModalUpdate}
                  onCancel={this.handleCancelUpdateRequirement}
                  onCreate={() => this.handleCreateUpdateRequirement(subjectData.codigo, requirementStore)}
                  requisitos={subjectData.requisitos}
                  subjectData={subjectData}
                />


                <Button
                  style={{ marginLeft: 12 }}
                  disabled = {subjectData.requisitos && (subjectData.requisitos).length === 0 }
                  onClick = {() => this.showModalDeleteRequirement()}
                >
                  Eliminar Requisito
                </Button>

                <DeleteRequirement
                  wrappedComponentRef={this.saveFormRefDeleteRequirement}
                  visible={this.state.visibleModalDelete}
                  onCancel={this.handleCancelDeleteRequirement}
                  onCreate={() => this.handleCreateDeleteRequirement(subjectData.codigo, requirementStore)}
                  requisitos={subjectData.requisitos}
                />

                <a style={{ marginLeft: 25, fontSize: 15 }} onClick={this.toggle}>
                  Ver Mas Información <Icon type={this.state.expand ? 'up' : 'down'} />
                </a>
              </Col>
            </Row>      
          </Form>
        </Modal>
      );
    }
  }
);

const AddRequirement = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    
    render() {
      const { visible, onCancel, onCreateAddRequirement, form, mattersData, subjectData } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;

      return (
        <Modal
          visible={visible}
          title="Agregar Requisito"
          okText="Agregar Requisito"
          onCancel={onCancel}
          onOk={onCreateAddRequirement}
        >
          <Form layout="vertical">
            <Form.Item label="Tipo de Requisito">
              {getFieldDecorator('tipoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un tipo de requisito!' }],
              })(
                <Select>
                  
                    <Option value='Prerequisito'>Prerequisito</Option>
                    <Option value='Corequisito'>Corequisito</Option>
                  
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Requisito">
              {getFieldDecorator('codigoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un requisito!' }],
              })(
                
                <Select>
                  { 
                    mattersData.filter(matter => (matter.nivel <= subjectData.nivel) && (matter.codigo !== subjectData.codigo))
                    .map(matterData =>
                      <Option value={matterData.codigo}>{matterData.nombre}</Option>
                    )
                  }
                </Select>

              )}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  },
);

const UpdateRequirement = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    render() {
      const { visible, onCancel, onCreate, form, requisitos } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;
      return (
        <Modal
          visible={visible}
          title="Actualizar Requisito"
          okText="Actualizar Requisito"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Tipo de Requisito">
              {getFieldDecorator('tipoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un tipo de requisito!' }],
              })(
                <Select >
                  
                    <Option value='Prerequisito'>Prerequisito</Option>
                    <Option value='Corequisito'>Corequisito</Option>
                  
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Seleccione el requisito que desea actualizar">
              {getFieldDecorator('codigoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un requisito!' }],
              })(
                
                <Select>
                  { requisitos.map(requisito =>
                      <Option value={requisito.id}>{requisito.codigo}</Option>
                  )}
                </Select>

              )}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  },
);
  
const DeleteRequirement = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, requisitos } = this.props;
      const { getFieldDecorator } = form;
      const Option = Select.Option;
      return (
        <Modal
          visible={visible}
          title="Eliminar Requisito"
          okText="Eliminar Requisito"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Seleccione el requisito que desea eliminar">
              {getFieldDecorator('codigoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un requisito!' }],
              })(
                
                <Select>
                  {requisitos.map(requisito =>
                      <Option value={requisito.id}>{requisito.codigo}</Option>
                    )}
                </Select>

              )}
            </Form.Item>
            
          </Form>
        </Modal>
      );
    }
  },
);

const columnsNames = [{
  dataIndex: 'semestre1',
  title: 'Nivel 1',
  key: "1",
  align: 'center'
}, {
  dataIndex: 'semestre2',
  title: 'Nivel 2',
  key: "2",
  align: 'center'
}, {
  dataIndex: 'semestre3',
  title: 'Nivel 3',
  key: "3",
  align: 'center'
}, {
  dataIndex: 'semestre4',
  title: 'Nivel 4',
  key: "4",
  align: 'center'
}, {
  dataIndex: 'semestre5',
  title: 'Nivel 5',
  key: "5",
  align: 'center'
}, {
  dataIndex: 'semestre6',
  title: 'Nivel 6',
  key: "6",
  align: 'center'
}, {
  dataIndex: 'semestre7',
  title: 'Nivel 7',
  key: "7",
  align: 'center'
}, {
  dataIndex: 'semestre8',
  title: 'Nivel 8',
  key: "8",
  align: 'center'
}, {
  dataIndex: 'semestre9',
  title: 'Nivel 9',
  key: "9",
  align: 'center'
}, {
  dataIndex: 'semestre10',
  title: 'Nivel 10',
  key: "10",
  align: 'center'
}];

@observer
class DetailStudyPlan extends React.Component {

  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
    this.process = this.props.stores.process;
    this.inpComponentStore = this.props.stores.inpComponentStore;
    this.trainingComponentStore = this.props.stores.trainingComponentStore;
    this.requirementStore = this.props.stores.requirementStore;

  }
  

  state = {
    visible: false,
    visibleSubject: false,
    nameSubject: '', 
    subjectData: {},
    trainingComponentsData: []
  }

  showModal = () => {
    this.setState({ visible: true, trainingComponentsData: this.trainingComponentStore.trainingComponentsData });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    
    const form = this.formRefAddSubject.props.form;
    form.validateFields((err, values) => {

      if (err) {
        return;
      }
      const asignaturaRequestDTO = 
        new AsignaturaRequestDTO(
          values.codigoAgregar, 
          values.componenteDeFormacionNombreAgregar, 
          values.nombreAgregar, 
          values.creditosAgregar, 
          values.horasTeoricasAgregar, 
          values.horasLaboratorioAgregar, 
          values.nivelAgregar,
          values.horasPracticasAgregar,
          values.trabajoIndependienteEstudianteAgregar,
          values.requisitoNivel);

      this.matters.saveMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, asignaturaRequestDTO, this.programId);

      form.resetFields();
      this.setState({ visible: false });

    });
  };

  showModalSubject = () => {
    this.setState({ visibleSubject: true });
  };

  handleCancelSubject = () => {
    this.setState({ visibleSubject: false });
  };

  handleUpdate = () => {

    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
  
      if (err) {
        return;
      }
      const updateMatterRequestDTO = new UpdateMatterRequestDTO(
        values.componenteFormacion, 
        values.nombre,
        values.creditos,
        values.horasTeoricas,
        values.horasLaboratorio,
        values.horasPracticas,
        values.trabajoIndependienteEstudiante,
        values.nivel,
        values.requisitoNivel
      );
      
      this.matters.updateMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, updateMatterRequestDTO, values.codigo);

      form.resetFields();
      this.setState({ visibleSubject: false });

    });

  };

  openModal = (propiedadesAsignatura) => {
    this.showModalSubject();
    this.setState({ nameSubject: propiedadesAsignatura.nombre, subjectData: propiedadesAsignatura, trainingComponentsData: this.trainingComponentStore.trainingComponentsData });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  saveFormRefAddSubject = (formRefAddSubject) => {
    this.formRefAddSubject = formRefAddSubject;
  }


  componentDidMount = () => {

    this.matters.getMattersData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp);

    this.matters.setDeleteSuccess(false);
    this.matters.setUpdateSuccess(false);
    
    if (!this.trainingComponentStore.trainingComponentsData) {
      this.trainingComponentStore.getTrainingComponents();
    }
   
  }

  createAsignatureCardsBySemesters = (asignatura) => {
    
    return asignatura
      .map(asignatura => ({ ...asignatura, keyIndex: `semestre${asignatura.nivel}` }))
      .map((asignatura, index) => {
        const cardAsignatura = { key: index, name: asignatura.nivel };
        cardAsignatura[asignatura.keyIndex] = 
        <span onClick = {() => this.openModal({...asignatura})}>
            <CardMatter {...asignatura} />
        </span>
        return cardAsignatura;
      });
  };

  filterBySemestre = (asignaturaCard) => {

    const asignatureObject = {};
    const property = `semestre${asignaturaCard.name}`;
    asignatureObject[property] = asignaturaCard[property];

    return asignatureObject;
  };

  groupBySemester = (datosAsignaturas, semesterNumber) => {
    return datosAsignaturas.filter(asignatura => asignatura[`semestre${semesterNumber}`]);
  };

  buildSemesters = (semesterNumber, semester, semesterOrdered, totalSemester) => {
    for (let idx = 0; idx < totalSemester; idx++) {
      if (semester[idx] && semesterOrdered[idx]) {
        semesterOrdered[idx][`semestre${semesterNumber}`] = semester[idx][`semestre${semesterNumber}`];
      }
    }
    return semesterOrdered;
  };

  orderBySemester = (datosAsignaturas) => {
    
    const totalSemester = 10;
    const semesterOrdered = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    
    for (let idx = 1; idx <= totalSemester; idx++) {
      const semester = this.groupBySemester(datosAsignaturas, idx);
      if (semester) {
        this.buildSemesters(idx, semester, semesterOrdered, totalSemester);
      }
    }

    return semesterOrdered.filter(semesterData => Object.keys(semesterData).length > 0);
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render() {

    return (
      <div>
        
        <Table
          columns={columnsNames}
          dataSource={this.mattersBySemester(this.matters.mattersData)}
          scroll={{ x: 2300 }}
          size="small"
          pagination={pagination}
          align={"center"}
        />
        <br/>
        <center>
          <Button 
            type="primary"
            onClick={this.showModal}
          >
            Agregar Asignatura
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRefAddSubject}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            trainingComponentsData={this.state.trainingComponentsData}
          />
          <SubjectDetail 
            wrappedComponentRef={this.saveFormRef}
            visibleSubject={this.state.visibleSubject}
            nameSubject={this.state.nameSubject}
            subjectData={this.state.subjectData}
            onCancel={this.handleCancelSubject}
            onCreateSubjectUpdate={this.handleUpdate}
            trainingComponentsData={this.state.trainingComponentsData}
            mattersStore={this.matters}
            programId={this.inpComponentStore.inpData.programId}
            inp={this.inpComponentStore.inpData.id}
            requirementStore={this.requirementStore}
            process={this.process}
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;