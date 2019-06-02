import React from 'react';
import DropdownMenu from 'react-dd-menu';

class DropdownStrategy extends React.Component {
  constructor(props) {  
  super(props);
  // const strategies = props.strategies
  
  this.state = { 
      isMenuOpen: false, 
      buttonText: 'Select Bet Strategy', 
      isEnabled: false,
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
    // const check = (val) => {if (typeof val===undefined) {return false} return true}
    const menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close,
      toggle: <button className= 'button' onClick={this.toggle}>{this.state.buttonText}</button>,
      align: 'right',
    };

    // const strategies = ['home', 'visitor', 'overs', 'underdogs', 'unders', 'favorites', 'home_underdogs_ml', 'visitor_favorites_ml', 'visitor_underdogs_ml', 'visitor_underdogs_rl', 'home_favorites_ml', 'home_favorites_rl', 'longshot_teams_ml', 'longshot_teams_rl']
    const strategies = 
          [
            {strategy: 'home', name: 'Home Teams'},
            {strategy: 'visitor', name: 'Visiting Teams'},
            {strategy: 'overs', name: 'Game Overs'},
            {strategy: 'unders', name: 'Game Unders'},
            {strategy: 'underdogs', name: 'Underdogs'},
            {strategy: 'favorites', name: 'Favorites'},        
            {strategy: 'home_underdogs_ml', name: 'Home Underdogs'},
            {strategy: 'home_favorites_ml', name: 'Home Favorites'},
            {strategy: 'visitor_underdogs_ml', name: 'Visiting Underdogs'},
            {strategy: 'visitor_favorites_ml', name: 'Visiting Favorites'},
            {strategy: 'visitor_favorites_rl', name: 'Visiting Favorites'},
            {strategy: 'visitor_underdogs_rl', name: 'Visiting Underdogs'},
            {strategy: 'home_underdogs_rl', name: 'Home Underdogs'},
            {strategy: 'home_favorites_rl', name: 'Home Favorites'},
            {strategy: 'longshot_teams_ml', name: 'Longshots'},
            {strategy: 'longshot_teams_rl', name: 'Longshots'}]
    
    const createButtons = strategies.map((element, i) =>
      <li><button className='button' name="strategy" type="button" id={element.strategy} onClick={this.click}>{element.name}</button></li>
    )

    console.log(this.props.betType)
    
    return (
      <DropdownMenu {...menuOptions}>
        {createButtons}
      </DropdownMenu>
    );
  }
}

export default DropdownStrategy