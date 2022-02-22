import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { COLORS } from '../../constants';
import Geolocation from "@react-native-community/geolocation";
import MapPreview from "../MapPreview";
import { useRoute } from "@react-navigation/native";

const LocationSelector = ({ onLocation, onMapLocation }) => {
    const [pickedLocation, setPickedLocation] = useState('');
    const route = useRoute();
    const mapLocation = route?.params?.mapLocation;

    useEffect(() => {
        if(mapLocation){
            setPickedLocation(mapLocation);
            onLocation(mapLocation);
        }
    }, [mapLocation]);

    const handleGetLocation = async () => {
        Geolocation.getCurrentPosition(
            position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.05
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


    const handlePickOnMap = () => {
        onMapLocation();
    }

    return (
        <View style={styles.container}>
            {/* <View style={styles.preview}>
                { pickedLocation ? 
                    <Text>{pickedLocation.latitude}, {pickedLocation.longitude}</Text> : 
                    <Text>No hay una ubicación seleccionada</Text>
                }
            </View> */}
            <MapPreview 
                location={pickedLocation}
                style={styles.preview}
            >
                <Text>No hay ubicación seleccionada</Text>
            </MapPreview>
            <View style={styles.action}>
                <Button title="Seleccionar ubicación" color={COLORS.PEACH_PUFF} onPress={handleGetLocation} />
                <Button title="Seleccionar del mapa" color={COLORS.LIGTH_PINK} onPress={handlePickOnMap} />
            </View>
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
    action:{
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default LocationSelector;