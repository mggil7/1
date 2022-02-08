import React, { useState, useEffect } from "react";
import "./HomePage.css";


import { Storage, API, graphqlOperation } from "aws-amplify";
import { listGases, getGases } from "../graphql/queries";

import {
  OnCreateGases,
  OnUpdateGases,
  OnDeleteGases,
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

}

export default HomePage;