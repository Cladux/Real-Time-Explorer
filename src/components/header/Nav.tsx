"use client";
import {
  Avatar,
  AvatarGroup,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import SearchCities from "./SearchCities";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import { LiaLinkedin } from "react-icons/lia";

const Nav = () => {
  return (
    <Navbar isBlurred={false} maxWidth="full" className="bg-opacity-90 bg-neutral-800">
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
        <AvatarGroup isBordered size="sm">
          <Link href="https://www.linkedin.com/in/cladux">
            <Avatar radius="sm" color="primary" fallback={<LiaLinkedin className="size-10" />} />
          </Link>
          <Link href="https://github.com/Cladux/Real-Time-Explorer">
            <Avatar color="secondary" fallback={<BsGithub className="size-10" />} />
          </Link>
        </AvatarGroup>
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
