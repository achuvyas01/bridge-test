"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface AvatarWithInitialsProps {
  name: string;
  className?: string;
}

const AvatarWithInitials: React.FC<AvatarWithInitialsProps> = ({
  name,
  className,
}) => {
  // Default to an empty string if name is not provided
  const contactName = name ?? "";

  // Split the name into parts
  const nameParts = contactName.split(" ");

  // Destructure the name parts
  const firstName = nameParts[0] || ""; // First part or empty string
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  // If last name is not present, take the second character of the first name
  const displayLastName = lastName || firstName.slice(1, 2);

  // Construct the initials
  const initials = `${firstName[0] ?? ""}${
    displayLastName[0] ?? ""
  }`.toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-primary text-white font-bold rounded-full w-[30px] h-[30px] lg:w-[38px] lg:h-[38px]",
        className
      )}
    >
      <span className="text-black font-bold truncate text-input group-hover:opacity-100 opacity-50">
        {initials}
      </span>
    </div>
  );
};

export default AvatarWithInitials;
