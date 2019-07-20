import React from 'react';
import { observer } from 'mobx-react';
import AddRequirementDTO from '../../../../dto/AddRequirementDTO';
import UpdateRequirementDTO from '../../../../dto/UpdateRequirementDTO';
import { 
  Form, 
  Input, 
  Modal, 
  Button, 
  Select, 
  InputNumber, 
  Popconfirm,
  Tooltip, 
  Radio, 
  Row,
  Col,
} from 'antd';

@observer
class SubjectDetailModal extends React.Component {

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
        subjetBySniesCodeData: {},
        nivelData: ''
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

    handleNivel = (value) => {
        this.setState({ nivelData: value })
    };

    inicializarNivelData = (nivelActualAsignatura) => {
        return this.state.nivelData === '' ? nivelActualAsignatura : this.state.nivelData;
    };

    render() {

        const {
            visibleSubject, 
            onCancel, 
            onCreateSubjectUpdate, 
            form, 
            nameSubject, 
            subjectData, 
            trainingComponentsData
        } = this.props;

        const { getFieldDecorator } = form;
        const Option = Select.Option;
        const trainingComponentSubject = { ...subjectData.componenteDeFormacion };
        const requisitosDeNivel = ['Nivel 1', 'Nivel 2', 'Nivel 3', 'Nivel 4', 'Nivel 5', 'Nivel 6', 'Nivel 7', 'Nivel 8', 'Nivel 9'];
        const nivelData = this.inicializarNivelData(subjectData.nivel);
        
        return (

            <Modal
                visible={visibleSubject}
                title={nameSubject}
                centered
                width={700}
                onCancel={onCancel}
                destroyOnClose={'true'}
                footer={[
                    <Button type="primary" onClick={onCancel}>Cancelar</Button>,
                    <Popconfirm placement="top" title={"Estas segur@ que deseas actualizar esta asignatura"} onConfirm={onCreateSubjectUpdate} okText="Si" cancelText="No">
                    <Button>Actualizar</Button>
                    </Popconfirm>
                ]}
            >

                <Form layout="vertical">
                    <Row>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <Form.Item label="Código">
                                {getFieldDecorator('codigo', {
                                    initialValue: subjectData.codigo,
                                    rules: [{ required: true, message: 'Por favor ingrese el codigo de la asignatura!' }],
                                })(
                                    <Input disabled={"true"}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <Form.Item label="Nombre">
                                {getFieldDecorator('nombre', {
                                    initialValue: subjectData.nombre,
                                    rules: [{ required: true, message: 'Por favor ingrese el nombre de la asignatura!' }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <Form.Item label="Créditos">
                                {getFieldDecorator('creditos', {
                                    initialValue: subjectData.creditos,
                                    rules: [{ required: true, message: 'Por favor ingrese los créditos de la asignatura!' }],
                                })(
                                    <InputNumber min={1} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <Form.Item label="Nivel">
                                {getFieldDecorator('nivel', {
                                    initialValue: subjectData.nivel,
                                    rules: [{ required: true, message: 'Por favor ingrese el nivel al que pertenece la asignatura!' }],
                                })(
                                    <InputNumber onChange={this.handleNivel} min={1} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }} lg={{ span: 14, offset: 2 }}>
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
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }} lg={{ span: 14, offset: 2 }}>
                            <Form.Item label="Requisito de nivel">
                                {getFieldDecorator('requisitoNivel', {
                                    initialValue: subjectData.requisitoNivel,
                                })(
                                    <Select style={{width:120}}>
                                    <Option key={0} value={"No"}>No</Option>
                                    { 
                                        requisitosDeNivel.filter(requisito => requisito.substring(6, 7) < nivelData).map((requisito, index) =>
                                        <Option key={index+1} value={requisito}>{requisito}</Option>
                                    )}
                                    </Select>
                                )}
                            </Form.Item>  
                        </Col>

                    </Row>        

                    <Row centered>
                        <Col  xs={{ span: 6, offset: 1 }}>
                            <Form.Item label="Horas Teóricas">
                                {getFieldDecorator('horasTeoricas', {
                                    initialValue: subjectData.horasTeoricas,
                                    rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
                                })(
                                    <InputNumber min={0} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span = {6}>
                            <Form.Item label="Horas Laboratorio">
                                {getFieldDecorator('horasLaboratorio', {
                                    initialValue: subjectData.horasLaboratorio,
                                    rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
                                })(
                                    <InputNumber min={0} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span = {6}>
                            <Form.Item label="Horas Prácticas">
                                {getFieldDecorator('horasPracticas', {
                                    initialValue: subjectData.horasPracticas,
                                    rules: [{ required: false }],
                                })(
                                    <InputNumber min={0} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span = {4}>
                            <Form.Item label="TIE">
                                {getFieldDecorator('tie', {
                                    initialValue: subjectData.horasIndependientesDelEstudiante,
                                    rules: [{ required: false }],
                                })(
                                    <InputNumber min={0} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

const SubjectDetail = Form.create({ name: 'form_in_modal' })(SubjectDetailModal);
export default SubjectDetail;
  