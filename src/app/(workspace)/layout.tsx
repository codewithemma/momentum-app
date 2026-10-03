import LayoutClientPage from "./components/layout-client-page";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <LayoutClientPage>{children}</LayoutClientPage>;
};

export default Layout;
