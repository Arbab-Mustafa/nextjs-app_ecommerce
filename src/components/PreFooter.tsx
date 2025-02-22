const PreFooter = () => {
  return (
    <div>
      <div className="py-6">
        <div className="font-semibold text-[27px] text-center">
          Our Services
        </div>
        <div className="font-light text-2xl text-center">
          Trusted. Secure. Reliable.
        </div>
      </div>
      <div className="bg-white flex flex-col items-center">
        <div className="text-[21px] font-semibold pt-2.5 pb-4">XIAOMI CARE</div>
        <img src="/pre-footer.svg" alt="xiaomi-care" className="" width={295} height={51} />
        <div className="flex justify-center gap-4 text-[10px] font-normal mx-4 whitespace-nowrap pl-6 pb-4">
          <div className="pr-4">Extended Warranty</div>
          <div className="pr-4">Screen Protect</div>
          <div className="pr-4">Complete Protection</div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
