import React, { useContext } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, LinearProgress } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import * as yup from 'yup'

import { userStore, uiStore } from '../stores'

const UserSchema = yup.object().shape({
  firstName: yup.string().required('enter your first name!'),
  lastName: yup.string().required('enter your last name!'),
  phone: yup.string().required('enter your phone!')
})

const UserModal = () => {
  const userSt = useContext(userStore)

  const uiSt = useContext(uiStore)

  const currentUser = userSt.editingUser

  const handleCancel = () => {
    userSt.setEditingUser(null)
    uiSt.toggleModal()
  }

  const handleSubmit = (values) => {
    uiSt.toggleModal()
    const updatedUser = {
      id: currentUser.id,
      picture: currentUser.picture,
      ...values
    }
    userSt.updateUser(updatedUser)
  }

  return (
    <Modal isOpen={uiSt.modalState} toggle={handleCancel} className='user-modal'>
      <ModalHeader toggle={handleCancel}>Edit user</ModalHeader>
      <ModalBody>
        {currentUser && <Formik
          initialValues={{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            phone: currentUser.phone
          }}
          validationSchema={UserSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            handleSubmit(values)
          }}
        >
          {({ submitForm, isSubmitting, values, errors }) => (
            <Form>
              <Field
                component={TextField}
                name='firstName'
                type='text'
                label='First Name'
              />
              <br />
              <Field
                component={TextField}
                name='lastName'
                type='text'
                label='Last Name'
              />
              <br />
              <Field
                component={TextField}
                name='phone'
                type='text'
                label='Phone'
              />
              <br /><br />
              {isSubmitting && <LinearProgress />}
              <br /><br />
              <Button
                variant='contained'
                color='primary'
                disabled={isSubmitting}
                onClick={submitForm}
              >
          Save
              </Button>
            </Form>
          )}
        </Formik>}
      </ModalBody>
      <ModalFooter>
        <Button color='secondary' onClick={handleCancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default UserModal
