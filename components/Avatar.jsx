import { StyleSheet } from "react-native";
import { theme } from "../constants/theme"
import { hp } from "../helpers/common"
import { Image } from 'expo-image';
import { getUserImageSrc } from "../services/imageService";

const Avatar = ({
    uri,
    size = hp(4.5),
    rounded = theme.radius.md,
    style
}) => {

    return (
        <Image
            source={getUserImageSrc(uri)}
            transition={100}
            style={[
                styles.avatar,
                {
                    width: size,
                    height: size,
                    borderRadius: rounded
                },
                style
            ]}
        />
    )
}

const styles = StyleSheet.create({
    avatar:{
        borderCurve: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1,
    }
})

export default Avatar;