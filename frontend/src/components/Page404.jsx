import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="bg-base-200 h-screen flex justify-between items-center">
      <div className="py-8 px-4 mx-auto">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-primary ">
            Không tìm thấy trang
          </p>
          <p className="mb-4 text-lg text-neutral-600">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link to="/" className="btn btn-primary text-base-200">
            🏠 Trở về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page404;
