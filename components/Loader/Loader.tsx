"use client"
import { PuffLoader } from "react-spinners"
const Loader = () => {
  return (
    <div className="flexCenter h-[80vh]">
      <PuffLoader size={100} color="pink"/>
    </div>
  )
}

export default Loader
