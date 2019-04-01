import React from 'react';
import {
  Layout, Menu, Icon, Table
} from 'antd';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LogoUco from '../../../image/logo-uco.png';
import './style.css';
import ListComponent from '../../components/ListComponent';
import CardMatter from '../../components/CardMatter';
import RegisterProgram from '../../components/RegisterProgram';
import Progress from '../../components/Progress';

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

const createAsignatureCardsBySemesters = (asignaturas) => {
  return asignaturas
  .map((asignatura, index) => {
    const cardAsignatura = { key: index, name: asignatura.semestre };
    cardAsignatura[asignatura.keyIndex] = <CardMatter { ...asignatura } />;
    return cardAsignatura;
});
};

const semestres = [
  {
    asignaturas: [{
        nombreAsignatura: "ÁLGEBRA",
        codigoAsignatura: "ISM0111",
        formacionComplementaria: "CB",
        creditos: 4,
        horasTeoricas: "4",
        horasLaboratorio: "0",
        semestre: "1",
        keyIndex: 'semestre1'
    },
    {
      nombreAsignatura: "LÓGICA DE PROGRAMACIÓN",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "2",
      keyIndex: 'semestre2'
  }]
}, {
  asignaturas: [{
      nombreAsignatura: "MATEMÁTICAS",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "1",
      keyIndex: 'semestre1'
  },
  {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "2",
    keyIndex: 'semestre2'
}]
}]; 

const filterBySemestre = (asignaturaCard) => {
  console.log(asignaturaCard)
  const  asignatureObject = {};
  asignaturaCard.forEach(as => {
    const property = `semestre${as.name}`;
    asignatureObject[property] = as[property];
  }); 
  return asignatureObject;
};  

const dataSource = semestres
  .map(semestre => semestre.asignaturas)
  .map(createAsignatureCardsBySemesters)
  .map(filterBySemestre);

console.log(dataSource);


const columns = [{
  dataIndex: 'semestre1',
  title: 'Semestre 1',
  key: "1",
}, {
  dataIndex: 'semestre2',
  title: 'Semestre 2',
  key: "2",
},{
  dataIndex: 'semestre3',
  title: 'Semestre 3',
  key: "3",
}, {
  dataIndex: 'semestre4',
  title: 'Semestre 4',
  key: "4",
}, {
  dataIndex: 'semestre5',
  title: 'Semestre 5',
  key: "5",
}, {
  dataIndex: 'semestre6',
  title: 'Semestre 6',
  key: "6",
}, {
  dataIndex: 'semestre7',
  title: 'Semestre 7',
  key: "8",
}, {
  dataIndex: 'semestre8',
  title: 'Semestre 8',
  key: "8",
}, {
  dataIndex: 'semestre9',
  title: 'Semestre 9',
  key: "9",
}, {
  dataIndex: 'semestre10',
  title: 'Semestre 10',
  key: "10",
}];

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
    console.log(this.state);
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
                    <Route path="/main/programs/engineer/systems" component={(routeProps) => (                    
                      <Table dataSource={dataSource} columns={columns} />
                    )} />
                    <Route path="/main/programs/save/program" component={(routeProps) => (
                      <RegisterProgram {...routeProps} {...this.props} />
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
