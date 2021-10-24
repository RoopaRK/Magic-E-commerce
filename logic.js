import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLogin } from "../LoginContext";

export default function Cart() {
  let [info, setInfo] = useState(null);
  let { token } = useLogin();
  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          "https://del-now.naveenkamath.repl.co/user",
          {
            headers: {
              authorization: token
            }
          }
        );
        setInfo(data);
      } catch (error) {
        setInfo("error");
        console.log("error is--> ", error);
      }
    })();
  }, []);
  return (
    <div>
      <h2>This is cart</h2>
      {info === null && <p>Loading</p>}
      {info === "error" && <p>Error occured : need to login</p>}
      {info?.name && (
        <p>
          {info.name} || {info.pincode}
        </p>
      )}
    </div>
  );
}
export default function Category() {
  let { login } = useLogin();
  return (
    <div>
      <h2>Category page</h2>
      {phonesDB.data.map(({ name, price }, index) => {
        return (
          <div
            key={index}
            style={{
              border: "1px solid blue",
              margin: "0.5rem",
              borderRadius: "0.5rem"
            }}
          >
            <h2>{name}</h2>
            <h3>Rs: {price}</h3>
            {login ? (
              <Link to={`/product/${name}`}> View Details </Link>
            ) : (
              <h3>Login to view more details</h3>
            )}
          </div>
        );
      })}
    </div>
  );
}
