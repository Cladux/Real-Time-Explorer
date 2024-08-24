"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import { Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import type { City, Country, Sate } from "@/types";
import { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaTreeCity } from "react-icons/fa6";
import { FaMapMarkedAlt, FaSearch } from "react-icons/fa";

const options = {
  method: "GET",
  headers: {
    "X-CSCAPI-KEY": process.env.Country_State_City_API ?? "",
  },
};

const SearchCityModal = () => {
  const { city, country, updateCountry, updateCity } = useStore();
  const [countryIso2, setCountryIso2] = useState<string>();
  const [capital, setCapital] = useState<string>();

  const {
    data: countries,
    isPending: gettingCountries,
    isSuccess: gotCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => await fetch(`https://api.countrystatecity.in/v1/countries`, options).then((res) => res.json()),
  });

  const {
    data: stats,
    mutate: getStats,
    isSuccess: gotStats,
    isPending: gettingStats,
  } = useMutation({
    mutationKey: ["states"],
    mutationFn: async (iso2: string) =>
      await fetch(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, options).then((res) => res.json()),
  });

  const {
    data: cities,
    mutate: getCities,
    isSuccess: gotCities,
    isPending: gettingCities,
  } = useMutation({
    mutationKey: ["cities"],
    mutationFn: async (stateIso2: string) =>
      await fetch(
        `https://api.countrystatecity.in/v1/countries/${countryIso2}/states/${stateIso2}/cities`,
        options
      ).then((res) => res.json()),
  });
  return (
    <>
      {" "}
      <Select
        size="lg"
        label="Select Country"
        startContent={<BiWorld />}
        isLoading={gettingCountries}
        isDisabled={!gotCountries}
        classNames={{ listboxWrapper: "show-scroll" }}
      >
        {countries?.map(({ name, iso2, capital }: Country, i: number) => (
          <SelectItem
            onClick={() => {
              getStats(iso2);
              setCapital(capital);
              setCountryIso2(iso2);
              updateCountry(name);
            }}
            startContent={<Avatar size="sm" src={`https://flagcdn.com/${iso2.toLocaleLowerCase()}.svg`} />}
            key={i}
          >
            {name}
          </SelectItem>
        ))}
      </Select>
      <Select
        size="lg"
        label="Select State"
        startContent={<FaMapMarkedAlt />}
        isLoading={gettingStats}
        isDisabled={!gotStats}
        classNames={{ listboxWrapper: "show-scroll" }}
      >
        {stats?.map(({ name, iso2 }: Sate, i: number) => (
          <SelectItem onClick={() => getCities(iso2)} key={i}>
            {name}
          </SelectItem>
        ))}
      </Select>
      <Select
        size="lg"
        label="Select City"
        startContent={<FaTreeCity />}
        isLoading={gettingCities}
        isDisabled={!gotCities}
        classNames={{ listboxWrapper: "show-scroll" }}
      >
        {cities?.map(({ name }: City, i: number) => (
          <SelectItem
            color={name === capital ? "success" : "default"}
            endContent={name === capital && <Chip size="sm">Capital</Chip>}
            onClick={() => updateCity(name)}
            key={i}
          >
            {name}
          </SelectItem>
        ))}
      </Select>
    </>
  );
};

export default SearchCityModal;
