"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useStore } from "@/lib/store";
import { Autocomplete, AutocompleteItem, Avatar, Chip, Select, SelectItem } from "@nextui-org/react";
import type { City, Country, Sate } from "@/types";
import { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaTreeCity } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";

const options = {
  method: "GET",
  headers: {
    "X-CSCAPI-KEY": process.env.Country_State_City_API ?? "",
  },
};

const SearchCityModal = () => {
  const { updateCountry, updateCity } = useStore();
  const [countryIso2, setCountryIso2] = useState<string>();

  //custom Hook needed ?
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
      {/* Country select */}
      <Autocomplete
        fullWidth
        size="lg"
        label="Select Country"
        defaultItems={countries ?? []}
        placeholder="Germany"
        startContent={<BiWorld />}
        isLoading={gettingCountries}
        isDisabled={!gotCountries}
        onSelectionChange={(iso2) => {
          getStats(iso2?.toString() ?? "");
          setCountryIso2(iso2?.toString() ?? "");
        }}
        onInputChange={(value: string) => updateCountry(value)}
      >
        {countries?.map(({ name, iso2 }: Country) => (
          <AutocompleteItem
            key={iso2}
            value={name}
            startContent={<Avatar size="sm" src={`https://flagcdn.com/${iso2.toLocaleLowerCase()}.svg`} />}
            endContent={<Chip size="sm">{iso2}</Chip>}
          >
            {name}
          </AutocompleteItem>
        ))}
      </Autocomplete>

      {/* state select */}
      <Autocomplete
        fullWidth
        size="lg"
        label="Select State"
        defaultItems={stats ?? []}
        placeholder="Bavaria"
        startContent={<FaMapMarkedAlt />}
        isLoading={gettingStats}
        isDisabled={!gotStats}
        onSelectionChange={(iso2) => getCities(iso2?.toString() ?? "")}
      >
        {stats?.map(({ name, iso2 }: Sate) => (
          <AutocompleteItem key={iso2}>{name}</AutocompleteItem>
        ))}
      </Autocomplete>

      {/* city select */}
      <Autocomplete
        fullWidth
        size="lg"
        label="Select City"
        defaultItems={cities ?? []}
        placeholder="Munich"
        startContent={<FaTreeCity />}
        isLoading={gettingCities}
        isDisabled={!gotCities}
        onSelectionChange={(name) => updateCity(name?.toString() ?? "")}
      >
        {cities?.map(({ name }: City) => (
          <AutocompleteItem key={name}>{name}</AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
};

export default SearchCityModal;
