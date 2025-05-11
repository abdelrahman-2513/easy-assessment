
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Container, Typography, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

// Define the validation schema using Yup
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
  const { control, handleSubmit, formState: { errors } } = useForm<IRegisterForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: IRegisterForm) => {
    console.log('Registering user with:', data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
        }}
      >
        <Typography variant="h5">Register</Typography>
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
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end" sx={{ marginTop: 1 }}>
            <Grid >
              <Link to="/login">Already have an account? Login</Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
