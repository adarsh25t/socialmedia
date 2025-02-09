import * as FileSystem from 'expo-file-system';
import { supabase } from '../lib/superbase';
import { decode } from 'base64-arraybuffer';
export const getUserImageSrc = (imageUri) => {
    if (imageUri) {
        return getSupabaseFileUrl(imageUri)
    }
    else {
        return require('../assets/images/defaultUser.png');
    }
}

export const getSupabaseFileUrl = filePath => {
    if (filePath) {
        return { uri: `https://ecdbtevxuzqvolredlyx.supabase.co/storage/v1/object/public/uploads/${filePath}` }
    }
    return null;
}

export const uploadFile = async (folderName, fileUri, isImage = true) => {

    try {

        let fileName = getFilePath(folderName, isImage);
        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64
        })
        let imageData = decode(fileBase64);
        let { data, error } = await supabase
            .storage
            .from('uploads')
            .upload(fileName, imageData, {
                cacheControl: '3600',
                upsert: false,
                contentType: isImage ? 'image/*' : 'video/*',
            })

        if (error) {
            return {
                success: false,
                message: "Could not upload media",
            }
        }

        return {
            success: true,
            data: data.path
        }

    } catch (error) {
        console.log("error", error);
        return {
            success: false,
            message: "Could not upload media",
        }
    }
}

export const getFilePath = (folderName, isImage) => {
    let ext = isImage ? '.png' : '.mp4';
    return `${folderName}/${new Date().getTime()}${ext}`;
}