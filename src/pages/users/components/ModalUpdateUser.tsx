import { Button, Card, CardActions, CardContent, MenuItem, Modal, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { trpc } from '../../../utils/trpc'
// import { updateDoc } from '../../../services';

type Props = {
  open: Boolean,
  setOpen: Function,
  doc: any
}

export default function ModalUpdateUser({
  open,
  setOpen,
  doc,
}: Props) {
  const [updatedDoc, setUpdatedDoc] = useState(doc)

  // TRPC - UPDATE ONE
  const utils = trpc.useContext()
  const updateOne = trpc.users.updateOne.useMutation({
    onSettled() {      
      utils.users.getOneById.invalidate(doc.id)
      utils.users.getAll.invalidate()
      setOpen(false)
    },
  })


  function handleSave() {
    updateOne.mutate(updatedDoc)
  }
  function handleClose() {
    setUpdatedDoc(doc)
    setOpen(false)
  }


  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          pt: 3,
          px: 3,
          pb: 1,
        }}
      >
        <CardContent>
          <Stack gap={2}>
            <TextField
              autoFocus
              fullWidth
              label="First Name"
              value={updatedDoc.first_name}
              onChange={(e) => {setUpdatedDoc({...updatedDoc, first_name: e.target.value})}}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={updatedDoc.last_name}
              onChange={(e) => {setUpdatedDoc({...updatedDoc, last_name: e.target.value})}}
            />
            <TextField
              fullWidth
              label="Email"
              value={updatedDoc.email}
              onChange={(e) => {setUpdatedDoc({...updatedDoc, email: e.target.value})}}
            />
            <Select
              value={updatedDoc.gender}
              label="Gender"
              onChange={(e) => {setUpdatedDoc({...updatedDoc, gender: e.target.value})}}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </Stack>
        </CardContent>
        <CardActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </CardActions>
      </Card>
    </Modal>
  )
}
