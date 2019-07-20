import React from 'react';
import { observer } from 'mobx-react';
import { 
  Form, 
  Modal, 
  Select, 
} from 'antd';

@observer
class AddRequirementModal extends React.Component {
    
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
        destroyOnClose={'true'}
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
}
const AddRequirement = Form.create({ name: 'form_in_modal' })(AddRequirementModal);
export default AddRequirement;
  