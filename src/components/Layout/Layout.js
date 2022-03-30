import Head from "next/head";
import Link from "next/link";
import { SITE_TITLE } from "../../utils/meta";
import Header from "../Header/Header";


const Layout = ({children}) => {
  return (
    <div className="">
      <Head>
        <title>{SITE_TITLE}</title>
      </Head>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout;
