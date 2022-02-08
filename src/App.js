
import React from 'react';
import { Router, Route } from "react-router-dom";
import './App.css';

import awsExports from "./aws-exports";

import {withAuthenticator} from '@aws-amplify/ui-react'

import { API } from 'aws-amplify'
import { useEffect, useState } from 'react';

import {createGases, deleteGases} from './graphql/mutations';

import { listGases } from './graphql/queries';

import Homepage from './components/Homepage';


function App() {

  const [gasesData, setGasesData] = useState([]);

  useEffect (() => {
      const fetchGases = async () => {
        const res = await API.graphql({
          query: listGases}) 

        return res.data.listGases.items
            }
        fetchGases().then(gases => setGasesData(gases))
        
        
  }, [])

  const handleSubmit = async (e) => {
   e.preventDefault()
    const {target} =e
      try{
          const {data} = await API.graphql({
              query:createGases,
              variables:{
                  input:{
                    deviceID: target.deviceID.value,
                    DATA:target.DATA.value,
                    He: target.He.value,
                    ARS: target.ARS.value,
                    N2: target.N2.value,
                    ARG: target.ARG.value,
                    wd: target.wd.value,
                    Ux: target.Ux.value,
                    vb1: target.vb1.value,
                    vb2: target.vb2.value,
                    vb3: target.vb3.value,
                    vb4: target.vb4.value
                  },
              },


      })

      setGasesData((currGasesList) => {
          return [...currGasesList, data.createGases ]
      })

    }catch(e){
      console.log(e);

    }

  }

  const handleGasesDelete = async (gasesId) => {
    const newGasesList = gasesData.filter(gases => gases.id !== gasesId)
      await API.graphql({
          query:deleteGases,
          variables:{
              input:{
                  id:gasesId

  }
}
})

setGasesData (newGasesList)

  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input placeholder ='enter  a deviceID' name='deviceID'/> 
            <input placeholder ='enter a DATA' name='DATA'/>
            <input placeholder ='enter Pressão Hélio' name='He'/>
            <input placeholder ='enter Pressão Ar Sintético' name='ARS'/>
            <input placeholder ='enter Pressão Nitrogênio' name='N2'/>
            <input placeholder ='enter Pressão Argônio' name='ARG'/>
            <input placeholder ='enter Dia da Semana' name='wd'/>
            <input placeholder ='enter Hora "Epoch"' name='Ux'/>
            <input placeholder ='enter Bateria Gás 1' name='vb1'/>
            <input placeholder ='enter Bateria Gás 2' name='vb2'/>
            <input placeholder ='enter Bateria Gás 3' name='vb3'/>
            <input placeholder ='enter Bateria Gás 4' name='vb4'/>
            <select name="He">
              <option value="none" disabled>
                Please select a pet
              </option>
              <option value='He'>He</option>
              <option value='ARS'>ARS</option>
              <option value='N2'>N2</option>
              <option value='ARG'>ARG</option>
            </select>
            <button>Create a new record</button>
        </form>
        <main>
          <ul> 
            {gasesData.map((gases) => (
              <li
                onClick = {(e) => {handleGasesDelete(gases.id)}}
                key={gases.id}
                style={{
                  listStyle: 'none',
                  border: '1px solid black',
                  margin: '10px',
                  width: '200px',
                }}
                >
                  <article>
                      <h3>{gases.deviceID}</h3>
                      <h5>{gases.DATA}</h5>
                      <p>{gases.He}</p>


                  </article>


              </li>
            )
            )
            }
            </ul>

            {Homepage} 
        </main>

       
     
    </div>


  )
}

export default withAuthenticator(App);

