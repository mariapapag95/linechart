import React from 'react';
import DropdownMenu from 'react-dd-menu';

class DropdownBetType extends React.Component {
  constructor(props) {  
  super(props);
  this.state = { 
      isMenuOpen: false, 
      buttonText: 'Select Bet Type',
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
        <li><button className='button' name="betType" type="button" id='ml' onClick={this.click}>Money Line</button></li>
        <li><button className='button' name="betType" type="button" id='rl' onClick={this.click}>Run Line</button></li>
        <li><button className='button' name="betType" type="button" id='ou' onClick={this.click}>Over/Under</button></li>
      </DropdownMenu>
    );
  }
}

export default DropdownBetType