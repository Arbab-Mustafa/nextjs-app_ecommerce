import { TiStarFullOutline } from "react-icons/ti";
import Image
 from "next/image";
const ReviewSection = () => {
  return (
    <div>
      <div className="flex items-center px-6 py-1">
        <span className="font-medium">4.8</span>
        <div className="ml-2 text-orange-500 text-lg flex">
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
        </div>
        <div className="ml-auto text-gray-400 text-sm">10093 Reviews &gt;</div>
      </div>
      <div className="min-h-2 bg-gray-100"></div>

      <div className="px-8 py-4 flex">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200">
          <Image src={"/user-avatar.svg"} height={30} width={30} alt="user" />
        </div>
        <div className="ml-2.5">
          <div className="">Ramandeep Singh</div>
          <div className="text-gray-400 text-xs">3 days ago</div>
        </div>
        <div className="ml-auto text-orange-500 flex mt-1">
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
          <TiStarFullOutline />
        </div>
      </div>
      <div>
        <div className="px-8 py-2 mx-4">
          <div className="text-sm font-light">
            Amazing Device, Fast Delivery. Must Buy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
