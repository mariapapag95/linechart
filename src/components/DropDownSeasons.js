import React from 'react';
import DropdownMenu from 'react-dd-menu';

class DropDownSeasons extends React.Component {

      constructor(props) {  
      super(props);
      this.state = { 
          isMenuOpen: false, 
          buttonText: 'Select Season'
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
            <li><button className='button' name="season" type="button" id='2010' onClick={this.click}>2010</button></li>
            <li><button className='button' name="season" type="button" id='2011' onClick={this.click}>2011</button></li>
            <li><button className='button' name="season" type="button" id='2012' onClick={this.click}>2012</button></li>
            <li><button className='button' name="season" type="button" id='2013' onClick={this.click}>2013</button></li>
            <li><button className='button' name="season" type="button" id='2014' onClick={this.click}>2014</button></li>
            <li><button className='button' name="season" type="button" id='2015' onClick={this.click}>2015</button></li>
            <li><button className='button' name="season" type="button" id='2016' onClick={this.click}>2016</button></li>
            <li><button className='button' name="season" type="button" id='2017' onClick={this.click}>2017</button></li>
            <li><button className='button' name="season" type="button" id='2018' onClick={this.click}>2018</button></li>
            <li><button className='button' name="season" type="button" id='2019' onClick={this.click}>2019</button></li>
          </DropdownMenu>
        );
      }
    }
export default DropDownSeasons