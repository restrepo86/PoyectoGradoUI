import React, {Component} from 'react';
import GooglePicker from 'react-google-picker';
import { Icon, Tooltip } from "antd";
import PickerConfig from '../../../credentials.json';

class DriveUpload extends Component {


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
          createPicker={ (google, oauthToken) => {
            
            const uploadView = new google.picker.DocsUploadView()
            .setIncludeFolders(true)
            .setParent(this.props.gDriveFolderId)

            const picker = new window.google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                .addView(uploadView)
                .setOAuthToken(sessionStorage.getItem("GAuthorization"))
                .setDeveloperKey(PickerConfig.googlePicker.developerKey)
                .setCallback((data)=>{
                  console.log('responseGoogle', data)
                  if (data.action === google.picker.Action.PICKED) {
                      var fileUrl = data.docs[0].url;
                      if (data.docs[0].uploadState === 'success') {
                        this.props.setIsUploadFile(true);
                      }
                      window.open(fileUrl, '_blank');
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