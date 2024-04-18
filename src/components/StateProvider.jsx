'use client'
import React from 'react'
import { Provider } from "react-redux";
import { store } from "../app/store";

const StateProvider = ({children}) => {
  return (
    <Provider store={store}>{children}</Provider>
  )
}

export default StateProvider