import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
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
                console.log('values', values)
            
                const selectedMatter = this.studyPlan.studyPlanData.filter(studyPlan => studyPlan.inp === values.deleteInp)[0];
                console.log('selectedMatter', selectedMatter)
                this.studyPlan.deleteStudyPlanData(selectedMatter.programId, selectedMatter.inp);
 
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
                                <Option value={studyPlan.inp}>{studyPlan.inp}</Option>
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