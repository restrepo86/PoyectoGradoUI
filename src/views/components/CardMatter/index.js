import React, { Component } from "react";
//import "antd/dist/antd.css";
import { Card, Divider, Tooltip } from "antd";
import './style.css';

const dividerStyle = {
    top: '0em',
    height: '2em'
}

class CardMatter extends Component {
    
    render = () => {
        
        return(
            <Card
            headStyle={{
                height:'auto',
                padding: '0px',
                textAlign: 'center',
                verticalAlign: 'middle'
            }}
            hoverable={true}
            title={
                <div style={{display:'flex'}}>
                    <div 
                    style={{   
                            flexGrow: '1', 
                            color:'#fff', 
                            backgroundColor:this.props.componenteDeFormacion.color,
                            fontWeight: 'bold'
                        }}><Tooltip placement="top" title={"Componente de formacion"}>{this.props.componenteDeFormacion.abreviatura}</Tooltip></div>
                    <div style={{flexGrow: '1'}}><Tooltip placement="top" title={"Creditos"}>{this.props.creditos}</Tooltip></div>
                    <Divider type="vertical" style={dividerStyle}/>
                    <div style={{flexGrow: '1'}}><Tooltip placement="top" title={"Horas teoricas"}>{this.props.horasTeoricas}</Tooltip></div>
                    <Divider type="vertical" style={dividerStyle}/>
                    <div style={{flexGrow: '1'}} ><Tooltip placement="top" title={"Horas laboratorio"}>{this.props.horasLaboratorio}</Tooltip></div>
                 </div>
                }
                actions={[
                    <div>{this.props.codigo}</div>
                ]}
                size="small"
            >
            <h1>{this.props.nombre}</h1>
            </Card>
        );
    }

}

export default CardMatter;
