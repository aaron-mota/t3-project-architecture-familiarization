import React, { useState } from "react"
import { Stack, AppBar, Toolbar, Button } from "@mui/material"
import { useRouter } from "next/router"



export default function SiteTopNav({
}) {

  const router = useRouter()
  const { href }: { href?: string } = router.query

  const [url, setUrl] = useState(href)

  const buttonOpacity = 0.8
  const buttonsMain = [
    {
      label: "home",
      href: "/",
    },
    {
      label: "users",
      href: "/users",
    },
  ]


  return (
    <AppBar
      position="fixed"
      elevation={0}

      sx={{
        // backgroundColor: "transparent",
        backgroundColor: "primary.main",
        color: "#fff",
        // paddingTop: {xs: 1, sm: 1.5, md: 4},
        // paddingBottom: {xs: 1, sm: 1.5, md: 2},
        width: {
          // md: `calc(100% - widthpx)`
        },

        '& .MuiToolbar-root': {
          paddingLeft: 0,
          paddingRight: 0
        },
        '& .MuiButton-root': {
          borderRadius: "400px",
        },
        '& .MuiButton-text': {
          '&:hover': {
            opacity: 1,
            filter: "opacity(100%)",
            // fontWeight: 600,
            background: "none",
          }
        },
        '& .MuiButton-contained': {
          opacity: 1,
          // boxShadow: "4px 4px 12px 0px rgba(0,0,0,0.2)", 
          boxShadow: "4px 4px 12px 0px rgba(0, 123, 255, 0.2)", 
        },
      }}
    >

      <Toolbar variant="dense" sx={{minHeight: {xs: 7, sm: 7 }}} >

        <Stack direction="row" gap={2} display={"block"}>
            {buttonsMain.map(({label, href}) => (
              <Button
                key={`key-${href}`}
                size="large"
                // color="inherit"
                onClick={() => {setUrl(href); router.push(href)}}
                sx={{
                  opacity: (url == href) ? 1 : buttonOpacity,
                  color: "#ffffff"
                // fontWeight: (url == bookmark) && 600,
              }}>
                  {label}
              </Button>
            ))}
        </Stack>

      </Toolbar>

    </AppBar>
  )
}
