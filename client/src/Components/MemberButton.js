import React from 'react';
import Contact from '../common/Contact/Contact';
import Button from '../common/Button/Button';
import PropTypes from 'prop-types';
import './MemberButton.css';

class MemberButton extends React.Component{
    static propTypes={
        listAvatar: PropTypes.array,
        counter: PropTypes.string,
    }

    render(){
        return(
            <div className={`member-button`}>
                {this.props.listAvatar && this.props.listAvatar.slice(0, 3).map(function(value,index){
                    return <Contact
                        showName={false}
                        avatarUrl={value.avatarUrl}
                        size={'small-contact'}
                    />

                })
                }
                {
                    this.props.listAvatar.length > 3 && <Button
                            title={"+" + (this.props.listAvatar.length-3)}
                            size={'circle'}
                        />
                }



            </div>
        );
    }
}

export default MemberButton;
