import React from 'react';
import { Table, pagination } from 'antd';
import CardMatter from '../CardMatter';

const columnsNames = [{
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
  key: "7",
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
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "3",
      keyIndex: 'semestre3'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "4",
      keyIndex: 'semestre4'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "5",
      keyIndex: 'semestre5'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "6",
      keyIndex: 'semestre6'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "7",
      keyIndex: 'semestre7'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "8",
      keyIndex: 'semestre8'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "9",
      keyIndex: 'semestre9'
    }, {
      nombreAsignatura: "OOP",
      codigoAsignatura: "ISM0111",
      formacionComplementaria: "CB",
      creditos: 4,
      horasTeoricas: "4",
      horasLaboratorio: "0",
      semestre: "10",
      keyIndex: 'semestre10'
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
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "3",
    keyIndex: 'semestre3'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "4",
    keyIndex: 'semestre4'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "5",
    keyIndex: 'semestre5'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "6",
    keyIndex: 'semestre6'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "7",
    keyIndex: 'semestre7'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "8",
    keyIndex: 'semestre8'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "9",
    keyIndex: 'semestre9'
  }, {
    nombreAsignatura: "OOP",
    codigoAsignatura: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "10",
    keyIndex: 'semestre10'
  }]
}]; 

const createAsignatureCardsBySemesters = (asignaturas) => {
  return asignaturas
  .map((asignatura, index) => {
    const cardAsignatura = { key: index, name: asignatura.semestre };
    cardAsignatura[asignatura.keyIndex] = <CardMatter { ...asignatura } />;
    return cardAsignatura;
  });
};

const filterBySemestre = (asignaturaCard) => {

  const  asignatureObject = {};
  asignaturaCard.forEach(as => {
    const property = `semestre${as.name}`;
    asignatureObject[property] = as[property];
  }); 
  return asignatureObject;
};  

const mattersBySemester = semestres
  .map(semestre => semestre.asignaturas)
  .map(createAsignatureCardsBySemesters)
  .map(filterBySemestre);


class DetailStudyPlan extends React.Component {

  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
  }

  componentDidMount = () => {
    this.inpData = sessionStorage.getItem('inpData') ? JSON.parse(sessionStorage.getItem('inpData')) : [];
    this.matters.getMattersData(this.inpData.programid, this.inpData.inp);  
  }

  render = () => {  
    this.mattersData = sessionStorage.getItem('mattersData') ? JSON.parse(sessionStorage.getItem('mattersData')) : [];
    return (
      <div>

          <Table 
              columns={columnsNames} 
              dataSource={mattersBySemester} 
              scroll={{ x: 1300}}
              size="small"
              pagination={pagination}
          /> 
          
      </div>
    );
  }

}


export default DetailStudyPlan;