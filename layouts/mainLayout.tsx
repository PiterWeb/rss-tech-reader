import { FunctionComponent } from "react";

import Footer from "../components/footer";
import Header from "../components/header";

type Props = {
  children: JSX.Element;
};

const MainLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
