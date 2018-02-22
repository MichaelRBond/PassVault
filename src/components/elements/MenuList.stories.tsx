import { storiesOf } from "@storybook/react";
import * as React from "react";

import Chrome from "../Chrome";
import MenuList from "./MenuList";

storiesOf("MenuList", module)
  .add("with chrome", () => (
      <Chrome>
        <MenuList items={[{
          title: "Favorites",
          icon: "favorite",
          href: "#/favorites",
        },
        {
          title: "Notes",
          icon: "insert_drive_file",
          href: "#/notes",
        }]}/>
      </Chrome>
  ));
