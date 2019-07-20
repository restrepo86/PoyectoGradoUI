import React from 'react';
import { observer } from 'mobx-react';
import { 
  Form, 
  Input, 
  Modal,  
  Select, 
  InputNumber, 
  Tooltip, 
  Radio, 
  Row,
  Col,
} from 'antd';

@observer
class NewSubjectModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nivelData: 0,
            horasLaboratorio: 0,
            horasTeoricas: 0
        }
    };
    
    handleNivel = (value) => {
        this.setState({ nivelData: value })
    };

    changeHorasLaboratorio = (horasLaboratorio) => {
        this.setState({ horasLaboratorio: horasLaboratorio });
    };

    changeHorasTeoricas = (horasTeoricas) => {
        this.setState({ horasTeoricas: horasTeoricas });
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
                        <Col  span={6}>
                            <Form.Item label="Teóricas">
                                {getFieldDecorator('horasTeoricasAgregar', {
                                    rules: [{ required: true, message: 'Por favor ingrese las horas teóricas de la asignatura!' }],
                                    })(
                                    <InputNumber min={0} max={10} onChange={this.changeHorasTeoricas} /> 
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span={6}>
                            <Form.Item label="Laboratorio">
                                {getFieldDecorator('horasLaboratorioAgregar', {
                                rules: [{ required: true, message: 'Por favor ingrese las horas de laboratorio de la asignatura!' }],
                                })(<InputNumber min={0} max={10} onChange={this.changeHorasLaboratorio} />)}
                            </Form.Item>
                        </Col>
                        <Col  span={6}>
                            <Form.Item label="Prácticas">
                                {getFieldDecorator('horasPracticasAgregar', {
                                    rules: [{ required: false }],
                                })(
                                    <InputNumber min={0} max={10} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col  span={6}>
                            <Form.Item label="TIE">
                                {getFieldDecorator('tie', {
                                    initialValue: this.state.horasLaboratorio + this.state.horasTeoricas,
                                    rules: [{ required: false }],
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
                                    </Radio.Button>
                                )}
                            </Radio.Group>

                        )}
                    </Form.Item>

                </Form>
            </Modal>
        );
    }
}

const NewSubject = Form.create({ name: 'form_in_modal' })(NewSubjectModal);
export default NewSubject;
  