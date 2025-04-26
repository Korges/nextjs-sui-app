import { FC } from "react";

type TextProps = {
  text: string,
  isError?: boolean,
  centered?: boolean
}

export const CustomText: FC<TextProps> = ({text, isError, centered}) => {
  const textColor = isError ? "text-red-500" : "text-gray-500";
  const centeredClassName = centered ? "text-centered" : "";

  return <div className={`${centeredClassName} ${textColor}`}>{text}</div>;
}