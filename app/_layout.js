import { Stack, useRouter } from "expo-router"
import { AuthProvider, useAuth } from "../context/AuthContext"
import { View } from "react-native"
import { useEffect } from "react"
import { supabase } from "../lib/superbase"
import { getUserData } from "../services/userService"


const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>
    )
}

const MainLayout = () => {

    const { setAuth, setUserData } = useAuth();
    const router = useRouter();

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setAuth(session?.user);
                updateUserData(session?.user?.id,session?.user?.email);
                router.replace('home');
            }
            else {
                setAuth(null);
                router.replace('welcome');
            }
        })
    }, [])

    const updateUserData = async (userId,email) => {
        const response = await getUserData(userId);
        if(response.success) {
            setUserData({...response.data,email});
        }
        
    }

    return (
        <Stack
            screenOptions={{ headerShown: false }}
        />
    )
}

export default _layout