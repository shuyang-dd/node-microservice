import Link from 'next/link';

export default({currentUser})=>{

    const links=[
        !currentUser && {label:'sign up',href:'/auth/signup'},
        !currentUser && {label:'sign in',href:'auth/signin'},
        currentUser && {label:'sell',href:'/tickets/new'},
        currentUser && {label:'orders',href:'/orders'},
        currentUser && {label:'sign out',href:'auth/signout'},
    ]
      .filter(linkConfig=>linkConfig)
      .map(({label,href})=>{

        return <li key={href} className="nav-item">
            <Link href={href}>
            <a className="nav-link">{label}</a>
            </Link>
        </li>;
      });

    return <nav className="navbar navbar-light bg-light">
        <Link href="/">
            <a className="navbar-brand">GitTix</a>
        </Link>

        <div className="d=flex justify-content-end">
            <ul className="nav d-flex align-items-center">
                {links}
            </ul>
        </div>
    </nav>
}