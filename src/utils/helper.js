// returns time in GMT- / GMT+ format
export const convertTimestampGMT = (epochTime, timezoneAbbreviation) => {
  const epochTimeMillis = epochTime * 1000;
  const timeZone = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "long",
    timeZone: timezoneAbbreviation,
  }).resolvedOptions().timeZone;
  const localTime = new Date(epochTimeMillis);
  const formattedTime = localTime.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone,
    timeZoneName: "short",
  });
  return formattedTime;
};

// returns time in provided timezone
export const convertTimestamp = (epochTime, timezoneAbbreviation) => {
  const epochTimeMillis = epochTime * 1000;
  const adjustedTime = new Date(epochTimeMillis);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: timezoneAbbreviation,
  };
  const intlFormat = new Intl.DateTimeFormat("en-US", options).format(
    adjustedTime
  );
  const formattedTime = intlFormat + " " + timezoneAbbreviation;
  return formattedTime;
};

export const convertLocalTimestamp = (epochTime) => {
  // Convert epoch time to milliseconds
  let date = new Date(epochTime * 1000);
  // Format options
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };
  // Format the date
  let formattedTime = date.toLocaleDateString("en-US", options);
  return formattedTime;
};

export const pressureInHg = (pressureInHpa) => {
  const pressureinHg = pressureInHpa * 0.029529983071445;
  return pressureinHg.toFixed(2);
};

export const capitalizeWeatherCondition = (condition) => {
  // Split the sentence into words
  const words = condition.split(" ");
  // Capitalize the first letter of each word
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  // Join the words back into a sentence
  const capitalizedSentence = capitalizedWords.join(" ");
  return capitalizedSentence;
};

export const assessSurfingConditions = (data) => {
  const { waveHeight, wavePeriod, windWaveHeight, swellWaveHeight } = data;

  // Check if wave conditions are within safe limits for surfing
  const isSafeToSurf =
    waveHeight <= 2.5 &&
    wavePeriod >= 8 &&
    windWaveHeight <= 1.5 &&
    swellWaveHeight <= 2.5;

  return isSafeToSurf
    ? "It's safe to go surfing!"
    : "Conditions may not be ideal for surfing. Please exercise caution.";
};

export const assessAirQuality = (data) => {
  const { europeanAQI, usAQI, co, no2, so2, ozone, dust, uvIndex, ammonia } =
    data;

  // Evaluate air quality based on individual pollutants
  const isCOHigh = co > 9; // Example threshold for high carbon monoxide levels
  const isNO2High = no2 > 40; // Example threshold for high nitrogen dioxide levels
  const isSO2High = so2 > 20; // Example threshold for high sulphur dioxide levels
  const isOzoneHigh = ozone > 100; // Example threshold for high ozone levels
  const isDustHigh = dust > 10; // Example threshold for high dust levels
  const isUVIndexHigh = uvIndex > 5; // Example threshold for high UV Index
  const isAmmoniaHigh = ammonia !== "N/A" && ammonia > 10; // Example threshold for high ammonia levels

  // Generate air quality summary based on individual pollutant levels
  if (
    isCOHigh ||
    isNO2High ||
    isSO2High ||
    isOzoneHigh ||
    isDustHigh ||
    isUVIndexHigh ||
    isAmmoniaHigh
  ) {
    return "Air quality may be compromised. Consider precautions based on specific pollutant levels.";
  }

  // Evaluate air quality based on AQI thresholds
  const isAirQualityGood = europeanAQI <= 50 && usAQI <= 50;
  const isAirQualityModerate =
    europeanAQI > 50 && europeanAQI <= 100 && usAQI > 50 && usAQI <= 100;
  const isAirQualityUnhealthy = europeanAQI > 100 || usAQI > 100;

  // Generate air quality summary based on AQI thresholds
  if (isAirQualityGood) {
    return "Air quality is good. It's safe to be outdoors.";
  } else if (isAirQualityModerate) {
    return "Air quality is moderate. Take precautions if sensitive to air pollution.";
  } else if (isAirQualityUnhealthy) {
    return "Air quality is unhealthy. Limit outdoor activities, especially for sensitive groups.";
  } else {
    return "Unable to determine air quality at this time.";
  }
};

export const assessWeatherConditions = (data) => {
  const {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    pressure,
    visibility,
    cloudiness,
    snowLastHour,
    snowLast3Hours,
    rainLastHour,
    rainLast3Hours,
  } = data;

  // Evaluate temperature and feels-like conditions
  const isTemperatureCold = temperature < 0;
  const isFeelsLikeVeryCold = feelsLike < -10;

  // Evaluate wind conditions
  const isWindStrong = windSpeed > 10; // Example threshold for strong wind

  // Evaluate precipitation conditions
  const isSnowing = snowLastHour > 0 || snowLast3Hours > 0;
  const isRaining = rainLastHour > 0 || rainLast3Hours > 0;

  // Evaluate additional weather parameters
  const isLowVisibility = visibility < 200; // Example threshold for low visibility
  const isHighHumidity = humidity > 80; // Example threshold for high humidity
  const isHighPressure = pressure > 30; // Example threshold for high pressure

  // Generate weather summary based on conditions
  if (isTemperatureCold && isFeelsLikeVeryCold && isWindStrong) {
    return "Extreme cold and strong wind. Dress warmly and take precautions.";
  } else if (isTemperatureCold && isFeelsLikeVeryCold) {
    return "Very cold weather. Dress warmly to stay comfortable.";
  } else if (isSnowing) {
    return "Snowfall. Be cautious of slippery surfaces and reduced visibility.";
  } else if (isRaining) {
    return "Rainfall. Consider carrying an umbrella and be cautious of wet conditions.";
  } else if (cloudiness === 100) {
    return "Overcast skies. Limited visibility may be expected.";
  } else if (isLowVisibility) {
    return "Low visibility. Exercise caution, especially during travel.";
  } else if (isHighHumidity) {
    return "High humidity. Stay hydrated and be mindful of potential discomfort.";
  } else if (isHighPressure) {
    return "High atmospheric pressure. Weather conditions may be stable.";
  } else {
    return `Weather conditions appear normal.`;
  }
};

export const geoLocation = async () => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const userLocationDetails = {
        latitude,
        longitude,
        locationSuccess: true,
        errorMessage: "",
      };
      return userLocationDetails;
    } catch (error) {
      const errorDetails = {
        errorMessage: error.message,
        error,
      };
      return errorDetails;
    }
  } else {
    return {
      errorMessage: "Geolocation is not supported by this browser",
    };
  }
};

export const commonTypographyStyle = {
  color: "text.secondary",
  fontSize: "14px",
  gutterBottom: true,
};
