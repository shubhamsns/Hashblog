import {auth, googleAuthProvider} from '@/lib/firebase'
import {Button} from '@chakra-ui/button'
import {Image} from '@chakra-ui/image'
import React from 'react'

function Enter() {
  const user = null
  const username = null

  return (
    <>
      {user ? (
        !username ? (
          <UserNameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </>
  )
}

function SignInButton() {
  const signInWithGoogle = async () => {
    // todo: try catch for errors
    await auth
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        //* code which runs on success
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        console.log(errorCode)

        const errorMessage = error.message
        console.log(errorMessage)
      })
  }
  return (
    <Button
      leftIcon={<Image boxSize="30px" src="/google.png" />}
      size="lg"
      onClick={signInWithGoogle}
      colorScheme="messenger"
      variant="outline"
    >
      Sign In with Google
    </Button>
  )
}

function SignOutButton() {
  return (
    <Button
      size="lg"
      colorScheme="red"
      variant="outline"
      onClick={() => auth.signOut()}
    >
      Sign Out
    </Button>
  )
}

function UserNameForm() {}

export default Enter
