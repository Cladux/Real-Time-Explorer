"use client";
import {
  Input,
  Link,
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
    <Navbar isBlurred={false} maxWidth="xl" className="bg-opacity-70 bg-neutral-800">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarBrand className="gap-2 items-end">
        <p className="font-bold text-2xl">RTE</p>
        <span className="text-xs">(Real Time Explorer)</span>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex justify-center">
        <SearchCities />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <ProfileDropDown />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem className="h-full items-center">
          <SearchCities />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Nav;
