"use client"
import Link from "next/link"


const Unauthorized = () => {
  return (
    <div>
      <p> Unauthorized </p> 
      <Link href="/home"> Back to home </Link>
    </div>


  )
}

export default Unauthorized