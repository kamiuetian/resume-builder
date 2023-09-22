function PriceCard({
    duration,
    price,
    mostPopular,
    selectedPrice,
    setSelectedPrice,
}: {
    duration: string;
    price: number;
    mostPopular?: boolean;
    selectedPrice?: number;
    setSelectedPrice?: any;
}) {
    return (
        <div className="flex items-baseline space-x-3">
            <input
                type="radio"
                name="price"
                checked={selectedPrice === price}
                onChange={(e) => setSelectedPrice(+e.target.value)}
                value={price}
                className="h-4 w-4 cursor-pointer"
            />
            <div className="flex flex-col space-y-1">
                <h2 className="text-lg font-semibold">{duration}</h2>
                <p className="text-sm text-gray-400">${price}</p>
            </div>
            {mostPopular && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-normal text-green-800">
                    Most Popular
                </span>
            )}
        </div>
    );
}
export default PriceCard;
