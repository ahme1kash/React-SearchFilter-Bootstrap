import React, { useState, useEffect } from "react";

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const searchItem = data.filter((item) => {
    if (search == "" || search.trim().length == 0) {
      return item;
    } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
      return item;
    }
  });
  //   setCount(searchItem.length);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      if (!response.ok) {
        return `Http Error encountered ${response.status} has error ${response.statusText}`;
      }
      let data = await response.json();
      console.log(data);
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    setCount(searchItem.length);
  }, [searchItem]);

  return (
    <>
      <form>
        <div className="form-group col-md-12">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="Search Query By Name"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <small>Total Rows searched {count} </small>
        </div>
      </form>
      <div className="container mt-5">
        <table className="table table-lg table-striped">
          <thead className="table-info">
            <tr>
              <th scope="col">postId</th>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">email</th>
              <th scope="col">body</th>
            </tr>
          </thead>

          <tbody>
            {searchItem &&
              searchItem.map((val) => {
                return (
                  <tr key={val.id}>
                    <td>{val.postId}</td>
                    <td>{val.id}</td>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.body}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SearchFilter;
