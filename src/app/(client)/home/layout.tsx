const Layout = ({ children, modal }: any) => {
  return (
    <div className="w-[700px] h-[300px]">
      {children}
      {modal}
    </div>
  )
}

export default Layout