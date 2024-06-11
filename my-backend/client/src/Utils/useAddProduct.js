import { useState } from "react";

const useAddProduct = () => {
  const [product, setProduct] = useState({});
  const handelCheng = (e) => {
    let { target } = e;
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };
  return [product, handelCheng];
};

export default useAddProduct;
