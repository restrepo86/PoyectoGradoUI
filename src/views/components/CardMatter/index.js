import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import './style.css';

const { Meta } = Card;

class CardMatter extends Component {
    
    render = () => {
        
        return(
            <Card
                bodyStyle={{ background: this.props.componenteDeFormacion.color }}
                actions={[
                    <div>
                    
                        {this.props.componenteDeFormacion.codigo},

                    </div>,
                    <div>{this.props.creditos}</div>,
                    <div>{this.props.horasTeoricas}</div>,
                    <div>{this.props.horasLaboratorio}</div>
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
