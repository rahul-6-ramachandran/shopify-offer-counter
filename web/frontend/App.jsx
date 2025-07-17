import { BrowserRouter, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NavMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import {  PolarisProvider, QueryProvider } from "./components/providers/index.js";


export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.glob("./pages/**/!(*.test.[jt]sx)*.([jt]sx)", {
    eager: true,
  });
  const { t } = useTranslation();

  
  return (
    <PolarisProvider>
      <BrowserRouter>
      {/* <AppBridgeProvider> */}
        <QueryProvider>
          <NavMenu>
            <Link to="/" rel="home" />
            <Link to="/pagename">{t("NavigationMenu.pageName")}</Link>
          </NavMenu>
          <Routes pages={pages} />
        </QueryProvider>
        {/* </AppBridgeProvider> */}
      </BrowserRouter>
    </PolarisProvider>
  );
}
