import React, { useState, useEffect } from "react"
import { Button, Card, CardActions, CardContent, IconButton, Modal, Stack, TextField, Typography } from "@mui/material"
import { trpc } from "../utils/trpc"
import { CloseRounded } from "@mui/icons-material"

import { Todo } from "../pages/todos"



interface Props {
  open: boolean;
  setOpen: Function;
  doc: Todo; // imported type!
}


export function ModalTodo({
  open,
  setOpen,
  doc
}: Props) {

  const handleClose = () => {
    setUpdatedDoc(doc)
    setOpen(false)
  }
  const handleSubmit = () => {
    if (updatedDoc.todo) {
      updateTodo()
      setOpen(false)
    }
  }
  
  const utils = trpc.useContext()
  const mutationUpdateToDo = trpc.todos.updateOne.useMutation({
      onSettled() {      
        utils.todos.getAll.invalidate()
        setOpen(false) // location ?
      },
    })
  function updateTodo() {
    mutationUpdateToDo.mutate({id: updatedDoc.id, todo: updatedDoc.todo})
  }

  const [updatedDoc, setUpdatedDoc] = useState(doc)
  useEffect(() => {
    setUpdatedDoc(doc)
  }, [doc.id])



  function keyPress(e: React.KeyboardEvent<HTMLDivElement>){
    if(e.key == "Enter"){
      handleSubmit()
    }
  }


  return (
    <>
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
                minWidth: {xs: "70%", sm: "400px"},
                width: {sm: "400px"}
              }}
            >
              <CardContent sx={{position: "relative"}}>
                <IconButton color="inherit" size="medium"
                    onClick={() => handleClose()}
                    edge="end"
                    sx={{opacity: 0.6,
                      position: "absolute", top: "6px", right: "18px", zIndex: 1350
                    }}
                  >
                    <CloseRounded />
                </IconButton>

                <Typography gutterBottom variant="h5" component="div" align="center" sx={{mt: 1}}>
                  To Do
                </Typography>

                <Stack sx={{width: 0.95, margin: "auto"}} >
                  <TextField
                      fullWidth
                      size="small"
                      value={updatedDoc.todo}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setUpdatedDoc({...updatedDoc, todo: e.target.value})}}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => keyPress(e)}
                      autoFocus
                      // get rid of broken outline when no label
                      sx={{
                        mt: 3,
                        mb: 5,
                        '& legend': { display: 'none' },
                        '& fieldset': { top: 0 },
                      }}
                    />
                </Stack>
              </CardContent>

              <CardActions sx={{borderTop: "#dadce0 0.5px solid", mt: 2, "& .MuiButton-root": {flexGrow: 1}}}>
                  <Button color="primary" sx={{borderRadius: 400}} onClick={() => handleSubmit()}>
                    Save
                  </Button>
                  <Button color="primary" sx={{borderRadius: 400}} onClick={() => handleClose()}>
                    Cancel
                  </Button>
              </CardActions>
            </Card>
        </Modal>
    </>
  )
}
