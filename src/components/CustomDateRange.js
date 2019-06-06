import React from 'react';
import DropdownMenu from 'react-dd-menu';
import Calendar from './Calendar';

class CustomDateRange extends React.Component {
  constructor(props) {  
  super(props);
  this.state = { 
      isMenuOpen: false, 
      buttonText: 'Select Custom Date Range',
    }};

  toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  close = () => {
    this.setState({ isMenuOpen: false });
  };

  click = (event) => {
    this.props.onDropClick(event);
    this.setState({ 
        isMenuOpen: false,
        buttonText: event.target.innerText,
    });
  };

  render() {
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <button className= 'button' onClick={this.toggle}>{this.state.buttonText}</button>,
      align: 'right',
    };

    
    console.log(this.state)
    return (
      <DropdownMenu {...menuOptions}>
        <Calendar/>
      </DropdownMenu>
    );
  }
}

export default CustomDateRange