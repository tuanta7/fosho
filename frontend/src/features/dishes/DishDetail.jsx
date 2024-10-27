import { useParams } from "react-router-dom";

const DishDetail = () => {
  const { dishId, restaurantId, userId } = useParams();
  return (
    <div>
      Detail {dishId} {restaurantId} {userId}{" "}
    </div>
  );
};

export default DishDetail;
