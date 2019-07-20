import React from 'react';
import { observer } from 'mobx-react';
import { 
  Form, 
  Modal, 
  Select, 
  } from 'antd';

@observer
class DeleteRequirementModal extends React.Component {

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
                destroyOnClose={'true'}
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
}

const DeleteRequirement = Form.create({ name: 'form_in_modal' })(DeleteRequirementModal);
export default DeleteRequirement;
  