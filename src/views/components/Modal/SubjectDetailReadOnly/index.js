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
import "./index.css";
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
  Popconfirm,
  Icon
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

    formatDate = (date) => {
        const months = ["Enero","Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
        const year = date.substring(0,4)
        const month = date.substring(5,7)
        const day = date.substring(8,10)
        const hour = date.substring(11,19)
        if (month >= 10) {
           return months[month-1]+" "+day+" de "+year+" "+hour ;
        }
        else {
            const value = date.substring(6,7)
            return months[value-1]+" "+day+" de "+year+" "+hour;
        }

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
            centered
            width={700}
            onCancel={onCancel}
            destroyOnClose={'true'}
            footer={[<Button type="primary" onClick={onCancel}>Cerrar</Button>]}
        >
            <div class="center">

            <div class="card">
            <div class="additional" style={{backgroundColor:componenteDeFormacion.color}}>
                <div class="user-card">
                <div class="level center">
                {componenteDeFormacion.nombre}
                <br/>{componenteDeFormacion.abreviatura}
                </div>
                
                </div>
            </div>
            <div class="general">
                <h1>{subjectData.nombre}</h1>
                <p>{subjectData.codigo}</p>
                <p class="nivel" >Nivel {subjectData.nivel}</p>
                <div class="params">
                    <div class="firstStats">
                        <div>
                            <div class="title">Horas</div>
                            <Icon type="clock-circle" />
                        </div>
                    </div>
                    <div class="stats">
                        <div>
                            <div class="title"> Créditos</div>
                            <Icon type="pie-chart"/>                   
                            <div class="value">{subjectData.creditos}</div>
                        </div>
                        <div>
                            <div class="title">Teoricas</div>
                            <Icon type="read" />
                            <div class="value">{subjectData.horasTeoricas}</div>
                        </div>
                        <div>
                            <div class="title">Laboratorio</div>
                            <Icon type="experiment" />
                            <div class="value">{subjectData.horasLaboratorio}</div>
                        </div>
                        <Tooltip placement="top" title={"Trabajo independiente del estudiante"}>
                        <div>
                        
                            <div class="title">TIE</div>
                            <Icon type="audit" />
                            <div class="value">{subjectData.horasIndependientesDelEstudiante}</div>
                        
                        </div>
                        </Tooltip>
                        <div>
                            <div class="title">Practicas</div>
                            <Icon type="tool" />
                            <div class="value">{subjectData.horasPracticas}</div>
                        </div>
                    </div>
                    <div class="requisitos">
                        <div>
                            <div class="title"> Requisito de nivel</div>
                            <div class="value">{subjectData.requisitoNivel}</div>
                        </div>
                        <div>
                            <div class="title">Prerequisito</div>
                            <div class="value">
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
                            </div>
                        </div>
                        <div>
                            <div class="title">Corequisito</div>
                            <div class="value">
                                { requisitos.filter(requisito => requisito.tipo === 'Corequisito').map(corequisito => 
                                    <Popover
                                    content={`Nivel ${this.state.subjetBySniesCodeData.nivel}`}
                                    title={this.state.subjetBySniesCodeData.nombre}
                                    trigger="click"
                                    onVisibleChange={this.handleVisibleChangePopover}
                                    >
                                    <Tag onClick = {() => this.clickPrerequisito(corequisito.codigo, mattersStore)}>
                                        {corequisito.codigo}
                                    </Tag>
                                    </Popover>
                                )}
                            </div>
                        </div>
                    </div>
                    <div class="requisitos actions">
                        <div><Tooltip placement="top" title={"Agregar requisito"}><Button shape="circle" icon="plus" onClick = {() => this.showModalAddRequirement()}/></Tooltip></div>
                        {!(subjectData.requisitos && (subjectData.requisitos).length === 0) 
                        && <div><Tooltip placement="top" title={"Modificar requisito"}><Button shape="circle" icon="edit" onClick = {() => this.showModalUpdateRequirement()}/></Tooltip></div>
                        }
                        {!(subjectData.requisitos && (subjectData.requisitos).length === 0)
                        && <div><Tooltip placement="top" title={"Eliminar requisito"}><Button shape="circle" icon="delete" onClick = {() => this.showModalDeleteRequirement()}/></Tooltip></div>
                        }
                    </div>
                </div>
                <div class="actions">
                    <div>
                        <Tooltip placement="bottom" title={"Descripcion de cambios"}>
                            <Icon type="history" onClick = {() => this.showModalTimelineChangesFolder()}/>
                        </Tooltip>
                        <TimelineChangesFolder
                            wrappedComponentRef={this.timelineFormRef}
                            visible={this.state.visibleModalTimelineChangesControl}
                            onCancel={this.cancelModalTimelineChangesFolder}
                            onCreate={this.handleTimelineChangesFolder}
                            matterStore={mattersStore}
                            subjectData={subjectData}
                        />
                    </div>
                    <div>
                        <Tooltip placement="bottom" title={"Subir nuevo archivo"}>
                            <Icon type="cloud-upload" onClick = {() => this.showModalStepChangeControl()}/>
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
                    </div>

                    <div >
                        <Tooltip placement="bottom" title={"Visualizar Planes de Estudio"}>
                            <DriveViewer {...subjectData}/>
                        </Tooltip>
                    </div> 
                    <div >
                        <Tooltip placement="bottom" title={"Actualizar asignatura"}>
                            <Icon type="form" onClick = {() => this.showModalSubject()}/>
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
                    </div>
                    <div >
                        <Tooltip placement="bottom" title={"Eliminar asignatura"}>
                            <Popconfirm placement="top" title={"Estas segur@ que deseas eliminar esta asignatura"} onConfirm={() => this.deleteSubject(subjectData.codigo, mattersStore, programId, inp)} okText="Eliminar" cancelText="Cancelar">
                                <Icon type="delete"/>
                            </Popconfirm>
                        </Tooltip>
                    </div>
                </div>
                <span class="more">Ultima Modificación: {this.formatDate(subjectData.fechaDeModificacion ? subjectData.fechaDeModificacion : '')}</span>
            </div>
            </div>
            </div>

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
  