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

export type LanguageType = 'ua' | 'en';

export enum Languages {
  UA = 'ua',
  EN = 'en',
};

export type TemperatureMeasureType = 'celsius' | 'kelvin' | 'fahrenheit';

export enum TemperatureMeasures {
  Celsius = 'celsius',
  Kelvin = 'kelvin',
  Fahrenheit = 'fahrenheit',
};
