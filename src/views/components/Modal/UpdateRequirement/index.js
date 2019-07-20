import React from 'react';
import { observer } from 'mobx-react';
import { 
  Form, 
  Modal, 
  Select, 
  } from 'antd';

@observer
class UpdateRequirementModal extends React.Component {

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
        destroyOnClose={'true'}
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
}

const UpdateRequirement = Form.create({ name: 'form_in_modal' })(UpdateRequirementModal);
export default UpdateRequirement;
  