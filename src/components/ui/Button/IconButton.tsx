import { type SizeProp } from "@fortawesome/fontawesome-svg-core";
import { type IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type MouseEventHandler, type FC } from "react";

type IconButtonProps = {
  icon: IconDefinition;
  active?: boolean;
  style?: "secondary" | "primary";
  size?: "sm" | "xs";
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconButton: FC<IconButtonProps> = ({
  icon,
  active,
  style,
  size,
  onClick,
}) => {
  let buttonSize = "w-10";
  if (size === "sm") {
    buttonSize = "w-8";
  } else if (size === "xs") {
    buttonSize = "w-4";
  }
  let iconSize: SizeProp = "xl";
  if (size === "sm") {
    iconSize = "sm";
  } else if (size === "xs") {
    iconSize = "xs";
  }

  let iconStyle =
    "text-primary-light hover:bg-primary-light hover:text-primary-med";

  if (active && style === "secondary") {
    iconStyle = "bg-secondary-light text-secondary-med";
  } else if (style === "secondary") {
    iconStyle =
      "bg-secondary-dark text-secondary-med group-hover:bg-secondary-light group-hover:text-secondary-med";
  } else if (active) {
    iconStyle = "bg-primary-light text-primary-med";
  }

  return (
    <button
      className={`${iconStyle} ${buttonSize} aspect-square rounded-full`}
      onClick={onClick}
    >
      <FontAwesomeIcon size={iconSize} icon={icon} />
    </button>
  );
};
