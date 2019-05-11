import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@observer
class UpdateMatterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.matters = this.props.stores.matters;
    };
    
    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        
            if (!err) {
                
                const selectedMatter = this.matters.mattersData.filter(matter => matter.codigo === values.updateMatterId);
                selectedMatter.map(matter => {
                    this.matters.setMatterUpdateSelected(matter);
                });
                
                this.matters.setMatterUpdateIsSelected(true);
            
            }
        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        
        if (this.matters.matterUpdateIsSelected) {
            return <Redirect to='/main/programs/inps/studyplan/subject/select/update' />
        }
        return (
        <div>
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item label="Seleccione la asignatura que desea actualizar">
                    {getFieldDecorator('updateMatterId', {
                        rules: [{ required: true, message: 'Por favor seleccione una asignatura!' }],
                    })(
                        <Select>
                            {this.matters.mattersData.map(matter => 
                                <Option value={matter.codigo}>{matter.nombre}</Option>
                            )}
                        </Select>
                    )}
                </Form.Item>
            
                <Button 
                    type="primary"
                    htmlType="submit" 
                    className="login-form-button"
                    style={{ backgroundColor: '#026F35', color: '#fff' }}
                    onClick={() => this.showModal}
                >
                    Actualizar
                </Button>

            </Form>

        </div>
        );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(UpdateMatterComponent);

export default WrappedNormalLoginForm;