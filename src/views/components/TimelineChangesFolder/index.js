import React from 'react';
import { observer } from 'mobx-react';
import { Modal, Form, Timeline, Button, Icon } from 'antd';
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
            visible, onCancel
        } = this.props;

        return (
        
            <Modal
                style={{ width: 1000 }}
                bodyStyle={{ width: 1000 }}
                width={1000}
                visible={visible}
                title="Descripción de cambios"
                onCancel={onCancel}
                destroyOnClose={true}
                footer={[<Button type="primary" onClick={onCancel}>Cerrar</Button>]}
            >
                <Timeline mode="alternate">
                    {
                        this.matterStore.descriptionsData.map((descripcionCambio, index) => 
                            <Timeline.Item key={index} dot={<Icon type="clock-circle-o"/>}> 
                                <h4 style={{color:'#43985d'}}>{descripcionCambio.fecha.substring(0, 10)} {descripcionCambio.fecha.substring(11, 19)}</h4>                                
                                { descripcionCambio.mensaje.split("*").map( (line, index) => 
                                    <p key={index} style={{marginBottom:'0em'}}>{line}</p>
                                )}
                            </Timeline.Item>
                        )
                    }
                </Timeline>

            </Modal>

        );

    }
}

const TimelineChangesFolderModal = Form.create({ name: 'form_in_modal' })(TimelineChangesFolder);

export default TimelineChangesFolderModal;