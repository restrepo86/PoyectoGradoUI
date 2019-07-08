import React from 'react';
import { Button, Form, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@observer
class DeleteStudyPlanComponent extends React.Component {

    constructor(props) {
        super(props);
        this.studyPlan = this.props.stores.studyPlan;
    };
    
    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        
            if (!err) {
            
                const selectedStudyPlan = this.studyPlan.studyPlanData.filter(studyPlan => studyPlan.id === values.deleteInp)[0];
                this.studyPlan.deleteStudyPlanData(selectedStudyPlan.programId, selectedStudyPlan.id);
 
            }
        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        
        if (this.studyPlan.studyPlanDeleted) {
            return <Redirect to='/main/programs/inps' />
        }
        return (
        <div>
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item label="Seleccione el plan de estudio que desea eliminar">
                    {getFieldDecorator('deleteInp', {
                        rules: [{ required: true, message: 'Por favor seleccione una plan de estudio!' }],
                    })(
                        <Select>
                            {this.studyPlan.studyPlanData.map(studyPlan => 
                                <Option value={studyPlan.id}>{studyPlan.inp}</Option>
                            )}
                        </Select>
                    )}
                </Form.Item>
            
                <Button 
                    type="primary"
                    htmlType="submit" 
                    className="login-form-button"
                    style={{ backgroundColor: '#026F35', color: '#fff' }}
                >
                    Eliminar
                </Button>

            </Form>

        </div>
        );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(DeleteStudyPlanComponent);

export default WrappedNormalLoginForm;