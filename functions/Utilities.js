export const ResizeImgurImages = (input) => {
  const resizedImage = input.replace(".png", "s.png");

  return resizedImage;
};

import {
  AngularIcon,
  CSharpIcon,
  CssIcon,
  ExpressIcon,
  FigmaIcon,
  FirebaseIcon,
  FramerMotionIcon,
  GITIcon,
  GSAPIcon,
  HTMLIcon,
  JavaScriptIcon,
  MariaDBIcon,
  MicrosoftSQLServerIcon,
  MongoDBIcon,
  NETCoreIcon,
  NextJSIcon,
  NodeJSIcon,
  PhotoshopIcon,
  PostgreSQLIcon,
  ReactJSIcon,
  SassIcon,
  TypeScriptIcon,
} from "@/app/components/icons/AllTechIcons";

const iconsMap = {
  AngularIcon,
  CSharpIcon,
  CssIcon,
  ExpressIcon,
  FigmaIcon,
  FirebaseIcon,
  FramerMotionIcon,
  GITIcon,
  GSAPIcon,
  HTMLIcon,
  JavaScriptIcon,
  MariaDBIcon,
  MicrosoftSQLServerIcon,
  MongoDBIcon,
  NETCoreIcon,
  NextJSIcon,
  NodeJSIcon,
  PhotoshopIcon,
  PostgreSQLIcon,
  ReactJSIcon,
  SassIcon,
  TypeScriptIcon,
};

export const getTechIcon = (tech) => iconsMap[tech];
