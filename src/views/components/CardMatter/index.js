import React, { Component } from "react";
import "antd/dist/antd.css";
import { Card, Popover } from "antd";
import './style.css';

const { Meta } = Card;

const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

class CardMatter extends Component {
    
    render = () => {
        
        return(
            <Card
                bodyStyle={{ background: this.props.componenteDeFormacion.color }}
                actions={[
                    <div>
                    <Popover placement="leftBottom" content={content} title="Title">
                        {this.props.componenteDeFormacion.codigo},
                    </Popover>
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
