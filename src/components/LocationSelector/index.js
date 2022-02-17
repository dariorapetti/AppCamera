import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { COLORS } from '../../constants';
import Geolocation from "@react-native-community/geolocation";

const LocationSelector = ({ onLocation }) => {
    const [pickedLocation, setPickedLocation] = useState();

    const handleGetLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                console.warn(position);
                const location = {
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                    latitudDelta: 0.09,
                    longitudDelta: 0.05
                };
                setPickedLocation(location);
                onLocation(location);
            },
            error => {
                console.warn(error);
                Alert.alert(
                    'No se pudo obtener la posición',
                    'Por favor habilite el servicio de localización e intente nuevamente',
                    [{text: 'Ok'}]
                )
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 10000,
                forceRequestLocation: true,
                showLocationDialog: true
            }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                { pickedLocation ? 
                    <Text>{pickedLocation.latitud}, {pickedLocation.longitud}</Text> : 
                    <Text>No hay una ubicación seleccionada</Text>
                }
            </View>
            <Button title="Seleccionar ubicación" color={COLORS.PEACH_PUFF} onPress={handleGetLocation} />
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
    }
});

export default LocationSelector;