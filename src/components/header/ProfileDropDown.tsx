"use client";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

const ProfileDropDown = () => {
  const session = useSession();

  return session.data?.user ? (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <User
          classNames={{ base: "flex-row-reverse", wrapper:"items-end hidden md:flex" }}
          as="button"
          avatarProps={{
            size:"sm",
            isBordered: true,
            color: "primary",
            src: session.data?.user?.image as string,
          }}
          className="transition-transform"
          name={session.data?.user?.name as string}
          description={session.data?.user?.email}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
      <DropdownItem key="logout" className="md:hidden">
          <h3>{session.data?.user?.name}</h3>
          <p>{session.data?.user?.email}</p>
        </DropdownItem>
        <DropdownItem key="logout">
          <Button onClick={() => signOut()} size="sm" fullWidth color="danger">
            <FiLogOut size={20} /> Log Out
          </Button>
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
