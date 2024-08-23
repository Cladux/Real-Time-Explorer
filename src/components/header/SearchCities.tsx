"use client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios, { type AxiosResponse, type AxiosError } from "axios";
import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import type { City } from "@/types";
import { FaEye } from "react-icons/fa";
import { useStore } from "@/lib/store";

const options = {
  headers: {
    "X-Api-Key": process.env.API_NINJA,
  },
};
const SearchCities = () => {
  const { update } = useStore();
  const [searchValue, setSearchValue] = useState<string>();
  const [cities, setCities] = useState<City[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.get(`https://api.api-ninjas.com/v1/city?name=${searchValue}`, options),
    onSuccess: (res: AxiosResponse) => setCities(res.data),
    onError: (e: AxiosError) => console.error(e.response?.data),
  });

  useEffect(() => {
    searchValue && mutate();

  }, [mutate, searchValue]);

  return (
    <Autocomplete
      variant="bordered"
      labelPlacement="outside-left"
      label="Search City:"
      fullWidth
      isLoading={isPending}
      onInputChange={setSearchValue}
      size="lg"
      classNames={{ selectorButton: "hidden" }}
      endContent={
        <Button isIconOnly variant="light" onPress={() => searchValue && update(searchValue,cities[0].country)}>
          <FaEye />
        </Button>
      }
    >
      {cities.map(({ name }: City, i: number) => (
        <AutocompleteItem key={i} value={name}>
          {name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default SearchCities;
