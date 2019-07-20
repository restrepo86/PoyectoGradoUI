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
                    <Tooltip placement="top" title={"Componente de formacion"}>
                        <div 
                            style={{   
                                flexGrow: '1', 
                                color:'#fff', 
                                backgroundColor:this.props.componenteDeFormacion.color,
                                fontWeight: 'bold'
                            }}>
                            {this.props.componenteDeFormacion.abreviatura}
                        </div>
                    </Tooltip>
                    <Tooltip placement="top" title={"Creditos"}><div style={{flexGrow: '1'}}>{this.props.creditos}</div></Tooltip>
                    <Divider type="vertical" style={dividerStyle}/>
                    <Tooltip placement="top" title={"Horas teoricas"}><div style={{flexGrow: '1'}}>{this.props.horasTeoricas}</div></Tooltip>
                    <Divider type="vertical" style={dividerStyle}/>
                    <Tooltip placement="top" title={"Horas laboratorio"}><div style={{flexGrow: '1'}} >{this.props.horasLaboratorio}</div></Tooltip>
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
