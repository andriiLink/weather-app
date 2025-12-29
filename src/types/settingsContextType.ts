// type for how our data about settings will look like
export type SettingsType = {
  language: string,
  windSpeed: boolean,
  humidity: boolean,
  temperatureMeasure: string,

  handleChangeLanguage: (lang: LanguageType) => void,
  handleToggleWindSpeed: () => void,
  handleToggleHumidity: () => void,
  handleChangeTemperature: (measure: TemperatureMeasureType) => void,
};

// type for language
export type LanguageType = 'ua' | 'en';

// enum for availible languages to decrease mistakes during developing
export enum Languages {
  UA = 'ua',
  EN = 'en',
};

// type for temperatures
export type TemperatureMeasureType = 'celsius' | 'kelvin' | 'fahrenheit';

// enum for availible temp formats to decrease mistakes during developing
export enum TemperatureMeasures {
  Celsius = 'celsius',
  Kelvin = 'kelvin',
  Fahrenheit = 'fahrenheit',
};
