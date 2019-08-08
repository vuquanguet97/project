import React from 'react';
import Contact from "../../common/Contact/Contact";
import Button from '../../common/Button/Button';
import './Requested.css';

class Requested extends React.Component{
    render(){
        return(
            <div className={"requested"}>
                <div className={"contact1"}>
                    <Contact
                    avatarUrl={this.props.avatarUrl}
                    name={this.props.name} 
                    size={this.props.size}
                    textColor={this.props.textColor}
                    />
                </div>
                <div className={"btn1"}>
                    <Button
                        title={"Đã thêm"}
                        themeColor={"purple-primary"}
                        size={'add-button'}
                    />
                </div>
               
                    <Button
                        title={"Huỷ"}
                        themeColor={"grey-primary"}
                        size={'add-button'}  
                    />
            </div>
        )
    }
}
export default Requested;