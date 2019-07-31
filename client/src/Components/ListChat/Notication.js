import React from 'react';
import PropTypes from 'prop-types';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import image2 from '../../assets/request.png';
import Button from '../../common/Button/Button';
import './Notication.css';


class Notication extends React.Component{
    static proTypes={
        counter: PropTypes.number,
    }

    render(){
        return(
            <div >
                <NotificationBadge className="style2" count={this.props.counter} effect={Effect.SCALE}/>
                <Button
                    themeColor={"purple-header"}
                    imageUrl={image2}
                />
            </div>
        )
    }
}
export default Notication;
