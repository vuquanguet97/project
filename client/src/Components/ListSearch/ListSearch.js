import React from 'react';
import PropTypes from 'prop-types';
import AddMember from './AddMember';
import './ListSearch.css';
import Button from '../../common/Button/Button';

class ListSearch extends React.Component {
    currentUser = localStorage.getItem("userID");

    static propTypes = {
        listSearch: PropTypes.array,
        keyword: PropTypes.string,
        onClickCloseModal: PropTypes.any,
    }

    render() {
        return (
            <div className={`modal-search`}>
                <div className={`list-search`}>
                    <div className={`card-header2`}>
                        <div className={`keyword`}>
                        <p>Kết quả tìm kiếm: {this.props.keyword}</p>
                        </div>
                        <div className={`card-cancel`}>
                            <Button
                                title={"X"}
                                themeColor={"blendModeButton"}
                                size={"circle-invisible"}
                                onClick={this.props.onClickCloseModal}
                            />
                        </div>
                    </div>
                    
                    <div className={`list-member scrollbar`}>
                        {this.props.listSearch && this.props.listSearch.map(user => {
                            if(this.currentUser === user._id){
                                return (
                                <div key={user._id}>
                                <AddMember
                                    avatarUrl={user.avatarUrl}
                                    size={'small-contact'}
                                    name={user.fullName}
                                    displayBtnAddFriend = {false}
                                />
                                </div>
                                );
                            } else{
                                return (
                                    <div key={user._id}>
                                    <AddMember
                                        avatarUrl={user.avatarUrl}
                                        size={'small-contact'}
                                        name={user.fullName}
                                        displayBtnAddFriend = {true}
                                    />
                                    </div>
                                    );
                            }
                        })}
                    </div>
                </div>
            </div>

        )
    }
}
export default ListSearch;