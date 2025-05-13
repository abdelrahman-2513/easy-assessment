import { useForm, Controller } from "react-hook-form"
import { TextField, Button, Container, Typography, Grid, Box, CircularProgress } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import type { ILogin as ILoginForm } from "../../interfaces/authInterface"
import { login as loginServer } from "../../apis/auth"
import { useAuth } from "../../hooks/useAuth"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
})

const LoginPage = () => {
    const nav = useNavigate()
    const { login, isAuthenticated } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (isAuthenticated) nav("/")
    }, [isAuthenticated])

    const onSubmit = async (data: ILoginForm) => {
        setLoading(true)
        try {
            const loggedInResponse = await loginServer(data)
            if (loggedInResponse && loggedInResponse.status === "success") {
                login(loggedInResponse.data.access_token)
                toast.success(loggedInResponse.message)
                nav("/")
            } else {
                toast.error(loggedInResponse.message)
            }
        } catch (err: any) {
            const error = err.response.data
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 3,
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "8px",
                    border: "2px solid #eb771e",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography variant="h5" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                label="Email"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email ? errors.email.message : ""}
                                sx={{
                                    marginBottom: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#eb771e",
                                        },
                                        "& fieldset": {
                                            borderColor: "#eb771e",
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                label="Password"
                                fullWidth
                                margin="normal"
                                type="password"
                                error={!!errors.password}
                                helperText={errors.password ? errors.password.message : ""}
                                sx={{
                                    marginBottom: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#eb771e",
                                        },
                                        "& fieldset": {
                                            borderColor: "#eb771e",
                                        },
                                    },
                                }}
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 2, background: "#eb771e" }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                    </Button>
                    <Grid container justifyContent="flex-end" sx={{ marginTop: 1 }}>
                        <Grid>
                            <Link to="/register">Don't have an account? Register</Link>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>
    )
}

export default LoginPage
