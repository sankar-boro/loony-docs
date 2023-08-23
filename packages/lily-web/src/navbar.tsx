const NavbarComponent = () => {
  return (
    <nav>
      <div className="nav-sections">
        <div className="nav-left">
          <div>
            <a href="/">Home</a>
          </div>
        </div>
        <div className="nav-right">
          <div>Search</div>
          <div>
            <a href="/create">Create</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent
