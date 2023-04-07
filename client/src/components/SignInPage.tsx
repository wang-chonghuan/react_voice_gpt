import { authenticate } from '../context/authenticate';
import { authorize } from '../context/authorize';
import { useAppContext } from '../context/AppContext';
import Stack from "@mui/material/Stack";
import Button from '@mui/material/Button';

export function SignInPage() {
  const { user, loading, dispatch } = useAppContext();

  async function handleSignInClick() {
    dispatch({ type: 'authenticate' });
    const authenticatedUser = await authenticate();
    dispatch({
      type: 'authenticated',
      user: authenticatedUser,
    });
    if (authenticatedUser !== undefined) {
      dispatch({ type: 'authorize' });
      const authorizedPermissions = await authorize(authenticatedUser.username);
      dispatch({
        type: 'authorized',
        permissions: authorizedPermissions,
      });
    }
  }

  return (
    <Stack spacing={2} alignItems='center' mt={2}>
      {user ? (
        <span className="ml-auto font-bold">{user.username} has signed in</span>
      ) : (
        <Button
          onClick={handleSignInClick}
          disabled={loading}
        >
          {loading ? '...' : 'Sign in'}
        </Button>
      )}
    </Stack>
  );
}
