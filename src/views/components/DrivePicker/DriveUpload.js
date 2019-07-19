import React, { Component } from 'react';
import GooglePicker from 'react-google-picker';
import { Icon, Tooltip, message } from "antd";
import PickerConfig from '../../../credentials.json';
import DescripcionCambioDTO from '../../../dto/DescripcionCambioDTO';
import { observer } from 'mobx-react';

@observer
class DriveUpload extends Component {



  finish = async() => {

    if (this.props.stepChangeControlStore.isUploadFile && this.props.stepChangeControlStore.isDescription) {
      
      const descripcionCambioDTO = new DescripcionCambioDTO(this.props.stepChangeControlStore.description);
      await this.props.matterStore.addDescriptionBySubject(this.props.codigo, descripcionCambioDTO)
      this.props.stepChangeControlStore.setIsUploadFile(false);
      this.props.stepChangeControlStore.setCurrent(0);
      this.props.stepChangeControlStore.setDescription('');
      this.props.stepChangeControlStore.setIsUploadFile(false);
      this.props.stepChangeControlStore.setIsDescription(false);
      if (this.props.matterStore.addDescriptionResponse) {
        this.props.process.showMessage('Proceso terminado correctamente', 'success');  
      } else {
        this.props.process.showMessage('No se pudo conectar el servicio para subir archivo!', 'error');
      }
    } else {
      message.warning('Debe cargar un archivo para finalizar!');
    }
    
  };

  render() {
    return (
      
      <GooglePicker 
      
          clientId={PickerConfig.clientId}
          developerKey={PickerConfig.googlePicker.developerKey}
          scope={[PickerConfig.googlePicker.scope]}
          multiselect={true}
          navHidden={true}
          authImmediate={false}
          viewId={'DOCS'}
          mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
          createPicker={ (google) => {
            
            const uploadView = new google.picker.DocsUploadView()
            .setIncludeFolders(true)
            .setParent(this.props.gDriveFolderId)

            const picker = new window.google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                .addView(uploadView)
                .setOAuthToken(sessionStorage.getItem("GAuthorization"))
                .setDeveloperKey(PickerConfig.googlePicker.developerKey)
                .setCallback((data)=>{
                  
                  if (data.action === google.picker.Action.PICKED) {
                      var fileUrl = data.docs[0].url;
                      if (data.docs[0].uploadState === 'success') {
                        this.props.stepChangeControlStore.setIsUploadFile(true);
                        this.finish();
                      }
                      //window.open(fileUrl, '_blank');
                  }
                });
            picker.build().setVisible(true);
          }}
      >
        <a>
            <Tooltip placement="top" title={"Planes de Asignatura"}>
                <Icon type='folder-add' style={{fontSize: '60px', color: '#43985d'}}/>
            </Tooltip>
        </a>
      </GooglePicker>

     );
   }
}

export default DriveUpload