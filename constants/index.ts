import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiDesert,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi"
import { MdOutlineVilla } from "react-icons/md"
import { FaSkiing } from "react-icons/fa"
import { BsSnow } from "react-icons/bs"
import { IoDiamond } from "react-icons/io5"

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the Country side",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a pool",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is close to a lake",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property have skiing activities.",
  },
  {
    label: "Castle",
    icon: GiCastle,
    description: "This property is in a castle",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property have camping activities",
  },
  { label: "Arctic", icon: BsSnow, description: "This property have arctic." },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property have is in a cave.",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property is near a desert.",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property have lux",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is luxurious",
  },
]
