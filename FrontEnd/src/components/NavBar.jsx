import React from 'react'
import { DropDown } from './DropDown'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <>
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 mb-3">
  <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
      <h1 className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
        ArtHive
      </h1>
      <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
        <span className="block relative w-6 h-px rounded-sm bg-white"></span>
        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
      </button>
    </div>
    {/* <DropDown/> */}
    <div className="lg:flex flex-grow items-center" id="example-navbar-warning">
      <ul className="flex flex-col lg:flex-row list-none mr-auto">
        <li className="nav-item">
          <Link className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/">
            <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75" /> 
          </Link>
        </li>
        <li className="nav-item">
          <Link className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/">
            <i className="fab fa-twitter text-lg leading-lg text-white opacity-75" /> <span className="ml-2">Written Works</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/authors">
            <span className="ml-2">Authors</span>
          </Link>
        </li>
      </ul>
      <div className="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
        <div className="flex">
          <span className="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-indigo-600 rounded-full text-sm bg-indigo-100 items-center rounded-r-none pl-2 py-1 text-indigo-800 border-r-0 placeholder-indigo-300">
            <i className="fas fa-search"></i>
          </span>
        </div>
        <input type="text" className="px-2 py-1 h-8 border border-solid  border-indigo-600 rounded-full text-sm leading-snug text-indigo-700 bg-indigo-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-indigo-300" placeholder="Search indigo" />
      </div>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar
