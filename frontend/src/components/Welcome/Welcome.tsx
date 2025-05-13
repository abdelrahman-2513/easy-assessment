import { Typography, Box, Button, CircularProgress } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { getWelcomeMessage } from "../../apis/auth"

const WelcomePage = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const [message, SetMessage] = useState<string>("")
    const [loading, SetLoading] = useState<boolean>(true)

    useEffect(() => {
        if (!message) {
            getWelcomeMessage()
                .then((res) => {
                    SetMessage(res.data)
                })
                .catch(() => {
                    navigate("/login")
                })
                .finally(() => SetLoading(false))
        }
    }, [message, logout])

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {loading ? (
                <CircularProgress sx={{ marginTop: 2 }} />
            ) : (
                <Typography variant="h4" gutterBottom>
                    {message || "You are logged in successfully."}
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
                disabled={loading}
                sx={{ marginTop: 2, background: "#eb771e" }}
            >
                {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Logout"}
            </Button>
        </Box>
    )
}

export default WelcomePage
