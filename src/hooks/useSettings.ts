import { useContext } from 'react';
import { SettingsContext } from '../../app/_SettingsContext';

const useSettings = () => {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error ('useSettings should be used by Provider');
  };

  return context;
};

export default useSettings;
