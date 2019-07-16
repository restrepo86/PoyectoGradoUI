import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Timeline } from 'antd';
import "./index.css";

@observer
class TimelineChangesFolder extends React.Component {

    constructor(props) {
        super(props);
        this.matterStore = this.props.matterStore;
        this.subjectData = this.props.subjectData;
    }

    componentDidMount() {
        this.matterStore.getDescriptionsBySniesCode(this.subjectData.codigo);
    };

    componentWillMount() {
        this.matterStore.getDescriptionsBySniesCode(this.subjectData.codigo);
    };
  
    render() {

        const {
            visible, onCancel, onCreate
        } = this.props;

        return (
        
            <Modal
                style={{ width: 1000 }}
                bodyStyle={{ width: 1000 }}
                width={1000}
                visible={visible}
                title="Cambios en Planeador de Asignatura"
                okText="Aceptar"
                onCancel={onCancel}
                onOk={onCreate}
                destroyOnClose={true}
            >
                <Timeline mode="alternate">
                    {
                        this.matterStore.descriptionsData.map((descripcionCambio, index) => 
                            <Timeline.Item key={index}>{ descripcionCambio.mensaje } { descripcionCambio.fecha.substring(0, 10)}</Timeline.Item>
                        )
                    }
                </Timeline>

            </Modal>

        );

    }
}

const TimelineChangesFolderModal = Form.create({ name: 'form_in_modal' })(TimelineChangesFolder);

export default TimelineChangesFolderModal;