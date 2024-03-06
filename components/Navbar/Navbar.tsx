import { User } from "@prisma/client"
import Container from "../Shares/Container"

import Categories from "@/components/Navbar/Categories"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface INavbarProps {
  currentUser?: User | null
}
const Navbar = ({ currentUser }: INavbarProps) => {
  return (
    <div className="fixed z-10 mx-auto w-full max-w-[2520px] rounded-2xl bg-white">
      <Container isNavbar={true}>
        <div className="flexBetween gap-4 md:gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser} />
        </div>
      </Container>
      <Categories />
    </div>
  )
}

export default Navbar
