import React from 'react';
import { observer } from 'mobx-react';
import SubjectDetail from '../SubjectDetail';
import TimelineChangesFolder from '../../TimelineChangesFolder';
import StepLineChangeControlComponent from '../../StepChangeControlComponent';
import AddRequirement from '../AddRequirement';
import UpdateRequirement from '../UpdateRequirement';
import DeleteRequirement from '../DeleteRequirement';
import DescripcionCambioDTO from '../../../../dto/DescripcionCambioDTO';
import UpdateMatterRequestDTO from '../../../../dto/UpdateMatterRequestDTO';
import UpdateRequirementDTO from '../../../../dto/UpdateRequirementDTO';
import AddRequirementDTO from '../../../../dto/AddRequirementDTO';
import DriveViewer from '../../DrivePicker/DriveViewer';
import moment from 'moment';
import { 
  Form, 
  Modal, 
  Button, 
  Popover,  
  DatePicker, 
  Tooltip, 
  Row,
  Col,
  Tag,
  message,
  Popconfirm
  } from 'antd';

@observer
class SubjectDetailRead extends React.Component {

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
    visibleUpdateSubject: false,
    visibleModalUpdate: false,
    visibleModalDelete: false, 
    visibleModalStepChangeControl: false,
    visibleModalTimelineChangesControl: false,
    popoverVisible: false, 
    expand: false,
    subjetBySniesCodeData: {},
    current: 0
    };

    deleteSubject = (subjectId, mattersStore, programId, inp) => {
    mattersStore.deleteMatterData(programId, inp, subjectId);
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

    deleteRequirementAction = (requirementStore, subjectCode, codigoRequisito) => {
    requirementStore.deleteRequirement(subjectCode, codigoRequisito);
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

    cancelModalStepChangeControl = (stepChangeControlStore) => {
    stepChangeControlStore.setDescription('');
    stepChangeControlStore.setCurrent(0);
    stepChangeControlStore.setIsUploadFile(false);
    stepChangeControlStore.setIsDescription(false);
    this.setState({ visibleModalStepChangeControl: false, current: 0 });
    };
    
    handleUploadFile = async(process, mattersStore, subjectData, stepChangeControlStore) => {
    
    if (stepChangeControlStore.isUploadFile && stepChangeControlStore.isDescription) {
    
        const descripcionCambioDTO = new DescripcionCambioDTO(stepChangeControlStore.description);
        await mattersStore.addDescriptionBySubject(subjectData.codigo, descripcionCambioDTO)
        if (mattersStore.addDescriptionResponse) {
        stepChangeControlStore.setIsUploadFile(false);
        process.showMessage('Proceso terminado correctamente', 'success');  
        } else {
        process.showMessage('No se pudo conectar el servicio para subir archivo!', 'error');
        }
    } else {
        message.warning('Debe cargar un archivo para finalizar!');
    }
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

    showModalSubject = () => {
    this.setState({ visibleUpdateSubject: true });
    };

    handleCancelSubject = () => {
    this.setState({ visibleUpdateSubject: false });
    };

    uploapFormRefFile = formRefFile => {
    this.formRefFile = formRefFile;
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
        values.requisitoNivel,
        values.tie
        );
        
        this.matters.updateMatterData(this.inpComponentStore.inpData.programId, this.inpComponentStore.inpData.inp, updateMatterRequestDTO, values.codigo);

        form.resetFields();
        this.setState({ visibleUpdateSubject: false });

    });

    };

    saveFormRef = (formRef) => {
    this.formRef = formRef;
    }

    render() {

    const {
        visibleSubject, 
        onCancel,
        nameSubject, 
        subjectData, 
        trainingComponentsData,
        mattersStore,
        programId, 
        inp,
        requirementStore,
        process,
        stepChangeControlStore
    } = this.props;

    const componenteDeFormacion = { ...subjectData.componenteDeFormacion };
    const requisitos = subjectData.requisitos ? subjectData.requisitos : [];
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    
    return (
        <Modal
            visible={visibleSubject}
            title={nameSubject}
            centered
            width={700}
            onCancel={onCancel}
            destroyOnClose={'true'}
            footer={[<Button type="primary" onClick={onCancel}>Cerrar</Button>]}
        >
            <div>
                <Row type="flex" justify="space-between" align="bottom" style={{textAlign:"center"}}>
                <Col span={18} push={3} style={{textAlign:"center"}}>
                    <Row>
                    <Col span={6} style={{backgroundColor:componenteDeFormacion.color, color:"#ffffff", fontWeight:"bold"}}>
                        [{componenteDeFormacion.abreviatura}] {componenteDeFormacion.nombre}
                    </Col>
                    </Row>
                    <Row>
                    <br/>
                    <Col span={8}>
                        <h3>Codigo</h3>
                        <p>{subjectData.codigo}</p>
                    </Col>
                    <Col span={8}>
                        <h3>Nivel</h3>
                        <p>{subjectData.nivel}</p>
                    </Col>
                    <Col span={8}>
                        <h3>Créditos</h3>
                        <p>{subjectData.creditos}</p>
                    </Col>
                    </Row>
                    <Row>
                    
                    <h3>Horas</h3>
                    <Col span={6}>
                        <h4>Teoricas</h4>
                        <p>{subjectData.horasTeoricas}</p>
                    </Col>
                    <Col span={6}>
                        <h4>Laboratorio</h4>
                        <p>{subjectData.horasLaboratorio}</p>
                    </Col>
                    <Col span={6}>
                        <Tooltip placement="top" title={"Independientes del estudiante"}>
                        <h4>IDE</h4>
                        <p>{subjectData.horasIndependientesDelEstudiante}</p>
                        </Tooltip>
                    </Col>
                    <Col span={6}>
                        <h3>Practicas</h3>
                        <p>{subjectData.horasPracticas}</p>
                    </Col>
                    </Row>
                    <Row>
                    
                    <h3>Requisitos</h3>
                    <Col span={8}>
                        <h4>Requisito de nivel</h4>
                        <p>{subjectData.requisitoNivel}</p>
                    </Col>
                    <Col span={8}>
                        <h4>Prerequisitos</h4>
                        { requisitos.filter(requisito => requisito.tipo === 'Prerequisito').map(prerequisito => 
                            <Popover
                            content={`Nivel ${this.state.subjetBySniesCodeData.nivel}`}
                            title={this.state.subjetBySniesCodeData.nombre}
                            trigger="click"
                            onVisibleChange={this.handleVisibleChangePopover}
                            >
                            <Tag onClick = {() => this.clickPrerequisito(prerequisito.codigo, mattersStore)}>
                                {prerequisito.codigo}
                            </Tag>
                            </Popover>
                        )}
                    </Col>
                    <Col span={8}>
                        <h4>Corequisitos</h4>
                        { requisitos.filter(requisito => requisito.tipo === 'Corequisito').map(prerequisito => 
                        <Popover
                            content={`Nivel ${this.state.subjetBySniesCodeData.nivel}`}
                            title={this.state.subjetBySniesCodeData.nombre}
                            trigger="click"
                            onVisibleChange={this.handleVisibleChangePopover}
                        >
                        <Tag onClick = {() => this.clickPrerequisito(prerequisito.codigo, mattersStore)}>
                            {prerequisito.codigo}
                        </Tag>
                        </Popover>
                    )}
                    </Col>
                    </Row>
                    <Row>
                    <Col span={8}><Tooltip placement="top" title={"Agregar"}><Button shape="circle" icon="plus" onClick = {() => this.showModalAddRequirement()}/></Tooltip></Col>
                    {!(subjectData.requisitos && (subjectData.requisitos).length === 0) 
                    && <Col span={8}><Tooltip placement="top" title={"Modificar"}><Button shape="circle" icon="edit" onClick = {() => this.showModalUpdateRequirement()}/></Tooltip></Col>
                    }
                    {!(subjectData.requisitos && (subjectData.requisitos).length === 0)
                    && <Col span={8}><Tooltip placement="top" title={"Eliminar"}><Button shape="circle" icon="delete" onClick = {() => this.showModalDeleteRequirement()}/></Tooltip></Col>
                    }
                    </Row>
                    <br/>
                    <Row justify="center" align="middle">
                    <Col xs={{ span: 1, offset: 1 }} lg={{ span: 6, offset: 5 }}>
                        <DatePicker defaultValue={moment(subjectData.fechaDeRegistro ? subjectData.fechaDeRegistro : '', dateFormat)} disabled />
                    </Col>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>   
                        <DatePicker defaultValue={moment(subjectData.fechaDeModificacion ? subjectData.fechaDeModificacion : '', dateFormat)} disabled />
                    </Col>
                    </Row>
                </Col>
            
                </Row>
            </div>
            <br/>
            <Row type="flex" justify="space-between" align="bottom" style={{textAlign:"center"}}>
                
                <Col span={4}>
                    <Tooltip placement="bottom" title={"Descripcion de cambios"}>
                        <Button type="primary" shape="circle" icon="history" size="large" onClick = {() => this.showModalTimelineChangesFolder()}></Button>
                    </Tooltip>
                    <TimelineChangesFolder
                        wrappedComponentRef={this.timelineFormRef}
                        visible={this.state.visibleModalTimelineChangesControl}
                        onCancel={this.cancelModalTimelineChangesFolder}
                        onCreate={this.handleTimelineChangesFolder}
                        matterStore={mattersStore}
                        subjectData={subjectData}
                    />
                </Col>

                <Col span={4}>
                    <Tooltip placement="bottom" title={"Subir nuevo archivo"}>
                        <Button type="primary" shape="circle" icon="cloud-upload" size="large" onClick = {() => this.showModalStepChangeControl()}></Button>
                    </Tooltip>
                    <StepLineChangeControlComponent
                        wrappedComponentRef={this.uploapFormRefFile}
                        visible={this.state.visibleModalStepChangeControl}
                        onCancel={() => this.cancelModalStepChangeControl(stepChangeControlStore)}
                        onCreate={() => this.handleUploadFile(process, mattersStore, subjectData, stepChangeControlStore)}
                        process={process}
                        matterStore={mattersStore}
                        subjectData={subjectData}
                        stepChangeControlStore={stepChangeControlStore}
                    />
                </Col>

                <Col span={4}>
                    <Tooltip placement="bottom" title={"Visualizar Planes de Estudio"}>
                        <DriveViewer {...subjectData}/>
                    </Tooltip>
                </Col> 

                <Col span={4}>
                    <Tooltip placement="bottom" title={"Actualizar asignatura"}>
                        <Button type="primary" shape="circle" icon="form" size="large" onClick = {() => this.showModalSubject()}></Button>
                    </Tooltip>
                    <SubjectDetail 
                        wrappedComponentRef={this.saveFormRef}
                        visibleSubject={this.state.visibleUpdateSubject}
                        nameSubject={nameSubject}
                        subjectData={subjectData}
                        onCancel={this.handleCancelSubject}
                        onCreateSubjectUpdate={this.handleUpdate}
                        trainingComponentsData={trainingComponentsData}
                        mattersStore={mattersStore}
                        programId={programId}
                        inp={inp}
                        requirementStore={requirementStore}
                        process={process}
                    />
                </Col>

                <Col span={4}>
                    <Tooltip placement="bottom" title={"Eliminar asignatura"}>
                        <Popconfirm placement="top" title={"Estas segur@ que deseas eliminar esta asignatura"} onConfirm={() => this.deleteSubject(subjectData.codigo, mattersStore, programId, inp)} okText="Eliminar" cancelText="Cancelar">
                            <Button type="primary" shape="circle" icon="delete" size="large"></Button>
                        </Popconfirm>
                    </Tooltip>
                </Col>

            </Row>

            <AddRequirement
                wrappedComponentRef={this.saveFormRefAddRequirement}
                visible={this.state.visible}
                onCancel={this.handleCancelAddRequirement}
                onCreateAddRequirement={() => this.handleCreateAddRequirement(subjectData.codigo, requirementStore)}
                mattersData={mattersStore.mattersData}
                subjectData={subjectData}
            />

            <UpdateRequirement
                wrappedComponentRef={this.saveFormRefUpdateRequirement}
                visible={this.state.visibleModalUpdate}
                onCancel={this.handleCancelUpdateRequirement}
                onCreate={() => this.handleCreateUpdateRequirement(subjectData.codigo, requirementStore)}
                requisitos={subjectData.requisitos}
                subjectData={subjectData}
            />

            <DeleteRequirement
                wrappedComponentRef={this.saveFormRefDeleteRequirement}
                visible={this.state.visibleModalDelete}
                onCancel={this.handleCancelDeleteRequirement}
                onCreate={() => this.handleCreateDeleteRequirement(subjectData.codigo, requirementStore)}
                requisitos={subjectData.requisitos}
            />
            </Modal>
        );
    }
}
const SubjectDetailReadOnly = Form.create({ name: 'form_in_modal' })(SubjectDetailRead);
export default SubjectDetailReadOnly;
  