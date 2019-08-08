import React from 'react';
import Request from './Request';
import PropTypes from 'prop-types';
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './ListRequest.css';
import ContactType from '../../common/ContactType/ContactType';
import Button from '../../common/Button/Button';
import Requested from './Requested';

class ListRequest extends React.Component {
    static propTypes = {
        listRequest: PropTypes.array,
        listRequested: PropTypes.array,
    }

    render() {
        const showHideClassName = this.props.show ? "display-block" : "display-none";
        return (
            <div className={`modal ${showHideClassName}`}>
                <div className={`list-request`}>
                <Tabs>
                    <TabList>
                        <div className={`card1`}>
                        <Tab>
                            <div className={`tab`}>
                                <ContactType
                                    type="Yêu cầu kết bạn"
                                    available="0"
                                    textColor="black-text"
                                />
                            </div>
                        </Tab>
                        <Tab>
                            <div className={`tab`}>
                                <ContactType
                                    type="Đã gửi yêu cầu"
                                    available="0"
                                />
                            </div>
                        </Tab>
                        <div className={`card5`}>
                            <Button
                                 title={"X"}
                                 themeColor={"blendModeButton"}
                                 size={"circle-invisible"}
                                 onClick={this.props.toggleModal}
                            />
                        </div>
                        </div>
                    </TabList>
                    <TabPanel>
                        <div className={`card2 scrollbar`}>
                            {this.props.listRequest && this.props.listRequest.map(function (value, index) {
                                return <Request
                                    avatarUrl={value.avatarUrl}
                                    size={'small-contact'}
                                    name={value.name}
                                />
                            })}
                           </div>
                    </TabPanel>
                    <TabPanel>

                        <div className={`card2 scrollbar `}>
                            {this.props.listRequested && this.props.listRequested.map(function (value, index) {
                                return <Requested
                                    avatarUrl={value.avatarUrl}
                                    size={'small-contact'}
                                    name={value.name}
                                />
                            })}
                        </div>
                        </TabPanel>
                </Tabs>
                </div>
            </div>
        )
    }
}
export default ListRequest;
