import SideNav from '@/components/SideNav';


  


 
export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <div className="flex   md:flex-row ">
      <div className="hidden sm:block">
        <SideNav />
      </div>
      <div className="flex flex-grow p-3  justify-center">{children}</div>
    </div>
  );
}