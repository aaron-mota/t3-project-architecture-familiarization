import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { UsersList } from './components/UsersList'
import ModalCreateUser from './components/ModalCreateUser'

export default function Users() {
  const [createModalOpen, setCreateModalOpen] = useState(false)

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" sx={{mb: 2}}>
        <Typography variant="h4" component="h1">Users</Typography>
        <Stack justifyContent={"center"} alignItems="center">
          <Button
            variant="contained"
            onClick={() => setCreateModalOpen(true)}
          >
            Add User
          </Button>
        </Stack>
      </Stack>

      <UsersList />

      {createModalOpen && <ModalCreateUser open={createModalOpen} setOpen={setCreateModalOpen} />}
    </>
  )
}
