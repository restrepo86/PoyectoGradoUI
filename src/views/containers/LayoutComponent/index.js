import React from 'react';
import {
  Layout, Menu, Icon
} from 'antd';
import { observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import LogoUco from '../../../image/logo-uco.png';
import './style.css';
import ProgramsComponent from '../../components/ProgramsComponent';
import CardMatter from '../../components/CardMatter';
import RegisterProgram from '../../components/RegisterProgram';
import Progress from '../../components/Progress';
import InpsComponent from '../../components/InpsComponent';
import DetailStudyPlan from '../../components/DetailStuyPlan';
import UpdateProgramComponent from '../../components/UpdateProgramComponent';
import DeleteMatterComponent from '../../components/DeleteMatterComponent';
import UpdateMatterForm from '../../components/UpdateMatterForm';
import TrainingComponents from '../../components/TrainingComponents';
import DeleteStudyPlanComponent from '../../components/DeleteStudyPlanComponent';

const {
  Header, Content, Footer, Sider,
} = Layout;

const style = {
  parentMenu : {
    background:'#026F35',
    color: 'white'
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
    this.loginStore.setValidateUserSuccess(false);
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  render() {

    return (
    
      <Layout style={{ minHeight: '100vh' }}>
        <Progress  { ...this.props.stores.programs.process.getData() } />
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme="light"
        >
          <img src={LogoUco} className="LogoUco" alt="LogoUco" />
          <Menu style={style.parentMenu} defaultSelectedKeys={[this.state.selectedMenuItem]} mode="inline">
            
            <Menu.Item key="programs">
              <Icon type="desktop" />
              <span><Link to="/main/programs">Programas</Link></span>
            </Menu.Item>

            <Menu.Item key="trainingComponents">
              <Icon type="desktop" />
              <span><Link to="/main/training/components">Componentes de Formación</Link></span>
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
                    <Route exact path="/main/programs/inps/studyplan/subject/delete" component={(routeProps) => (
                      <DeleteMatterComponent {...routeProps}{...this.props} />
                    )} />
                    <Route exact path="/main/programs/inps/delete" component={(routeProps) => (
                      <DeleteStudyPlanComponent {...routeProps}{...this.props} />
                    )} />
                    <Route exact path="/main/programs/inps/studyplan/subject/select/update" component={(routeProps) => (
                      <UpdateMatterForm {...routeProps}{...this.props} />
                    )} />
                    <Route exact path="/main/training/components" component={(routeProps) => (
                      <TrainingComponents {...routeProps}{...this.props}/>
                    )} />

              </div>
            </Content>
         
          <Footer style={{ textAlign: 'center' }}>
            Universidad Católica de Oriente
          </Footer>
        </Layout>
      </Layout>

    );
  }
}

export default LayoutComponent;
