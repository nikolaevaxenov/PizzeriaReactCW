import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar/Navbar";

function Cart() {
  useAuth(true);

  return (
    <>
      <Navbar />
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga pariatur
        porro voluptate. Laboriosam veritatis tempora magni voluptatibus fugiat
        quidem, architecto neque expedita ducimus velit consequuntur distinctio.
        Voluptatum sit amet neque!
      </h1>
    </>
  );
}

export default Cart;
