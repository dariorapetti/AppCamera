import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { MAPS_KEY } from '../../constants/maps';

const MapPreview = ({ location, style, children }) => {
    const { latitude, longitude } = location;
    const mapPreviewUrl = location ? 
    `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${latitude},${longitude}&key=${MAPS_KEY}` : '';
    console.warn(mapPreviewUrl);
    return (
        <View style={{...styles.mapPreview, ...style}}>
            { location ? <Image style={styles.mapImage} source={{uri: mapPreviewUrl}} /> : (children)}
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;