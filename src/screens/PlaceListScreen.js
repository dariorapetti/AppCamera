import React from 'react'
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/PlaceItem';

const PlaceListScreen = ({navigation}) => {
    const places = useSelector(state => state.places.places);

    const onSelectDetail = (id) => {
        navigation.navigate('Detalle', id);
    }
    
    const renderItem = ({ item }) => (
        <PlaceItem
            title={item.title}
            image={item.image}
            address='Calle falsa 123, Ciudad, País'
            onSelect={onSelectDetail}
        />
    )

    return (
        <FlatList 
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}>
        </FlatList>
    )
}

export default PlaceListScreen;
