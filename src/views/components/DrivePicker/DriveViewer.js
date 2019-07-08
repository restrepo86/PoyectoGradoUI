import React, {Component} from 'react';
import GooglePicker from 'react-google-picker';
import { Icon, Tooltip } from "antd";
import PickerConfig from '../../../credentials.json';

class DriveViewer extends Component{
  render(){
   return (
      <GooglePicker clientId={PickerConfig.clientId}
              developerKey={PickerConfig.googlePicker.developerKey}
              scope={[PickerConfig.googlePicker.scope]}
              onChange={data => console.log('on change:', data)}
              onAuthFailed={data => console.log('on auth failed:', data)}
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
                .setParent("1AbGF-53lDGsJKF0GmMUc_cN1TyL1URkn") //gFolderID returned from asignatura
                .setMode(listViewMode);
                
                const uploadView = new google.picker.DocsUploadView()
                .setIncludeFolders(true)
                .setParent("1AbGF-53lDGsJKF0GmMUc_cN1TyL1URkn") //gFolderId returned from asignatura

                const picker = new window.google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                    .addView(view)
                    .addView(uploadView)
                    .setOAuthToken(oauthToken)
                    .setDeveloperKey(PickerConfig.googlePicker.developerKey)
                    .setCallback((data)=>{
                      if (data.action === google.picker.Action.PICKED) {
                          var fileId = data.docs[0].id;
                          var fileUrl = data.docs[0].url;
                          window.open(fileUrl, '_blank');
                      }
                    });
                picker.build().setVisible(true);
            }}>
            <a>
                <Tooltip placement="top" title={"Planes de Asignatura"}>
                    <Icon type="file-word" style={{fontSize: '30px', color: '#43985d'}}/>
                </Tooltip>
            </a>
        </GooglePicker>
     );
   }
}

export default DriveViewer