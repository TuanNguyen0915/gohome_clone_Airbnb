interface IContainer {
  children: React.ReactNode
}

const Container: React.FC<IContainer> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  )
}

export default Container
