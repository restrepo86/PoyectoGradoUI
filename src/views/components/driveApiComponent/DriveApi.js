import React, {Component} from 'react';
import GooglePicker from 'react-google-picker';

class DriveApi extends Component{
  render(){
   return (
      <GooglePicker clientId={'522970314042-7e8o5tkbepbksj91knjdm7ailjosg3l3.apps.googleusercontent.com'}
              developerKey={'AIzaSyDw4u6zH5eaYRAr9f_EpEi8274BucRqmwU'}
              scope={['https://www.googleapis.com/auth/drive.file']}
              onChange={data => console.log('on change:', data)}
              onAuthFailed={data => console.log('on auth failed:', data)}
              multiselect={true}
              navHidden={true}
              authImmediate={false}
              viewId={'DOCS'}
              mimeTypes={['image/png', 'image/jpeg', 'image/jpg']}
              createPicker={ (google, oauthToken) => {
                const googleViewId = google.picker.ViewId.DOCS;
                const uploadView = new google.picker.DocsUploadView()
                .setIncludeFolders(true)
                //.setParent(true)

                const picker = new window.google.picker.PickerBuilder()
                .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
                  .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
                    .addView(uploadView)/*DocsUploadView added*/
                    .setOAuthToken(oauthToken)
                    .setDeveloperKey('AIzaSyDw4u6zH5eaYRAr9f_EpEi8274BucRqmwU')
                    .setCallback((data)=>{
                      if (data.action === google.picker.Action.PICKED) {
                          var fileId = data.docs[0].id;
                          alert('The user selected: ' + fileId);
                      }
                    });
                picker.build().setVisible(true);
            }}>
            <span>Click here</span>
            <div className="google"></div>
        </GooglePicker>
     );
   }
}

export default DriveApi