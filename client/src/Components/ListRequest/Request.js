import React from 'react';
import Contact from "../../common/Contact/Contact";
import Button from '../../common/Button/Button';
import './Request.css';

class Request extends React.Component{
    render(){
        const showHideClassName1 = this.props.show ? "display-none" : "display-block";
        return(
            <div className={showHideClassName1}>
            <div className={`request`}>
                <div className={`contact`}>
                    <Contact
                    avatarUrl={this.props.avatarUrl}
                    name={this.props.name} 
                    size={this.props.size}
                    textColor={this.props.textColor}
                    />
                </div>
                <div className={"btn1"}>
                    <Button
                        title={"Xác nhận"}
                        themeColor={"purple-primary"}
                        size={'add-button'}
                    />
                </div>
                
                <Button
                    title={"Từ chối"}
                    themeColor={"grey-primary"}
                    size={'add-button'}  
                />
            </div>
        </div>
        )
    }
}
export default Request;