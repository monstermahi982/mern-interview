import Sidebar from "../component/Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="flex w-full">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/5">
        {children}
      </div>
    </div>
  );
};

export default Layout;
