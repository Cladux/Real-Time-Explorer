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
  const [searchValue, setSearchValue] = useState<string>("a")
  const [Cities, setCities] = useState<City[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: () => axios.get(`https://api.api-ninjas.com/v1/city?name=${searchValue}`, options),
    onSuccess: (res: AxiosResponse) => setCities(res.data),
    onError: (e: AxiosError) => console.error(e.response?.data),
  });

  useEffect(() => {
    mutate();
  }, [mutate, searchValue]);

  return (
    <div className="h-full flex items-center">

    <Autocomplete
      variant="faded"
      label="Search City"
      endContent={
        <Button
          size="sm"
          color="primary"
          isIconOnly
          isLoading={isPending}
          disabled={isPending}
          onPress={() => update(searchValue)}
        >
          <FaEye size={16} />
        </Button>
      }
      onInputChange={setSearchValue}
      size="sm"
    >
      {Cities.map(({ name }: City, i: number) => (
        <AutocompleteItem key={i} value={name}>
          {name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
    </div>
  );
};

export default SearchCities;
