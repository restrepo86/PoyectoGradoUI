import React from 'react';
import {
  Layout, Menu, Icon, Table
} from 'antd';
import { observer } from 'mobx-react';
import { Route, Link } from 'react-router-dom';
import LogoUco from '../../../image/logo-uco.png';
import './style.css';
import ListComponent from '../../components/ListComponent';
import CardMatter from '../../components/CardMatter';
import RegisterProgram from '../../components/RegisterProgram';
import Progress from '../../components/Progress';
import InpsComponent from '../../components/InpsComponent';
import DetailStudyPlan from '../../components/DetailStuyPlan';

const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

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

    this.state = {
      collapsed: false,
      selectedMenuItem: '0',
    };
  }

  componentWillMount(){
    this.updateSelectedItem();
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  onSelectMenuItem(key) {
    const routes = new Map([
      ['2', '/div2'],
      ['programs', '/main/programs']
    ]);
  
    window.location = routes.get(key);
  }

  updateSelectedItem() {
    const { pathname } = window.location;
    const items = new Map([
      ['/div2', '2'],
    ]);

    this.setState({ selectedMenuItem: items.get(pathname) });
  }

  render() {

    return (
    
      <Layout style={{ minHeight: '100vh' }}>
        <Progress  { ...this.props.stores.filter.process.getData() } />
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
            <SubMenu
              key="programsTitle"
              title={<span><Icon type="shop" /><span>Programas</span></span>}
            >
              <SubMenu
                key="systemsEngineer" title={<span>Ingeniería de Sistemas</span>}
               >
                  <SubMenu
                    key="inps" title={<span>INP's</span>} 
                  >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
            

                  </SubMenu>

               </SubMenu>
             </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>

        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
       
            <Content style={{ margin: '16px 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                    <Route exact path="/main/programs" component={(routeProps) => (
                      <ListComponent {...routeProps} {...this.props} />
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

              </div>
            </Content>
         
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>

    );
  }
}

export default LayoutComponent;
