import { Redirect } from 'expo-router'

export default function index() {
    console.log("Entered initial index.tsx and redirecting to login page");
  return (
    <Redirect href={'/(auth)/login'} />
  )
}