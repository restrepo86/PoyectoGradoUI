import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import './style.css';

const { Meta } = Card;

class CardMatter extends Component {

    getAdditionalInformation = (tipoFormacion) => {
      return new Map([
        ['Ciencia basica de Ingenieria', { color: '#78909c', nomenclatura: 'CBI' }],
        ['Formacion complementaria', { color: '#026F35', nomenclatura: 'FC' }],
        ['Ingenieria aplicada', { color: '#2196f3', nomenclatura: 'IA' }],
        ['Ciencia basica', { color: '#f9a825', nomenclatura: 'CB' }], 
        ['Optativa interdisciplinaria', { color: '#b71c1c', nomenclatura: 'O' }]
      ]).get(tipoFormacion);
    }

    
    render = () => {
        const additionalInformation = this.getAdditionalInformation(this.props.id);
        return(
            <Card
                bodyStyle={{ background: additionalInformation.color }}
                actions={[
                    <li>{additionalInformation.nomenclatura}</li>,
                    <li>{this.props.creditos}</li>,
                    <li>{this.props.horasTeoricas}</li>,
                    <li>{this.props.horasLaboratorio}</li>
                ]}
            >
                <Meta 
                    title={this.props.nombre} 
                    description={this.props.codigo}       
                />
            </Card>
        );
    }

}

export default CardMatter;
