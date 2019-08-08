import React, { Component } from "react";
import ReactDOM from "react-dom";
import './ModalGroup.css';
import Button from '../Button/Button';
import Contact from '../Contact/Contact';
import Input from '../Input/Input';
import icon from './add-member.png';
export default class ModalGroup extends React.Component {
  
  state = { show: false}

  showModal = () => {
    this.setState({ show: true });
  }
  
  hideModal = () => {
    this.setState({ show: false });
  }
  
  render() {
    return (
      <div>
      <button type="button" onClick={this.showModal}>Hiển thị thông tin</button>
      
        <Modal show={this.state.show} handleClose={this.hideModal} >
        
          <div className='thaydoi'>
          <div className='thaydoi6'>
            <div className='thaydoi1'>
            <Contact  
              size = 'medium-contact'
              avatarUrl = 'https://placekitten.com/g/64/64'
            />
            <div className='thaydoi5'>Đổi ảnh </div>
            </div>
            </div>
            <div className = 'thaydoi4'>
            <div className = 'thaydoi3'>
            <Input 
              placeholder = 'Tên nhóm'
              inputSize ='small-input'
            />
            </div>
          <div className='thaydoi2'>
            <Input
            placeholder ='Mô tả nhóm'
            inputSize = 'big-input'
          />
          </div>
          </div>
        </div>
        <div className = 'tong scrollbar1'>
        <div className = 'gioihan'>
          <Contact
            size = 'small-contact'
            name ='nguyen van a'
            avatarUrl = {icon}
          />
          <Contact
            name ='nguyen van a'
            avatarUrl = {icon}
            size = 'small-contact'
          />
          <Contact
            name ='nguyen van a'
            avatarUrl = {icon}
            size = 'small-contact'
          />
          <Contact
            name ='nguyen van a'
            avatarUrl = {icon}
            size = 'small-contact'
          />
          <Contact
            name ='nguyen van a'
            avatarUrl = {icon}
            size = 'small-contact'
          />
          <Contact
            name ='nguyen van a'
            avatarUrl = {icon}
            size = 'small-contact'
          />
        </div>
        </div>
          <div className ='themban2'>
          <div className='themban'>
            <Input 
              placeholder = 'Nhập tên bạn bè'
              inputSize = 'big-input'
              rightIcon = {icon}
            />
          </div>
          </div>
         <div >
            <div className={'fixbutton'}>
            <Button 
              size = 'mini'
              title ='LƯU'
              themeColor = 'purple-primary'
              />
            <Button 
              onClick = {this.hideModal}
              size = 'mini'
              title ='HỦY'
              themeColor = 'maroon-primary' />
            </div>
            </div>   
        </Modal>
        
      </div>
    )
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>  
        {children}
      </section>
    </div>
  );
};