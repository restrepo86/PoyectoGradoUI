import React, {Component} from 'react';
import GooglePicker from 'react-google-picker';
import { Icon, Tooltip } from "antd";
import PickerConfig from '../../../credentials.json';

class DriveViewer extends Component {


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
            const listViewMode = google.picker.DocsViewMode.LIST;
            const googleViewId = google.picker.ViewId.DOCUMENTS;
            const view = new google.picker.DocsView(googleViewId)
            .setIncludeFolders(true)
            .setMimeTypes('application/vnd.google-apps.folder')
            .setSelectFolderEnabled(true)
            .setParent(this.props.gDriveFolderId)
            .setMode(listViewMode);
            
            const uploadView = new google.picker.DocsUploadView()
            .setIncludeFolders(true)
            .setParent(this.props.gDriveFolderId)

            const picker = new window.google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                .addView(view)
                .addView(uploadView)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(PickerConfig.googlePicker.developerKey)
                .setCallback((data)=>{
                  if (data.action === google.picker.Action.PICKED) {
                      var fileUrl = data.docs[0].url;
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

export default DriveViewer