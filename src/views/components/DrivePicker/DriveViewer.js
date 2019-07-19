import React, {Component} from 'react';
import GooglePicker from 'react-google-picker';
import { Button, Tooltip } from "antd";
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

            const picker = new window.google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                .addView(view)
                .setOAuthToken(oauthToken)
                .setDeveloperKey(PickerConfig.googlePicker.developerKey)
                .setCallback((data)=>{
                  console.log('responseGoogle', data)
                  if (data.action === google.picker.Action.PICKED) {
                      var fileUrl = data.docs[0].url;
                      window.open(fileUrl, '_blank');
                  }
                });
            picker.build().setVisible(true);
          }}
      >
      <Tooltip placement="bottom" title={"Planes de Asignatura"}>
        <Button type="primary" shape="circle" icon="folder-open" size="large"></Button>
      </Tooltip>
      </GooglePicker>

     );
   }
}

export default DriveViewer