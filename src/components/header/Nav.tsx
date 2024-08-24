"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import ProfileDropDown from "./ProfileDropDown";
import SearchCities from "./SearchCities";

const Nav = () => {
  return (
    <Navbar isBlurred={false} maxWidth="xl" className="bg-opacity-90 bg-neutral-800">
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand className="gap-2 items-end justify-center md:justify-start">
        <p className="font-bold text-2xl">RTE</p>
        <span className="hidden md:block text-xs">Real Time City Explorer</span>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex justify-center">
        <SearchCities />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ProfileDropDown />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <SearchCities />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
