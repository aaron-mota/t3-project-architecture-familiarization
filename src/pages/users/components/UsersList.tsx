import React from 'react'
import { useState } from "react";
// import { getDocs } from "../../../services";
import { Skeleton, Stack, Typography } from "@mui/material";
import { trpc } from '../../../utils/trpc';
import { colors } from "../../../utils/constants";
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

export function UsersList() {
  const router = useRouter()
  const {data: docs, isFetching, isError, isLoading, isSuccess} = trpc.users.getAll.useQuery()

  // SET STALETIME FOR ROUTE/PROCEDURE (locate this somewhere more centrally?)
  const queryClient = useQueryClient()
  const docsKey = trpc.users.getAll.getQueryKey();
  queryClient.setQueryDefaults(docsKey, { staleTime: 30 * 60 * 1000 });


  
  if (isLoading) return <Skeleton width={400} height={200} />
  if (isFetching) return <Skeleton width={200} height={100} />
  if (isError) return <Typography variant="h6" component="h1">Sorry, something went wrong.</Typography>

  return (
      <Stack gap={1}>
        {docs?.map(({id, first_name, last_name, email, gender}) => 
          <Stack
            key={id}
            onClick={() => router.push(`/users/${id}`)}
            sx={{
              backgroundColor: gender == "Female" ? colors.pink : colors.blue,
              borderRadius: 4,
              px: 2,
              py: 2,
              '&:hover': {
                cursor: "pointer"
              }
            }}
          >
            <Typography>{first_name} {last_name}</Typography>
            <Typography>{email}</Typography>
          </Stack>
        )}
      </Stack>
  )
}
