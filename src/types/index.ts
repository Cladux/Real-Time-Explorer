export type City = {
  country: string;
  is_capital: boolean;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
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
