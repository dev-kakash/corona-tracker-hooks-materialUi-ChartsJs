import React,{useEffect,useState} from 'react'
import { NativeSelect,FormControl} from '@material-ui/core'
import styles from './Country.module.css';
import { fatchCountries } from '../../api'

const Country = ({handleCountry}) => {
    const [fetchedCountries,setFetchedCountries] = useState([]);
    useEffect(() => {
        const fetchC =  async () =>{
            setFetchedCountries(await fatchCountries());
        }
        fetchC();
    },[setFetchedCountries]);

    
    return (
        <div>
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue='' onChange={(e)=>{
                    handleCountry(e.target.value)
                }}>
                    <option value='global'>Global</option>
                    {fetchedCountries.map((country ,i) =><option key={i} value={country}>{country}</option>)}
                </NativeSelect>
            </FormControl>
        </div>
    )
}

export default Country
