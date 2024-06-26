type propsType = {
    viewCart: boolean
    setViewCart: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav = ({viewCart, setViewCart}: propsType) => {
    const button = viewCart ? (
        <button onClick={()=> setViewCart(false)}>View Products</button>
    ) : (
        <button onClick={()=> setViewCart(true)}>View Cart</button>
    )

  return (
    <nav className="nav">
        {button}
    </nav>
  )
}

export default Nav