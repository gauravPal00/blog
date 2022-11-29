
import React from 'react'
import { Grid } from '@mui/material'


// Components
import { Banner } from '../banner/Banner'
import { Categories } from './Categories'

export const Home = () => {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item lg={2} sm={2} xs={12}>
          <Categories />
        </Grid>
        <Grid container item lg={10} sm={10} xs={12} >
          Posts
        </Grid>
      </Grid>
    </>
  )
}
