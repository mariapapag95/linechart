import React from 'react';
//import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
import LineChart from './LineChart';
// import DropDownBetType from './DropDownBetType'
// import DropDownStrategy from './DropDownStrategy'
// import DropDownSeasons from './DropDownSeasons'
import ResultsTable from './ResultsTable'
// import { th } from 'date-fns/esm/locale';
// import { thisTypeAnnotation } from '@babel/types';
// import continuousColorLegend from 'react-vis/dist/legends/continuous-color-legend';
// import continuousSizeLegend from 'react-vis/dist/legends/continuous-size-legend';
// import CustomDateRange from './CustomDateRange';
// import StatsTable from './StatsTable';
import moment from 'moment';
import { withRouter } from 'react-router-dom'

const API_URL = "http://localhost:5000/portfolio"


class Results extends React.Component {
  constructor(props) {
    super(props);
    // vvvvvvvv these three lines cause error "cannot bind undefined"
    // this.handleDayClick = this.handleDayClick.bind(this);
    // this.handleResetClick = this.handleResetClick.bind(this);
    // this.handleDropDownClick = this.handleDropDownClick.bind(this);
    this.state = {
      dataset: []
      // strategy: undefined,
      // betType: undefined,
      // betAmount: undefined,
      // season: undefined,
      // calendar: false
}
  }

  notEmpty () {
    return this.state.from!==undefined & this.state.to!==undefined
  }

  handleChange = event => {
// used when user inputs bet amount 
    this.setState({
      [event.target.id]: event.target.value
    })
  }


  getBaseballApi() {
    // fetches api data and stores in this.state.allData
    // makes default dataset the full dataset 
        fetch (API_URL)
        .then(blob => blob.json()).then(json => {
          this.setState({dataset: json})
          console.log(this.state.dataset)
      })}
  
  componentDidMount() {
    this.getBaseballApi()
  }
      

  render() {
    
    const { dataset } = this.state;
    console.log(this.state.dataset)
    // let reData = dataset;
    // reData = this.reformatData(dataset)
    // console.log(reData)

    return (
      <div className='newest'>
        <h3>Overall Strategy Results</h3>
        {this.state.dataset && 
        <ResultsTable data={dataset}/>}
        {/* <LineChart 
        data = {reData} 
        strategyOne = {this.state.strategyOne} 
        strategyTwo = {this.state.strategyTwo}/> */}
        
        
      </div>
    );
  }
}

export default withRouter(Results);