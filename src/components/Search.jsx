import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router";
import { search } from "../services/authService";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function searchResults() {
      try {
        const response = await search(query);
        setResults(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    searchResults();
  }, [query]);
  return (
    <div>
      <input
        type="text"
        id="searchBox"
        placeholder="🔍︎ Search User Name Here ..."
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />

      <div>
        {loading && "Loading..."}
        {results.length > 0 && (
          <div>
            {results.map((user) => (
              <div key={user._id}>
                <Link to={`/${user._id}`}>
                  <strong>{user.username}</strong>
                  <hr />
                </Link>
              </div>
            ))}
          </div>
        )}

        {query && results.length === 0 && !loading && (
          <strong>No Matching Results ...</strong>
        )}
      </div>
    </div>
  );
}

export default Search;
