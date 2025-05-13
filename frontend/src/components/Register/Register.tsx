import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import type { IRegister as IRegisterForm } from "../../interfaces/authInterface"
import { register } from '../../apis/auth';
import { toast } from 'react-toastify';
import { useState } from 'react';

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
    .required('Password is required'),
});

const RegisterPage = () => {
  const nav = useNavigate();
  const [loading, SetLoading] = useState<boolean>(false);
  const { control, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: IRegisterForm) => {
    SetLoading(true);
    try {
      const loggedInResponse = await register(data);
      if (loggedInResponse) {
        toast.done(loggedInResponse.message);
      }
      nav("/login")
    } catch (err:any) {
      const error = err.response.data;
      toast.error(error.message);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
          border: '2px solid #eb771e', 
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#eb771e',
                    },
                    '& fieldset': {
                      borderColor: '#eb771e', 
                    },
                  },
                }}
              />
            )}
          />
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
                type="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#eb771e',
                    },
                    '& fieldset': {
                      borderColor: '#eb771e', 
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
                helperText={errors.password ? errors.password.message : ''}
                sx={{
                  marginBottom: 2,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#eb771e', 
                    },
                    '& fieldset': {
                      borderColor: '#eb771e', 
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
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Register'}
          </Button>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 1 }}>
            <Grid>
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
