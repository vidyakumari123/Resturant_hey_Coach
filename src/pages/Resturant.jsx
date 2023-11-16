import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Resturant = () => {
  const [Resturant, setRes] = useState([]);

  useEffect(() => {
    const fetchAllRes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Res");
        setRes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllRes();
  }, []);

  console.log(Resturant);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Res/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Vidya Resturant</h1>
      <div className="Resturant">
        {Resturant.map((Resturant) => (
          <div key={Resturant.id} className="Resturant">
            <img src={Resturant.cover} alt="" />
            <h2>{Resturant.title}</h2>
            <p>{Resturant.desc}</p>
            <span>${Resturant.price}</span>
            <button className="delete" onClick={() => handleDelete(Resturant.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${Resturant.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new Resturant
        </Link>
      </button>
    </div>
  );
};

export default Resturant;
