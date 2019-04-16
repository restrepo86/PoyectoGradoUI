import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import './style.css';

const { Meta } = Card;

class CardMatter extends Component {

    getStyle = (tipoFormacion) => {
      return new Map([
        ['CBI', '#78909c'],
        ['FC', '#026F35'],
        ['IA', '#2196f3'],
        ['CB', '#f9a825'], 
        ['O', '#b71c1c']
      ]).get(tipoFormacion);
    }
    
    render = () => {
        return(
            <Card
                bodyStyle={{ background: this.getStyle('CBI') }}
                actions={[
                    <li>{this.props.formacionComplementaria}</li>,
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
