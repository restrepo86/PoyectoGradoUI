import React from 'react';
import { Button, Form, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@observer
class DeleteProgramComponent extends React.Component {

    constructor(props) {
        super(props);
        this.programStore = this.props.stores.programs;
        this.programsData = this.programStore.programsData;
    };
    
    componentDidMount() {
        if (this.programsData == null) {
            window.location.href = "/";
        }
    };

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        
            if (!err) {
            
                this.programStore.deleteProgram(values.deleteProgramId);
 
            }
        });
    };

    render() {

        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;
        
        if (this.programStore.deleteSuccess) {
            return <Redirect to='/main/programs' />
        }
        return (
        <div>
            
            <Form onSubmit={this.handleSubmit} className="login-form">

                <Form.Item
                    label='Elija el programa que desea actualizar'
                    >
                    {getFieldDecorator('deleteProgramId', {
                        rules: [{ required: true, message: 'Por favor elija el programa que desea actualizar!' }],
                    })(
                        <Select>
                            {this.programsData == null ? [] : this.programsData.map(program => 
                                <Option value={program.programData.id}>{program.title}</Option>
                            )}
                        </Select>
                    )}
                </Form.Item>

                <Button 
                    type="primary"
                    htmlType="submit" 
                    className="login-form-button"
                    style={{ backgroundColor: '#026F35', color: '#fff' }}
                    onClick={() => this.handleSubmit}
                    >
                    Borrar Programa
                </Button>

                </Form>

        </div>
        );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(DeleteProgramComponent);

export default WrappedNormalLoginForm;