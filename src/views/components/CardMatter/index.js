import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import './style.css';

const { Meta } = Card;

class CardMatter extends Component {

    render = () => {
        return(
            <Card
                actions={[
                    <h4>{this.props.formacionComplementaria}</h4>,
                    <h4>{this.props.creditos}</h4>,
                    <h4>{this.props.horasTeoricas}</h4>,
                    <h4>{this.props.horasLaboratorio}</h4>
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