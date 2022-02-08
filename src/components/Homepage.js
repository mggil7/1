import React, { useState, useEffect } from "react";
import "./HomePage.css";


import { Storage, API, graphqlOperation } from "aws-amplify";
import { listGases, getGases } from "../graphql/queries";

import {
  newOnCreateGases,
  newOnUpdateGases,
  newOnDeleteGases,
} from "../graphql/subscriptions";

function HomePage() {

    const [gases, setGases]=useState();

    const getAllGasesToState = async () => {

        const result = await API.graphql(graphqlOperation(listGases));
        let gasesArray = await buildGasesArray(result.data.listGases.items);
        setGases(gasesArray);
    };

    useEffect(() => {
        getAllGasesToState();
    }, [gases]);

    
  let subscriptionOnCreate;
  let subscriptionOnDelete;
  let subscriptionOnUpdate;


  function setupSubscriptions() {
    subscriptionOnCreate = API.graphql(
      graphqlOperation(newOnCreateGases)
    ).subscribe({
      next: (gasesData) => {
        setGases(gasesData);
      },
    });

    subscriptionOnDelete = API.graphql(
      graphqlOperation(newOnDeleteGases)
    ).subscribe({
      next: (gasesData) => {
        setPicture(gasesData);
      },
    });

    subscriptionOnUpdate = API.graphql(
      graphqlOperation(newOnUpdateGases)
    ).subscribe({
      next: (gasesData) => {
        setPicture(gasesData);
      },
    });
  }

  useEffect(() => {
    setupSubscriptions();

    return () => {
      subscriptionOnCreate.unsubscribe();
      subscriptionOnDelete.unsubscribe();
      subscriptionOnUpdate.unsubscribe();
    };
  }, []);

  const buildGasesArray = async (listGases) => {
    return await getGasesList(listGases);
  };

  const getGasesList = async (gasesList) => {
    return Promise.all(
      gasesList.map(async (i) => {
        return getOneFormatedGases(i);
      })
    );
  };

  const getOneFormatedGases = async (gas) => {
    return {
      src: await Storage.get(gas.file.key),
      id: gas.id,
  
    };
  };

  return (
    <div className="HomePage">
        <div>
            <h1>HomePage Gases</h1>
         
        </div>
            <Gas gases = {gases}/>

    </div>
  );
}

export default HomePage;