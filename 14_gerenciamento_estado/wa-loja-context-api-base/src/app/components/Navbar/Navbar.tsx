"use client";

import { useAuthContext } from "@/app/provider/AuthProvider";
import Link from "next/link";

export default function Navbar() {
  const {logout, emailUser} = useAuthContext();
  return (
    <nav className="navbar navbar-expand-md bg-light border-bottom border-body sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Loja WA
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Abrir menu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/favoritos">
                Lista de Favoritos
              </Link>
            </li>
          </ul>
            {emailUser}
          <Link className="nav-link mx-2" href="/login">
            <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => logout()}
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
