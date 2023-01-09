import React from 'react'
import { useEffect, useState } from "react";
// import { useParams, useNavigate } from 'react-router-dom'
import { Button, Stack, Typography } from "@mui/material";
import { colors } from "../../utils/constants";
// import { getDoc, deleteDoc } from '../../services';
import ModalUpdateUser from './components/ModalUpdateUser';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

import { User as UserType } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';



export default function User() {
  const router = useRouter()
  const { id }: { id?: string } = router.query

  // TRPC - GET ONE (BY ID)
  const { data: doc, isLoading, isFetching, isError } = trpc.users.getOneById.useQuery(id as string)


  // TRPC - DELETE ONE
  const utils = trpc.useContext()
  const deleteOne = trpc.users.deleteOne.useMutation({
    async onMutate(deletedDocId) {
      console.log("deletedDocId", deletedDocId)
      await utils.users.getAll.cancel(); // Cancel outgoing fetches (so they don't overwrite our optimistic update)      
      const prevData = utils.users.getAll.getData(); // Get the data from the queryCache
      utils.users.getAll.setData(undefined, (old) => old?.filter(o => o.id !== deletedDocId)); // Optimistically update the data with our new Todo
      return { prevData }; // Return the previous data so we can revert if something goes wrong
    },
    onError(err, deletedDocId, ctx) {
      utils.users.getAll.setData(undefined, ctx!.prevData); // If the mutation fails, use the context-value from onMutate
    },
    onSettled() {      
      utils.users.getAll.invalidate(); // Sync with server once mutation has settled
      router.back()
    },
  })
  // SET STALETIME FOR ROUTE/PROCEDURE (locate this somewhere more centrally?)
  const queryClient = useQueryClient()
  const docKey = trpc.users.getOneById.getQueryKey(id!)
  queryClient.setQueryDefaults(docKey, { staleTime: 30 * 60 * 1000 })


  const [updateModalOpen, setUpdateModalOpen] = useState(false)



  function handleDelete() {
    const confirmation = confirm("Are you sure you want to delete this?")
    if (confirmation) {
      deleteOne.mutate(id as string)
    }
  }


  return (
    <>
      <div>
        <Button
          onClick={() => router.back()}
        >
          &lt; Back
        </Button>
      </div>

      {(!isFetching && !doc?.first_name) ? "User not found.  Please try again." : 
        <>
          <Stack direction="row" gap={2} alignItems="center" sx={{mb: 2}}>
            <Typography variant="h4" component="h1">{doc?.first_name} {doc?.last_name}</Typography>
            <Stack direction="row" gap={2}>
              <Button variant="contained" onClick={() => setUpdateModalOpen(true)}>Edit</Button>
              <Button variant="contained" onClick={handleDelete}>Delete</Button>
            </Stack>
          </Stack>

          <Stack
            sx={{
              backgroundColor: doc?.gender === "Female" ? colors.pink : colors.blue,
              borderRadius: 4,
              px: 2,
              py: 2
            }}
          >
            <Typography>{doc?.first_name} {doc?.last_name}</Typography>
            <Typography>{doc?.email}</Typography>
          </Stack>
        </>
      }

      {updateModalOpen && <ModalUpdateUser doc={doc!} open={updateModalOpen} setOpen={setUpdateModalOpen} />}

    </>
  )
}
