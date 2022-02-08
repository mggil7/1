import React, { useState, useEffect } from "react";
import "./HomePage.css";


import { Storage, API, graphqlOperation } from "aws-amplify";
import { listGases, getGases } from "../graphql/queries";

import {
  OnCreateGases,
  OnUpdateGases,
  OnDeleteGases,
} from "../graphql/subscriptions";