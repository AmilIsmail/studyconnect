interface HeaderProps {
  title: string;
}

function Header({ title }: HeaderProps) {
  return (
    <header>
      <div className="logo">{title}</div>
    </header>
  );
}

export default Header;