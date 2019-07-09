import React from 'react';
import {
  Layout, Menu, Icon, Button
} from 'antd';
import { observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import LogoUco from '../../../image/logo-uco.png';
//import './index.css';
import ProgramsComponent from '../../components/ProgramsComponent';
import RegisterProgram from '../../components/RegisterProgram';
import Progress from '../../components/Progress';
import InpsComponent from '../../components/InpsComponent';
import DetailStudyPlan from '../../components/DetailStuyPlan';
import UpdateProgramComponent from '../../components/UpdateProgramComponent';
import TrainingComponents from '../../components/TrainingComponents';
import DeleteStudyPlanComponent from '../../components/DeleteStudyPlanComponent';
import DeleteProgramComponent from '../../components/DeleteProgramComponent';

const {
  Header, Content, Footer, Sider,
} = Layout;

const appStyle = {
  boxContainer : {
      border: '1px solid green',
      width: '90%',
      margin: 'auto',
  },
  titleContainer: {
      padding: '10px 5px 1px 15px',
      backgroundColor: '#026F35',
  },
  windowTitle: {
      fontSize: 18,
      color: '#FFF'
  }
}

@observer
class LayoutComponent extends React.Component {

  constructor(props) {
    super(props);
    this.props = this.props;
    this.loginStore = this.props.stores.loginStore;

    this.state = {
      collapsed: false,
      selectedMenuItem: '0',
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem( 'Authorization' ) == null) {
      window.location.href = '/';
    }; 
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  logOut = (loginStore) => {
    loginStore.setIsAuthenticated(false);
    sessionStorage.removeItem( 'Authorization');
    sessionStorage.removeItem( 'GAuthorization');
    window.location.href='/';
  };

  render() {

    return (


      <div style={appStyle.boxContainer}>
        <div style={appStyle.titleContainer}>
        
            <h1 style={appStyle.windowTitle}>
                Gestión Programas UCO                                                                                      <br/>
                <Button
                    onClick = { () => this.logOut(this.props.stores.loginStore) }
                >
                    Cerrar Sesión
                </Button>
            
            </h1>
            
        </div>

        <div>

          <Layout style={{ minHeight: '100vh' }}>
            <Progress  { ...this.props.stores.programs.process.getData() } />
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              theme="light"
            >
              <img src={LogoUco} className="LogoUco" alt="LogoUco" />
              <Menu theme={"light"} defaultSelectedKeys={[this.state.selectedMenuItem]} mode="inline">
                
                <Menu.Item key="programs">
                  <Icon type="book" theme="filled" />
                  <span>Programas</span>
                  <Link to="/main/programs">Programas</Link>
                </Menu.Item>

                <Menu.Item key="trainingComponents">
                  <Icon type="tag" theme="filled"/>
                  <span>Componentes de formacion</span>
                  <Link to="/main/training/components"></Link>
                </Menu.Item>

              </Menu>

            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }} />
          
                <Content style={{ margin: '16px 16px' }}>
                  <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                        <Route exact path="/main/programs" component={(routeProps) => (
                          <ProgramsComponent {...routeProps} {...this.props} />
                        )}/>
                        <Route exact path="/main/programs/save/program" component={(routeProps) => (
                          <RegisterProgram {...routeProps} {...this.props} />
                        )} />
                        <Route exact path="/main/programs/inps" component={(routeProps) => (
                          <InpsComponent {...routeProps} {...this.props} />
                        )} />
                        <Route exact path="/main/programs/inps/studyplan" component={(routeProps) => (
                          <DetailStudyPlan {...routeProps} {...this.props} />
                        )} />
                        <Route exact path="/main/programs/update/program" component={(routeProps) => (
                          <UpdateProgramComponent {...routeProps}{...this.props} />
                        )} />
                        <Route exact path="/main/programs/inps/delete" component={(routeProps) => (
                          <DeleteStudyPlanComponent {...routeProps}{...this.props} />
                        )} />
                        <Route exact path="/main/training/components" component={(routeProps) => (
                          <TrainingComponents {...routeProps}{...this.props}/>
                        )} />
                        <Route exact path="/main/programs/delete" component={(routeProps) => (
                          <DeleteProgramComponent {...routeProps}{...this.props}/>
                        )} />

                  </div>
                </Content>
            
              <Footer style={{ textAlign: 'center' }}>
                Universidad Católica de Oriente
              </Footer>
            </Layout>
          </Layout>

        </div>


      </div>
  
    );
  }
}

export default LayoutComponent;
