import React from 'react';
import DropdownMenu from 'react-dd-menu';

class DropDownStrategy extends React.Component {

      constructor(props) {  
      super(props);
      this.state = { 
          isMenuOpen: false, 
          buttonText:'Select Strategy'
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
            <li><button className='button' name="strategy" type="button" id='home' onClick={this.click}>HomeTeams</button></li>
            <li><button className='button' name="strategy" type="button" id='visitor' onClick={this.click}>Visiting Teams</button></li>
            <li><button className='button' name="strategy" type="button" id='overs' onClick={this.click}>Game Overs</button></li>
            <li><button className='button' name="strategy" type="button" id='unders' onClick={this.click}>Game Unders</button></li>
            <li><button className='button' name="strategy" type="button" id='underdogs' onClick={this.click}>Underdogs</button></li>
            <li><button className='button' name="strategy" type="button" id='favorites' onClick={this.click}>Favorites</button></li>
            <li><button className='button' name="strategy" type="button" id='home_underdogs_ml' onClick={this.click}>Home Underdogs</button></li>
            <li><button className='button' name="strategy" type="button" id='home_favorites_ml' onClick={this.click}>Home Favorites</button></li>
            <li><button className='button' name="strategy" type="button" id='visitor_underdogs_ml' onClick={this.click}>Visiting Underdogs</button></li>
            <li><button className='button' name="strategy" type="button" id='visitor_favorites_ml' onClick={this.click}>Visiting Favorites</button></li>
            <li><button className='button' name="strategy" type="button" id='visitor_favorites_rl' onClick={this.click}>Visiting Favorites</button></li>
            <li><button className='button' name="strategy" type="button" id='visitor_underdogs_rl' onClick={this.click}>Visiting Underdogs</button></li>
            <li><button className='button' name="strategy" type="button" id='home_underdogs_rl' onClick={this.click}>Home Underdogs</button></li>
            <li><button className='button' name="strategy" type="button" id='home_favorites_rl' onClick={this.click}>Home Favorites</button></li>
            <li><button className='button' name="strategy" type="button" id='longshot_teams_ml' onClick={this.click}>Longshots</button></li>
            <li><button className='button' name="strategy" type="button" id='longshot_teams_rl' onClick={this.click}>Longshots</button></li>
          </DropdownMenu>
        );
      }
    }
export default DropDownStrategy