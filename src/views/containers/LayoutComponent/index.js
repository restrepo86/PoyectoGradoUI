import React from 'react';
import {
  Layout, Menu, Icon,
} from 'antd';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import SuperDiv2 from '../../components/SuperDiv2';
import LogoUco from '../../../image/logo-uco.png';
import './style.css';
import GridCard from '../../components/GridCard';
import ListComponent from '../../components/ListComponent';
import GridGutter from '../../components/GridGutter';
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

class LayoutComponent extends React.Component {

  constructor(props) {
    super(props);

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

    window.location.href = routes.get(key);
  }

  updateSelectedItem() {
    const { pathname } = window.location;
    const items = new Map([
      ['/div2', '2'],
    ]);

    this.setState({ selectedMenuItem: items.get(pathname) });
  }

  render() {
    console.log(this.state);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme="light"
        >
          <img src={LogoUco} className="LogoUco" alt="LogoUco" />
          <Menu style={style.parentMenu} defaultSelectedKeys={[this.state.selectedMenuItem]} mode="inline">
            
            <Menu.Item key="programs" onClick={() => this.onSelectMenuItem('programs')}>
              <Icon type="desktop" />
              <span>Programas</span>
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
          <Content style={{ margin: '0 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

              <Switch>
                  <Route exact path="/main/programs" render={(routeProps) => (
                    <ListComponent />
                  )}/>
                  <Route path="/main/programs/engineer/system/study/plan" render={(routeProps) => (
                    <GridGutter />
                  )} />
                  <Route path="/main/programs/engineer/systems" render={(routeProps) => (
                    <GridCard />
                  )} />
              </Switch>
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
