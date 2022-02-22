import RNFS from 'react-native-fs';
import { MAPS_KEY } from '../constants/maps';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image, location) => {
    const { latitude, longitude } = location;
    return async dispatch => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAPS_KEY}`);

        if(!response.ok) throw new Error("No se ha podido obtener la dirección");

        const resData = await response.json();

        if(!resData.results) throw new Error("No se ha podido obtener la dirección");

        const address = resData.results[0].formatted_address;

        const filename = image.split('/').pop();
        const Path = `file:///${RNFS.DocumentDirectoryPath}/${filename}`;

        try {
            await RNFS.copyFile(image, Path);
            dispatch({
                type: ADD_PLACE,
                payload: {
                    title,
                    image: Path,
                    address,
                    latitude,
                    longitude
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}