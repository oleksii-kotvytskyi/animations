import { Layout } from "@/components/layout";

export const FirstDay = () => {
  return (
    <Layout day="1">
      <div className="group relative flex flex-col items-center justify-center h-full">
        <div>
          {/* Animation block for change gradients */}
          <div className="absolute inset-0 from-[#43389f] to-[#4dc5c9] bg-gradient-45 opacity-0 group-hover:opacity-[1] transition-opacity duration-500"></div>
          <div className="absolute inset-0 from-[#4dc5c9] to-[#43389f] bg-gradient-45 opacity-1 group-hover:opacity-0 transition-opacity duration-500"></div>
          {/* number 100 block */}
          <div className="relative flex">
            <div className="z-[2] h-[40px] w-6 absolute rounded bg-white  top-0 left-[-16px] rotate-[50deg] shadow-[0_0_13px_0_rgba(0,0,0,0.2)]" />
            <div className="z-[3] h-25 w-6 rounded  bg-white shadow-[0_0_13px_0_rgba(0,0,0,0.2)]"></div>
            <div className="z-[2] h-25 w-25 border-white border-[24px] rounded-full ml-[-10px] shadow-[0_0_13px_0_rgba(0,0,0,0.2)]"></div>
            <div className="z-[1] h-25 w-25 border-white border-[24px] rounded-full ml-[-16px] shadow-[0_0_13px_0_rgba(0,0,0,0.2)]"></div>
          </div>
          <p className="relative text-white uppercase text-[82px] leading-[60px] font-courier font-bold mt-2">
            days
          </p>
          <p className="relative text-white uppercase text-base tracking-[0.3rem] font-courier font-bold ">
            css challenge
          </p>
        </div>
      </div>
    </Layout>
  );
};
