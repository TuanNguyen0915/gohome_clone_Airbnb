import { User } from "@prisma/client"
import Container from "../Container"
import Logo from "./Logo"
import Search from "./Search"
import UserMenu from "./UserMenu"

interface INavbarProps {
  currentUser?: User | null
}
const Navbar: React.FC<INavbarProps> = ({currentUser}) => {
  return (
    <div className="fixed z-10 mx-auto w-full max-w-[2520px] rounded-2xl border-b-2 border-rose-500 bg-white py-4 shadow-sm">
      <Container>
        <div className="flexBetween gap-4 md:gap-0">
          <Logo />
          <Search />
          <UserMenu currentUser={currentUser}/>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
