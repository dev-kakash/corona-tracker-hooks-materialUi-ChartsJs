import React,{Component} from 'react'
import styles from './App.module.css';
import {fatchData} from './api'
import Cards from './components/Cards/Cards';
import Charts from './components/Charts/Charts';
import Country from './components/Country/Country';



class App extends Component {
  state = {
    data: {},
    country:'',
  }

  async componentDidMount() {
    const fatchedData = await fatchData();
    this.setState({data: fatchedData});
  }

  handleCountry = async (country) =>{
    const fatchedData = await fatchData(country);
    this.setState({data: fatchedData , country:country });
    console.log(country);
    console.log(fatchedData);

  }
 
  render(){
    const { data, country } = this.state;
  return (
    <div className={styles.container}>
      <div className={styles.details}>
      <img  className={styles.image}  src='/images/banner.png'/>
      </div>
     <Cards data={data}/>
    <div className={styles.details}>
    <Country  handleCountry={this.handleCountry}/>
     
    </div> 
    <div className={styles.details}><Charts data={data} country={country}/> </div>
    
    </div>

  );
}
}

export default App;
