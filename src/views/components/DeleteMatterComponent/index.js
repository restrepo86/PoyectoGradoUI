import React from 'react';
import { Button, Form, Input, Select } from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

@observer
class DeleteMatterComponent extends React.Component {

  
  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
  };

  
  
  handleSubmit = (e) => {

    e.preventDefault();
    this.props.form.validateFields((err, values) => {
    console.log('values delete program', values);
    console.log(this.matters.mattersData)
    console.log(this.matters.mattersData.filter(matter => matter.codigo === values.deleteMatterId))

        
      if (!err) {
        const selectedMatter = this.matters.mattersData.filter(matter => matter.codigo === values.deleteMatterId)[0];
        console.log('selectedMatter', selectedMatter)
        this.matters.deleteMatterData('353454', selectedMatter.inp, selectedMatter.codigo);
      }
    });
  };

  render() {

    const { getFieldDecorator } = this.props.form;
    const Option = Select.Option;
    if (this.matters.deleteSuccess) {
      return <Redirect to='/main/programs/inps/studyplan' />
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <Form.Item
            label='Elija la asignatura que desea eliminar'
          >
            {getFieldDecorator('deleteMatterId', {
              rules: [{ required: true, message: 'Por favor elija la asignatura que desea eliminar!' }],
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
            onClick={() => this.handleSubmit}
          >
            Borrar Asignatura
          </Button>

        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(DeleteMatterComponent);

export default WrappedNormalLoginForm;