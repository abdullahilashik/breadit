"use client"

import { cn } from '@/lib/utils';
import React, {useState} from 'react'
import {FC} from 'react';
import { Button } from './ui/Button';
import {signIn, useSession, signOut} from 'next-auth/react';
import { Icons } from './Icons';
import { useToast } from './ui/use-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({className, ...props}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGitlabLoading, setIsGitlabLoading] = useState(false);
  const {toast} = useToast();
  const loginWithGoogle = async ()=>{
    setIsLoading(true);
    
    try{
      // throw new Error('There is a problem');
      signIn('google');
    }catch(error){
      // toast notification      
      toast({
        title: 'There was a problem',
        description: 'There was a problem signing in with google account!',
        variant: 'default'
      });
    }finally{      
      setIsLoading(false);
    }
  };
 const gitlabLogin = async()=> {
  try{
    setIsGitlabLoading(true);
    signIn('gitlab')
  }catch(error){
    toast({
      title: 'There was a problem',
      description: 'There was a problem signing in with google account!',
      variant: 'default'
    });
  }finally{
setIsGitlabLoading(false);
  }
 }

  return (
    <div className={cn('flex flex-col gap-4 justify-center', className)}>
        <Button onClick={loginWithGoogle} isLoading={isLoading} size={'sm'} className='w-full'>
          {isLoading? null : <Icons.google className='h-4 w-4 mr-2'/>}
          Google</Button>
          <Button isLoading={isGitlabLoading} size={'sm'} onClick={gitlabLogin}>Github</Button>
    </div>
  )
}

export default UserAuthForm