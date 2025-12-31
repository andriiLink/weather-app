// interface for interpretation of weather codes and defining icon for it and gradient
export interface WeatherInterpretation {
  label: string,
  icon: string,
  gradient: [string, string, ...string[]],
  textColor: string,
};
