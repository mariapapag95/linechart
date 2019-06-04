graph(array) {
    console.log("this is all x",this.state.allx)
    let y = this.state.ally.map((element, i) => {
      return element})
    const dataset = array.map((x, i) => 
        ({x:x, y: y[i]}));
    this.setState({dataset : dataset})
    console.log("im very confused",dataset)
  }

  graphDate(){
    this.setState({from: 1540612800, to: 1553745600})
    console.log("this.returnDateArray",this.returnDateArray())
    console.log(this.returnSplice(this.lastYear()))
    return this.returnSplice(this.lastYear())
    //let xArray = this.returnDateArray.map((element, i) => {
    //  console.log("hey this is element in graphDate()",element)
    //  if (this.state.from <= element && this.state.to >= element) {return element}
    //})
    //console.log(xArray)
  }

  lastYear(){
    let yearArray = []
    let today = new Date()
    today.setHours(0,0,0,0)
    console.log(today)
    let lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    lastYear.setHours(0,0,0,0)
    this.setState({from : lastYear, to: today})
    while (lastYear < today) {
      yearArray.push(new Date(lastYear))
      lastYear.setDate(lastYear.getDate() +1)
    }
    let unixArray = yearArray.map((element, i) => {
      return this.unixDate(element)})
    console.log(unixArray)
    console.log([unixArray[0], unixArray[unixArray.length -1]])
    this.setState({dateRange : [unixArray[0], unixArray[unixArray.length -1]]})
    console.log(this.state.dateRange)
  }

  lastSixMonths(){
    let halfYearArray = []
    let today = new Date()
    today.setHours(12,0,0,0)
    console.log("TODAY",today)
    let lastSixMonths = new Date(new Date().setMonth(new Date().getMonth() - 6))
    lastSixMonths.setHours(12,0,0,0)
    console.log("LAST MONTH",lastSixMonths)
    this.setState({from : this.unixDate(new Date(new Date().setMonth(new Date().getMonth() - 6)).setHours(12,0,0,0)), to: this.unixDate(new Date().setHours(12,0,0,0))})
    console.log("FROM",this.state.from)
    console.log("TO",this.state.to)
    while (lastSixMonths < today) {
      halfYearArray.push(new Date(lastSixMonths))
      lastSixMonths.setDate(lastSixMonths.getDate() +1)
    }
    let unixArray = halfYearArray.map((element, i) => {
      return this.unixDate(element)})
    console.log(unixArray)
    console.log(this.returnSplice(unixArray))
    return this.returnSplice(unixArray)
  }

  lastMonth(){
    let monthArray = []
    let today = new Date()
    today.setHours(0,0,0,0)
    console.log("TODAY",today)
    let lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
    lastMonth.setHours(0,0,0,0)
    console.log("LAST MONTH",lastMonth)
    this.setState({from : this.unixDate(new Date(new Date().setMonth(new Date().getMonth() - 1)).setHours(0,0,0,0)), to: this.unixDate(new Date().setHours(0,0,0,0))})
    console.log("FROM",this.state.from)
    console.log("TO",this.state.to)
    while (lastMonth < today) {
      monthArray.push(new Date(lastMonth))
      lastMonth.setDate(lastMonth.getDate() +1)
    }
    let unixArray = monthArray.map((element, i) => {
      return this.unixDate(element)})
    console.log(unixArray)
    return this.returnSplice(unixArray)
  }


  postBaseballApi() {
    // post request for 
        let post = {
          'start_date': this.state.from, 
          'end_date': this.state.to, 
          'bet_type':this.state.betType, 
          'strategy':this.state.strategy,
          'home':this.state.home, 
          'visitor':this.state.visitor, 
          'overs':this.state.overs, 
          'underdogs':this.state.underdogs, 
          'unders':this.state.unders, 
          'favorites':this.state.favorites, 
          'home_underdogs_ml':this.state.homeUnderdogsML, 
          'visitor_favorites_ml':this.state.visitorFavoritesML, 
          'visitor_underdogs_ml':this.state.visitorUnderdogsML, 
          'visitor_underdogs_rl':this.state.visitorUnderdogsRL, 
          'home_favorites_ml':this.state.homeFavoritesML, 
          'home_favorites_rl':this.state.homeFavoritesRL, 
          'longshot_teams_ml':this.state.longshotTeamsML, 
          'longshot_teams_rl':this.state.longshotTeamsRL,
          'bet_amount':this.state.betAmount,}
        fetch (API_URL, {
          headers:{"Content-Type" : "application/json"}, 
          body: JSON.stringify(post),
          mode:"cors",
          method:"post"
        })}
      

        lastMonth() {
            // sets state of to and from (start date and end date) to today and today -30 days
                let today = new Date()
                today.setHours(0,0,0,0)
                today = this.unixDate(today)
                let lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
                lastMonth.setHours(0,0,0,0)
                lastMonth = this.unixDate(lastMonth)
                this.setState({from : lastMonth, to: today})
                console.log("lastMonth() fired")
              }
            
              lastSixMonths() {
            // sets state of to and from (start date and end date) to today and today -30 days
                let today = new Date()
                today.setHours(0,0,0,0)
                today = this.unixDate(today)
                let lastSixMonths = new Date(new Date().setMonth(new Date().getMonth() - 6))
                lastSixMonths.setHours(0,0,0,0)
                console.log("last6 months no unix", lastSixMonths)
                lastSixMonths = this.unixDate(lastSixMonths)
                console.log("last6 months UNIX", lastSixMonths)
                this.setState({from : lastSixMonths, to: today})
                console.log("lastSixMonths() fired")
              }
            
              inRange(x) {
            // returns bool if value is in given range
                return x >= this.state.from && x <= this.state.to 
              }
            
              dateRange() {
                let range = this.state.dataset.x
                console.log(range)
                //let xMin = this.state.dataset.map((element, i) => {
                //  if (element.x >= this.state.from) {return element.x}})
                //console.log(xMin)
                //let xMax = xMin.map((element, i) => {
                //  if (element <= this.state.to) {return element}
                //})
                //console.log(xMax)
                //let y = baseballApi.map((element, i) => {
                  //return element.portfolio_value})
                //const dataset = x.map((x, i) => 
                  //({x:x, y: y[i]}));
                //console.log(x,y)
                //this.setState({dataset : dataset})
              }


              season2010() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1510 = 1268611200
                    let nov1510 = 1289779200
                    this.setState({from : march1510, to : nov1510})
                  }
                
                  season2011() {
                    // sets state of to and from (start date and end date) to today and today -365 days
                        let march1511 = 1300147200
                        let nov1511 = 1321315200
                        this.setState({from : march1511, to : nov1511})
                      }
                
                  season2012() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1512 = 1331769600
                    let nov1512 = 1352937600
                    this.setState({from : march1512, to : nov1512})
                  }
                
                  season2013() {
                    // sets state of to and from (start date and end date) to today and today -365 days
                        let march1513 = 1363305600
                        let nov1513 = 1384473600
                        this.setState({from : march1513, to : nov1513})
                      }
                
                  season2014() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1514 = 1394841600
                    let nov1514 = 1416009600
                    this.setState({from : march1514, to : nov1514})
                  }
                
                  season2015() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1515 = 1426377600
                    let nov1515 = 1447545600
                    this.setState({from : march1515, to : nov1515})
                  }
                
                  season2016() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1516 = 1458000000
                    let nov1516 = 1510704000
                    this.setState({from : march1516, to : nov1516})
                  }
                
                  season2017() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1517 = 1489536000
                    let nov1517 = 1510704000
                    this.setState({from : march1517, to : nov1517})
                  }
                
                  season2018() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1518 = 1521072000
                    let nov1518 = 1542240000
                    this.setState({from : march1518, to : nov1518})
                  }
                
                  season2019() {
                // sets state of to and from (start date and end date) to today and today -365 days
                    let march1519 = 1552608000
                    let nov1519 = 1573776000
                    this.setState({from : march1519, to : nov1519})
                  }

                  returnSplice(arrayX) {
                    // returns section of dataset which includes only the dates from the selected date range
                    // by spicing the original dataset 
                    // gets the start date, then the length of the array
                    // finds the index of the start date in the original dataset
                    // then splices the original dataset for that many items, starting at the correct index(start date)
                        let start = arrayX[0]
                        let games = arrayX.length
                        let index = this.state.allx.indexOf(start)
                        if (index > -1) {
                          let section = this.state.dataset.splice(index, games)
                          console.log("the section", section)
                          this.setState({dataset: section})
                          console.log("this.state.dataset", section)}
                        else {console.log("error try harder")}
                      }


              returnDateArray() {
// creates an array of dates based on the start and end date
// to be used for y axis data
// submit button should be disabled when start date and end date are blank
// otherwise, it throws an error
// NOTHING TO DEBUG
    let dateArray = []
    let end = this.state.to
    let start = this.state.from
    while (end >= start) {
      dateArray.push(new Date(start))
      start.setDate(start.getDate() + 1)
      }
    let unixArray = dateArray.map((element, i) => {
      return this.unixDate(element)})
    return unixArray
  }