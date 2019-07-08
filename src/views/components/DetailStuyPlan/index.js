import React from 'react';
import { observer } from 'mobx-react';
import { Table, pagination, Form, Input, Modal, Button, Select, Tag } from 'antd';
import CardMatter from '../CardMatter';
import AsignaturaRequestDTO from '../../../dto/AsignaturaRequestDTO';
import UpdateMatterRequestDTO from '../../../dto/UpdateMatterRequestDTO';
import AddRequirementDTO from '../../../dto/AddRequirementDTO';
import UpdateRequirementDTO from '../../../dto/UpdateRequirementDTO';


const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    render() {

      const {
        visible, onCancel, onCreate, form, trainingComponentsData
      } = this.props;

      const { getFieldDecorator } = form;
      const Option = Select.Option;

      return (
        <Modal
          visible={visible}
          title="Agregue una nueva asignatura"
          okText="Agregar"
          onCancel={onCancel}
          onOk={onCreate}
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

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteDeFormacionNombreAgregar')(
               
                <Select>
                  {trainingComponentsData.map(trainingComponent =>
                    <Option value={trainingComponent.nombre}>{trainingComponent.nombre}</Option>
                  )}
                </Select>
              
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricasAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorioAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Prácticas">
              {getFieldDecorator('horasPracticasAgregar', {
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudianteAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivelAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditosAgregar', {
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
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


const SubjectDetail = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {

    deleteSubject = (subjectId, mattersStore, programId, inp) => {
      mattersStore.deleteMatterData(programId, inp, subjectId);
    };


    state = {
      visible: false,
      visibleModalUpdate: false,
      visibleModalDelete: false
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
        requirementStore
      } = this.props;

      const { getFieldDecorator } = form;
      const Option = Select.Option;
      const trainingComponentSubject = { ...subjectData.componenteDeFormacion };
      const requisitos = subjectData.requisitos ? subjectData.requisitos : [];

      return (
        <Modal
          
          style={{ backgroundColor: '#026F35', color: '#fff' }}
          visible={visibleSubject}
          title={nameSubject}
          okText="Actualizar"
          onCancel={onCancel}
          onOk={onCreateSubjectUpdate}
          
        >
          <Form layout="vertical">

            <Form.Item label="Código">
              {getFieldDecorator('codigo', {
                initialValue: subjectData.codigo,
                rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nombre">
              {getFieldDecorator('nombre', {
                initialValue: subjectData.nombre,
                rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Componente de Formación">
              {getFieldDecorator('componenteFormacion', {
                  initialValue: trainingComponentSubject.nombre,
              })(
               
                <Select>
                  {trainingComponentsData.map(trainingComponent =>
                    <Option value={trainingComponent.nombre}>{trainingComponent.nombre}</Option>
                  )}
                </Select>
              
              )}
            </Form.Item>

            <Form.Item label="Horas Teóricas">
              {getFieldDecorator('horasTeoricas', {
                initialValue: subjectData.horasTeoricas,
                rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Laboratorio">
              {getFieldDecorator('horasLaboratorio', {
                initialValue: subjectData.horasLaboratorio,
                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Prácticas">
              {getFieldDecorator('horasPracticas', {
                initialValue: subjectData.horasPracticas,
                rules: [{ required: false, message: 'Por favor ingrese las horas prácticas de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Horas Trabajo Independiente del Estudiante">
              {getFieldDecorator('trabajoIndependienteEstudiante', {
                initialValue: subjectData.horasIndependientesDelEstudiante,
                rules: [{ required: true, message: 'Por favor ingrese las horas de trabajo independiente del estudiante de la asignatura!' }],  
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Nivel">
              {getFieldDecorator('nivel', {
                initialValue: subjectData.nivel,
                rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item label="Créditos">
              {getFieldDecorator('creditos', {
                initialValue: subjectData.creditos,
                rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
              })(
                <Input />
              )}
            </Form.Item>

            <div>
                Fecha de Creación { ( subjectData.fechaDeRegistro ? subjectData.fechaDeRegistro : '' ).substring(0, 10) }
                <br/>
                Fecha de Modificación { ( subjectData.fechaDeModificacion ? subjectData.fechaDeModificacion : '' ).substring(0, 10) }
                <br/><br/>
            </div>

            <center>

              <Button
              
                onClick = {() => this.deleteSubject(subjectData.codigo, mattersStore, programId, inp)}
              >
                Eliminar
              </Button>
                
            </center>
            
              <br />
              <div>

                Prerequisitos <br/>
                { requisitos.filter(requisito => requisito.tipo === 'Prerequisito')
                  .map(prerequisito => 
                      <Tag color="#026F35">{ prerequisito.codigo }</Tag>
                  ) 
                }

                <br/>Corequisitos <br/>
                { requisitos.filter(requisito => requisito.tipo === 'Corequisito')
                  .map(corequisito => 
                      <Tag color="#026F35">{ corequisito.codigo }</Tag>
                  ) 
                }

                <br/>Requisitos de Nivel <br/>
                { requisitos.filter(requisito => requisito.tipo === 'Requisito de nivel')
                  .map(requisitoDeNivel => 
                      <Tag color="#026F35">{ requisitoDeNivel.codigo }</Tag>
                  ) 
                }
              
              </div>
              <br />
            
            <center>
              
              <div>

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
                />


                <Button
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
              
                </div>

            </center>

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
                    <Option value='Requisito de Nivel'>Requisito de Nivel</Option>
                  
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Requisito">
              {getFieldDecorator('codigoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un requisito!' }],
              })(
                
                <Select>
                  {mattersData.filter(matter => (matter.nivel <= subjectData.nivel) && (matter.codigo !== subjectData.codigo))
                    .map(matterData =>
                      <Option value={matterData.codigo}>{matterData.nombre}</Option>
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

const UpdateRequirement = Form.create({ name: 'form_in_modal' })(

  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form, requisitos } = this.props;
      const { getFieldDecorator } = form;

      return (
        <Modal
          visible={visible}
          title="Actualizar Requisito"
          okText="Actualizar Requisito"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">

            <Form.Item label="Seleccione el requisito que desea actualizar">
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

            <Form.Item label="Tipo de Requisito">
              {getFieldDecorator('tipoRequisito', {
                rules: [{ required: true, message: 'Debe seleccionar un tipo de requisito!' }],
              })(
                <Select>
                  
                    <Option value='Prerequisito'>Prerequisito</Option>
                    <Option value='Corequisito'>Corequisito</Option>
                    <Option value='Requisito de Nivel'>Requisito de Nivel</Option>
                  
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
  title: 'semestre 1',
  key: "1",
}, {
  dataIndex: 'semestre2',
  title: 'semestre 2',
  key: "2",
}, {
  dataIndex: 'semestre3',
  title: 'semestre 3',
  key: "3",
}, {
  dataIndex: 'semestre4',
  title: 'semestre 4',
  key: "4",
}, {
  dataIndex: 'semestre5',
  title: 'semestre 5',
  key: "5",
}, {
  dataIndex: 'semestre6',
  title: 'semestre 6',
  key: "6",
}, {
  dataIndex: 'semestre7',
  title: 'semestre 7',
  key: "7",
}, {
  dataIndex: 'semestre8',
  title: 'semestre 8',
  key: "8",
}, {
  dataIndex: 'semestre9',
  title: 'semestre 9',
  key: "9",
}, {
  dataIndex: 'semestre10',
  title: 'semestre 10',
  key: "10",
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
      console.log('values', values)
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
          values.trabajoIndependienteEstudianteAgregar);

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
      console.log('valuesUpdate', values)
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
        values.nivel
      );
      
      this.matters.updateMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, updateMatterRequestDTO, values.codigo);

      form.resetFields();
      this.setState({ visibleSubject: false });

    });

  };

  openModal = (propiedadesAsignatura) => {
    console.log('propiedadesAsignatura', propiedadesAsignatura);
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
          <Button
            style={{ 
              height: 'auto'    
            }}
            onClick = {() => this.openModal({...asignatura})}
          >
            <CardMatter {...asignatura} />
          </Button>;
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
    const semesterOrdered = [];
    for (let idx = 1; idx <= totalSemester; idx++) {
      const semester = this.groupBySemester(datosAsignaturas, idx);
      if (semester) {
        semesterOrdered[idx - 1] = {};
        this.buildSemesters(idx, semester, semesterOrdered, totalSemester);
      }
    }
    const semesters = semesterOrdered.filter(semesterData => Object.keys(semesterData).length > 0);
    console.log('dataTable', semesters);
    return semesters;
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render() {
    console.log('mattersData', this.matters.mattersData);
    console.log('inpData', this.inpComponentStore.inpData)
    return (
      <div>
        
        <Table
          columns={columnsNames}
          dataSource={this.mattersBySemester(this.matters.mattersData)}
          scroll={{ x: 2300 }}
          size="small"
          pagination={pagination}
        />
        <br/>
        <center>
          <Button 
            type="primary" 
            style={{ backgroundColor: '#026F35', color: '#fff' }}
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
          />
        </center>

      </div>
    );
  }

}


export default DetailStudyPlan;