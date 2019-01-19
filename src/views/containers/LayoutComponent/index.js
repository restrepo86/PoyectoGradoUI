import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import { Route } from 'react-router';
import { Switch } from 'react-router-dom';
import SuperDiv from '../../components/SuperDiv';
import SuperDiv2 from '../../components/SuperDiv2';
import LogoUco from '../../../image/logo-uco.png';
import './style.css';
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
            
            <Menu.Item key="2" onClick={() => this.onSelectMenuItem('2')}>
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="programsTitle"
              title={<span><Icon type="shop" /><span>Programas</span></span>}
            >
              <SubMenu
                key="programs" title={<span>Ingeniería de Sistemas</span>}
               >
                  <Menu.Item key="3">Tom</Menu.Item>
                  <Menu.Item key="4">Bill</Menu.Item>
                  <Menu.Item key="5">Alex</Menu.Item>
            

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
                  <Route exact path="/" render={(routeProps) => (
                    <SuperDiv />
                  )}/>
                <Route path="/div2" render={(routeProps) => (
                  <SuperDiv2 />
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
