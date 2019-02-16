import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import './style.css'

const { Meta } = Card;

var nombreAsignatura = "ÁLGEBRA";
var codigoAsignatura = "ISM0111";
var formacionComplementaria = "CB";
var creditos = 4;
var horasTeoricas = "4";
var horasLaboratorio = "0";


class CardMatter extends Component {

    render = () => {
        return(
            <Card
                style={{ width: 90, border: '1px solid black', margin: 'auto' }}
                actions={[
                    <h4>{formacionComplementaria}</h4>,
                    <h4>{creditos}</h4>,
                    <h4>{horasTeoricas}</h4>,
                    <h4>{horasLaboratorio}</h4>
                ]}
            >
                <Meta 
                    title={nombreAsignatura} 
                    description={codigoAsignatura} 
                />
            </Card>
        );
    }

}

export default CardMatter;