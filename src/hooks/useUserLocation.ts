import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

import { LocationType } from '../types/location';

export const useUserLocation = () => {
  const [coordinates, setCoordinates] = useState<LocationType | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setErrorMsg('You haven`t allowed permission to your location');
          setLoading(false);

          return;
        };

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Low,
        });

        setCoordinates({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        setErrorMsg('Something went wrong during getting your location!');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { coordinates, errorMsg, loading };
};
