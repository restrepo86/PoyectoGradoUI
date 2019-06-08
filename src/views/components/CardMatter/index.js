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
                    <li>
                    <Popover placement="leftBottom" content={content} title="Title">
                        {this.props.componenteDeFormacion.codigo},
                    </Popover>
                    </li>,
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
