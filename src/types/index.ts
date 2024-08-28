export type Country = {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
};
export type Sate = {
  id: number;
  name: string;
  iso2: string;
};

export type City = {
  id: number;
  name: string;
};
export type CityDetails = {
  datasource: {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  };
  ref: string;
  old_name: string;
  country: string;
  country_code: string;
  region: string;
  state: string;
  city: string;
  lon: number;
  lat: number;
  state_code: string;
  state_COG: string;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
};

export type BgImage = {
  id: string;
  slug: string;
  color: string;
  description: string;
  urls: {
    full: string;
    regular: string;
  };
  users: {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    links: {
      self: string;
    };
    profile_image: { small: string };
  };
};

export type articles = {
  author: string;
  content: string;
  description: string;
  publishedAt: Date;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
};

export type CurrentWeather = {
  coord: {
      lon: number;
      lat: number;
  };
  weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
  }[];
  base: string;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
  };
  visibility: number;
  wind: {
      speed: number;
      deg: number;
      gust: number;
  };
  clouds: {
      all: number;
  };
  dt: number;
  sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

