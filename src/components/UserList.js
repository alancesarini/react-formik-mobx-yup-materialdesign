import React, { useEffect, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import { Grid, Typography, Button, IconButton } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'

import { userStore, uiStore } from '../stores'

import UserItem from './UserItem'

import UserModal from './UserModal'

import './UserList.css'

const UserList = observer(({ mapCenter }) => {
  const userSt = new useContext(userStore)

  const uiSt = new useContext(uiStore)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true)
      try {
        userSt.removeAll()
        const response = await fetch(`https://randomuser.me/api/?results=10&page=${userSt.pageNumber}`)
        const data = await response.json()
        data.results.forEach(user => {
          const u = {
            id: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            phone: user.phone,
            picture: user.picture.large
          }
          userSt.addUser(u)
        })
        setIsLoading(false)
      } catch (err) {
        console.log(err)
        return false
      }
    }

    getUsers()
  }, [userSt, userSt.pageNumber])

  const handleNext = () => {
    const currentPage = userSt.pageNumber
    userSt.setPage(currentPage + 1)
    console.log(userSt.pageNumber)
  }

  const handlePrev = () => {
    const currentPage = userSt.pageNumber
    userSt.setPage(currentPage - 1 > 0 ? currentPage - 1 : 1)
    console.log(userSt.pageNumber)
  }

  const skeleton = <div className='skeleton'><Skeleton variant='rect' height={120} width={210} />
    <Skeleton variant='text' width={150} height={30} style={{ marginTop: '5px' }} />
    <Skeleton variant='text' width={100} height={30} />
  </div>

  return (
    <>
      {<Typography component='h3' variant='h3' align='center'>page {userSt.pageNumber}</Typography>}

      <Grid container spacing={2} className='user-list'>
        {(isLoading ? Array.from(new Array(10)) : userSt.users).map(user => {
          return user ? <UserItem currentUser={user} /> : skeleton
        })}
      </Grid>

      {uiSt.modalState && <UserModal />}

      <IconButton onClick={handlePrev}>
        <NavigateBefore />
      </IconButton>
      <IconButton onClick={handleNext}>
        <NavigateNext />
      </IconButton>

    </>
  )
})

export default UserList
