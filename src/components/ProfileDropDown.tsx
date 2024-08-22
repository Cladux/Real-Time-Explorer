"use client";
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const ProfileDropDown = () => {
  const session = useSession();
  return session.data?.user ? (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          size="sm"
          name={session.data?.user?.name as string}
          src={session.data?.user?.image as string}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p>{session.data?.user?.name}</p>
          <p className="font-semibold">{session.data?.user?.email}</p>
        </DropdownItem>
        <DropdownItem onClick={() => signOut()} key="logout" color="danger">
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button size="sm" color="primary" onClick={() => signIn("google")}>
      <FaGoogle /> Sign in with Google
    </Button>
  );
};

export default ProfileDropDown;
