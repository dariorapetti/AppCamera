import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, Alert, PermissionsAndroid } from "react-native";
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants';

const ImageSelector = (props) => {
    const [pickedUri, setPickedUri] = useState();

    const verifyPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'APP CAMERA - Permisos de cámara',
                    message: 'APP CAMERA necesita acceso a la cámara',
                    buttonNeutral: 'Preguntar más tarde',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'Ok'
                }
            )
            return (granted == PermissionsAndroid.RESULTS.GRANTED);
        } catch (error) {
            console.warn(error);
        }
    };
    const handleTakeImage = async () => {
        const isCameraOk = await verifyPermission();
        if(!isCameraOk) return;

        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        
        const image = await ImagePicker.launchCamera(options, (response) => {
            if(response.didCancel){
                console.log('Cancelado por el usuario');
            } else if(response.error){
                console.log("ImagePicker error: ", response.error);
            } else if (response.customButton) {
                console.log("El usuario ha presionado el botón: ", response.customButton);
            } else {
                setPickedUri(response.assets[0].uri);
                //props.onImage(response.uri);
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                { !pickedUri ? (<Text>No hay una imagen seleccionada</Text>) : (
                    <Image style={styles.image} source={{uri: pickedUri}} />
                )}
            </View>
            <Button title="Tomar foto" color={COLORS.MAROON} onPress={handleTakeImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default ImageSelector;