import { useContext } from 'react';
import { SettingsContext } from '../../app/_SettingsContext';

// works in pair with settings context
const useSettings = () => {
  // creating context value using hook useContext
  const context = useContext(SettingsContext);

  // validation if context had been created
  if (!context) {
    throw new Error ('useSettings should be used by Provider');
  };

  return context;
};

export default useSettings;
