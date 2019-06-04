import React from 'react';
import DropdownMenu from 'react-dd-menu';

class DropdownStrategy extends React.Component {
  constructor(props) {  
  super(props);
  // const strategies = props.strategies
  
  this.state = { 
      isMenuOpen: false, 
      buttonText: 'Select Bet Strategy', 
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
      toggle: <button className='button' disabled={(this.props.betType === undefined) ? true:false} onClick={this.toggle}>{(this.props.display !== undefined) ? this.state.buttonText : 'Select Bet Strategy'}</button>,
      align: 'right',
    };

    const strategies = 
          [
            {strategy: 'home', name: 'Home Teams', types: ['ml', 'rl']},
            {strategy: 'visitor', name: 'Visiting Teams', types: ['ml', 'rl']},
            {strategy: 'overs', name: 'Game Overs', types: ['ou']},
            {strategy: 'unders', name: 'Game Unders', types: ['ou']},
            {strategy: 'underdogs', name: 'Underdogs', types: ['ml', 'rl', 'ou']},
            {strategy: 'favorites', name: 'Favorites', types: ['ml', 'rl', 'ou']},        
            {strategy: 'home_underdogs_ml', name: 'Home Underdogs', types: ['ml']},
            {strategy: 'home_favorites_ml', name: 'Home Favorites', types: ['ml']},
            {strategy: 'visitor_underdogs_ml', name: 'Visiting Underdogs', types: ['ml']},
            {strategy: 'visitor_favorites_ml', name: 'Visiting Favorites', types: ['ml']},
            {strategy: 'visitor_favorites_rl', name: 'Visiting Favorites', types: ['rl']},
            {strategy: 'visitor_underdogs_rl', name: 'Visiting Underdogs', types: ['rl']},
            {strategy: 'home_underdogs_rl', name: 'Home Underdogs', types: ['rl']},
            {strategy: 'home_favorites_rl', name: 'Home Favorites', types: ['rl']},
            {strategy: 'longshot_teams_ml', name: 'Longshots', types: ['ml']},
            {strategy: 'longshot_teams_rl', name: 'Longshots', types: ['rl']}]
    
    const createButtons = strategies.map((element, i) => {if (element.types.includes(this.props.betType)) return <div>
      <li><button className='button' name="strategy" type="button" id={element.strategy} onClick={this.click}>{element.name}</button></li>
      </div>
          return null})

    console.log(this.props.betType)
    
    return (
      <DropdownMenu {...menuOptions}>
        {createButtons}
      </DropdownMenu>
    );
  }
}

export default DropdownStrategy