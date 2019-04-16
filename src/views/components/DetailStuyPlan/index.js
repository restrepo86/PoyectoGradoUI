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
}, {
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


const datosAsignaturas = [

  {
    nombre: "ÁLGEBRA",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "1",
    keyIndex: 'semestre1'
  }, {
    nombre: "LÓGICA DE PROGRAMACIÓN",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "2",
    keyIndex: 'semestre2'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "3",
    keyIndex: 'semestre3'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "1",
    keyIndex: 'semestre1'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "1",
    keyIndex: 'semestre1'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "6",
    keyIndex: 'semestre6'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "7",
    keyIndex: 'semestre7'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "8",
    keyIndex: 'semestre8'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "9",
    keyIndex: 'semestre9'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "10",
    keyIndex: 'semestre10'
  }, {
    nombre: "MATEMÁTICAS",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "1",
    keyIndex: 'semestre1'
  },
  {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "2",
    keyIndex: 'semestre2'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "3",
    keyIndex: 'semestre3'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "4",
    keyIndex: 'semestre4'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "5",
    keyIndex: 'semestre5'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "6",
    keyIndex: 'semestre6'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "7",
    keyIndex: 'semestre7'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "8",
    keyIndex: 'semestre8'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "9",
    keyIndex: 'semestre9'
  }, {
    nombre: "OOP",
    codigo: "ISM0111",
    formacionComplementaria: "CB",
    creditos: 4,
    horasTeoricas: "4",
    horasLaboratorio: "0",
    semestre: "10",
    keyIndex: 'semestre10'
  }
]


class DetailStudyPlan extends React.Component {

  constructor(props) {
    super(props);
    this.matters = this.props.stores.matters;
  }

  componentDidMount = () => {
    this.inpData = sessionStorage.getItem('inpData') ? JSON.parse(sessionStorage.getItem('inpData')) : [];
    this.matters.getMattersData(this.inpData.programid, this.inpData.inp);
    
  }

  createAsignatureCardsBySemesters = (asignatura) => {

    return asignatura
      .map(asignatura => ({ ...asignatura, keyIndex: `semestre${asignatura.semestre}` }))
      .map((asignatura, index) => {
        const cardAsignatura = { key: index, name: asignatura.semestre };
        cardAsignatura[asignatura.keyIndex] = <CardMatter {...asignatura} />;
        return cardAsignatura;
      });
  };

  filterBySemestre = (asignaturaCard) => {

    const asignatureObject = {};
    const property = `semestre${asignaturaCard.name}`;
    asignatureObject[property] = asignaturaCard[property];

    return asignatureObject;
  };

  groupBySemester = (datosAsignaturas, semesterNumber) => {
    return datosAsignaturas.filter(asignatura => asignatura[`semestre${semesterNumber}`]);
  };

  buildSemesters = (semesterNumber, semester, semesterOrdered, totalSemester) => {
    for (let idx = 0; idx < totalSemester; idx++) {
      if (semester[idx] && semesterOrdered[idx]) {
        semesterOrdered[idx][`semestre${semesterNumber}`] = semester[idx][`semestre${semesterNumber}`];
      }
    }
    return semesterOrdered;
  };

  orderBySemester = (datosAsignaturas) => {
    const totalSemester = 10;
    const semesterOrdered = [];
    for (let idx = 1; idx <= totalSemester; idx++) {
      const semester = this.groupBySemester(datosAsignaturas, idx);
      if (semester) {
        semesterOrdered[idx - 1] = {};
        this.buildSemesters(idx, semester, semesterOrdered, totalSemester);
      }
    }
    return semesterOrdered.filter(semesterData => Object.keys(semesterData).length > 0);
    
  };

  mattersBySemester = (datosAsignaturas) => {

    const matersCard = this.createAsignatureCardsBySemesters(datosAsignaturas)
    const asigantureObject = matersCard.map(asignatureCard => this.filterBySemestre(asignatureCard));
    return this.orderBySemester(asigantureObject);
  };

  render = () => {
    
    const datasource = sessionStorage.getItem('mattersData') ? JSON.parse(sessionStorage.getItem('mattersData')) : [];
    
    return (
      <div>

        <Table
          columns={columnsNames}
          dataSource={this.mattersBySemester(datasource)}
          scroll={{ x: 1300 }}
          size="small"
          pagination={pagination}
        />

      </div>
    );
  }

}


export default DetailStudyPlan;