import { Card } from "./ui/card";

type Product = {
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  href: string;
};

type TwoCardsProps = {
  products: Product[];
};

const TwoCards: React.FC<TwoCardsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-2 gap-2 px-[11px] bg-[#f7f6f6] ">
      {products.map((product, index) => (
        <Card
          key={index}
          className="rounded-[6px]"
          onClick={() => (window.location.href = product.href)}
        >
          <div className="text-[#FF6900] bg-orange-100 border-[#FF6900] mb-[6px] mx-6 mr-24 mt-3 rounded-md px-1 py-0.5 text-center text-xs items-center border font-medium w-[67px] h-[19px]" >
            {Math.abs(
              Math.round(
                ((product.price - product.oldPrice) / product.oldPrice) * 100
              )
            )}
            % off
          </div>

          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-[102px] w-[102px] object-contain rounded-sm "
            />
          </div>
          <div className="px-5 pt-2">
            <h2 className="font-semibold text-[13px] mb-[10px]">{product.name}</h2>
            <div className="flex items-center mb-[14px]">
              <p className="font-[600] text-[13.5px]">
              <span className="font-[Arial]">₹</span>
              {product.price.toLocaleString("en-IN")}
              </p>
              <p className="text-[#A8A8A8] line-through text-xs ml-[10px]">
              <span className="font-[Arial]">₹</span>
              {product.oldPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TwoCards;
