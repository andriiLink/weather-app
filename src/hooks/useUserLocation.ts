import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import { LocationType } from '../types/location';

// custom hook for getting location of our user
export const useUserLocation = () => {
  const [coordinates, setCoordinates] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        // getting permission for access to user location
        let { status } = await Location.requestForegroundPermissionsAsync();

        // cheking if user gave us access to location
        if (status !== 'granted') {
          setErrorMsg('You haven`t allowed permission to your location');
          setLoading(false);

          return;
        };

        // loading user's location with low accuracy
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        // setting location to state
        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Something went wrong during getting your location!');
      } finally {
        // setting load to false
        setLoading(false);
      }
    })();
  }, []);

  return { coordinates, errorMsg, loading };
};
