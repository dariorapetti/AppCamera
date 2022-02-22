import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({ navigation, route }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);

    useEffect(() => {
        Geolocation.getCurrentPosition(
            position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.09,
                    longitudeDelta: 0.05
                };
                setInitialRegion(location);
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
    }, []);

    const handleSelectLocation = event => {
        setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
    }

    const handleSaveLocation = () => {
        if(selectedLocation){
            navigation.navigate('Nuevo', {
                mapLocation: selectedLocation
            });
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={handleSaveLocation}>
                    <Text style={styles.headerButton}>Guardar</Text>
                </TouchableOpacity>
            )
        })
    }, [navigation, handleSaveLocation]);

    return (
        <MapView 
            style={styles.container}
            initialRegion={initialRegion}
            onPress={handleSelectLocation}
        >
            { selectedLocation ? ( 
                <Marker 
                    title="Ubicación seleccionada"
                    coordinate={selectedLocation}
                />
            ) : (<Text style={styles.loading}>Cargando...</Text>)}
        </MapView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerButton: {
        fontSize: 18,
        backgroundColor: '#FFF',
        color: '#000',
        padding: 4,
        borderRadius: 4
    },
    loading: {
        fontSize: 16,
        color: '#000',
        fontWeight: 'bold'
    }
})

export default MapScreen
