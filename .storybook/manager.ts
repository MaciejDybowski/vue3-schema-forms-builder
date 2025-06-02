import {addons} from "storybook/manager-api"
import {create} from "storybook/theming"

export const TecnaLight = create({
  base: "light",
  brandTitle: "Aurea Dashboard Storybook",
  brandUrl: "https://www.tecna.pl",
  brandImage: "https://static.aurea.software/img/logo-aurea-1624x266.png",
  brandTarget: "_blank",
  appBg: "whitesmoke",
  textColor: "black",
})

addons.setConfig({
  theme: TecnaLight
})
