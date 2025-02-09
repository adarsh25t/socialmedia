import { supabase } from "../lib/superbase";

export const getUserData = async (userId) => {

    try {

        const { data, error } = await supabase
            .from('users')
            .select()
            .eq('id', userId)
            .single();

        if (error) {
            return {
                success: false,
                message: error.message,
            }
        }

        return {
            success: true,
            data,
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}

export const updateUserData = async (userId,data) => {

    try {

        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)

        if (error) {
            return {
                success: false,
                message: error.message,
            }
        }

        return {
            success: true
        }

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}