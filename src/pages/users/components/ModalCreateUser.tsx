import { Button, Card, CardActions, CardContent, MenuItem, Modal, Select, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import { trpc } from '../../../utils/trpc'
// import { createDoc } from '../../../services';


type Props = {
  open: Boolean,
  setOpen: Function
}

export default function ModalCreateUser({
  open,
  setOpen,
}: Props) {

  const initialDoc = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "Male"
  }
  const [updatedDoc, setUpdatedDoc] = useState({...initialDoc})

  // TRPC - CREATE ONE
  const utils = trpc.useContext()
  const createOne = trpc.users.createOne.useMutation({
    onSettled() {      
      utils.users.getAll.invalidate(); // Sync with server once mutation has settled
      setOpen(false)
    },
  })


  function handleSave() {
    createOne.mutate(updatedDoc)
  }

  function handleClose() {
    setUpdatedDoc({...initialDoc})
    setOpen(false)
  }

  function keyPress(e: React.KeyboardEvent<HTMLDivElement>){
    if(e.key == "Enter"){
      handleSave()
    }
  }


  
  // CREATE DOC
  // useEffect(() => {
  //   if (createDocRequestCount === 0) {return}
  //   else {
  //     const controller = new AbortController()
  //     async function createSingle() {
  //       setIsCreating(true)
  //       console.log("GOT HERE")
  //       console.log(updatedDoc)
  //       try {
  //         const doc = await createDoc(updatedDoc, controller, true)
  //         setOpen(false)
  //       } catch(e) {
  //         console.log("There was a problem or the request was cancelled.", e)
  //       } finally {
  //         setIsCreating(false)
  //       }
  //     }
  //     createSingle()
  //     return () => {
  //       controller.abort()
  //     }
  //   }
  // }, [createDocRequestCount])


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
          <Stack
            gap={2}
            onKeyDown={(e) => keyPress(e)}
          >
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
