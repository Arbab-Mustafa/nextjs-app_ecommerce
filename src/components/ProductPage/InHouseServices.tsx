import Image from "next/image";

const InHouseServices = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Image
          src={"/quaility-check-icon.svg"}
          width={18}
          height={17}
          alt="checbox"
        />
        <span className="text-gray-400">Mi Screen Protect</span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={"/quaility-check-icon.svg"}
          width={18}
          height={17}
          alt="checbox"
        />
        <span className="text-gray-400">
          10 Days Replacement Policy
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Image
          src={"/quaility-check-icon.svg"}
          width={18}
          height={17}
          alt="checbox"
        />

        <span className="text-gray-400">2 years Warranty</span>

        <Image
          src={"/quaility-check-icon.svg"}
          width={18}
          height={17}
          alt="checbox"
        />

        <span className="text-gray-400">Complete Protection</span>
      </div>
      <div className="flex items-center space-x-2"></div>
    </div>
  );
};

export default InHouseServices;
