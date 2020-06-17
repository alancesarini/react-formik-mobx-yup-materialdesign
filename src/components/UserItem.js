import React, { useContext, useState } from 'react'

import { Card, CardActionArea, CardContent, CardActions, CardMedia, Button, Fade, Grid, Typography, IconButton } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'

import EditIcon from '@material-ui/icons/Edit'

import { userStore, uiStore } from '../stores'

import './UserItem.css'

const UserItem = ({ currentUser }) => {
  const [deleted, setDeleted] = useState(false)

  const userSt = new useContext(userStore)

  const uiSt = new useContext(uiStore)

  const deleteUser = () => {
    setDeleted(true)

    // Allow some time for the fade out transition to play
    setTimeout(() => userSt.deleteUser(currentUser.id), 300)
  }

  const handleShowModal = () => {
    uiSt.toggleModal()
    userSt.setEditingUser(currentUser)
  }

  return (
    <Grid item lg={2} md={4} sm={6} xs={12} key={currentUser.id}>
      <Fade in={!deleted} timeout={500}>
        <Card className='user'>
          <CardMedia className='user-pic' image={currentUser.picture} title={`${currentUser.firstName} ${currentUser.lastName}`} />
          <CardContent>
            <Typography component='p' className='text'>
              <strong>Name: </strong>{`${currentUser.firstName} ${currentUser.lastName}`}
            </Typography>
            <Typography component='p' className='text'>
              <strong>Phone: </strong>{currentUser.phone}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton onClick={handleShowModal}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Fade>
    </Grid>
  )
}

export default UserItem
