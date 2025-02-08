import { Stack, useRouter } from "expo-router"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { View } from "react-native"
import { useEffect } from "react"
import { supabase } from "../lib/superbase"


const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

const MainLayout = () => {

    const { setAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log('====================================');
            console.log(session);
            console.log('====================================');
            if (session) {
                setAuth(session?.user);
                router.replace('home');
            }
            else {
                setAuth(null);
                router.replace('welcome');
            }
        })
    }, [])

    return (
        <Stack
            screenOptions={{ headerShown: false }}
        />
    )
}

export default _layout