import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "../ui/dialog";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

interface User {
  picture: string;
  name: string;
}

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getUserProfile = async (tokenInfo: { access_token: string }) => {
    try {
      const response = await axios.get<User>(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: 'application/json',
          },
        }
      );
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => getUserProfile(tokenInfo),
    onError: (error) => console.error('Login failed', error),
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className='p-3 shadow-sm border-b-2 flex justify-between items-center px-5'>
      <a href='/'>
        <img src="/logo.svg" alt="App Logo" />
      </a>
      {user ? (
        <div className='flex items-center gap-4'>
          <a href="/create-trip">
            <Button variant='outline' className='rounded-xl'>+ Create Trip</Button>
          </a>
          <a href="/my-trips">
            <Button variant='outline' className='rounded-xl'>My Trips</Button>
          </a>
          <Popover>
            <PopoverTrigger>
              <img
                src={user.picture}
                alt={user.name}
                className='h-[30px] w-[35px] rounded-xl cursor-pointer bg-slate-800 text-white'
              />
            </PopoverTrigger>
            <PopoverContent>
              <h2
                className='hover:bg-red-500 hover:text-white px-2 py-2 transition-all ease-out rounded-xl cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </h2>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
      )}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="App Logo" />
              <h2 className="font-bold text-lg mt-6">Sign In with Google</h2>
              <p>Sign in to the app securely using Google authentication.</p>
              <Button
  onClick={() => login()}
  className="w-full mt-5 flex gap-4 items-center"
>
  <FcGoogle className="h-7 w-7" />
  Sign In With Google
</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
