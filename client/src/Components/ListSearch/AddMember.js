import React from 'react';
import Contact from '../../common/Contact/Contact';
import Button from '../../common/Button/Button';
import './AddMember.css';

class AddMember extends React.Component{
    render(){
        return(
            <div className={"member"}>
                <div className={"contact"}>
                <Contact
                    avatarUrl={this.props.avatarUrl}
                    name={this.props.name} 
                    size={this.props.size}
                    textColor={this.props.textColor}
                    />
                </div>
                {
                    this.props.displayBtnAddFriend &&
                    <Button
                        title={"Thêm bạn"}
                        themeColor={"purple-primary"}
                        size={'add-button'}
                    />
                }
            </div>
        )
    }
}
export default AddMember;