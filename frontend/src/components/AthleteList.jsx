import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

// Code écrit par moi : 85%
const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(20);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getAthletes();
  }, [lastId, keyword]);

  const getAthletes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/athletes?search_query=${keyword}&lastId=${lastId}&limit=${limit}`
      );
      const newAthletes = response.data.result;
      setAthletes([...athletes, ...newAthletes]);
      setTempId(response.data.lastId);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setAthletes([]);
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <h1 className="title has-text-centered">Archives des Jeux Olympiques (124 ans)</h1>
          
          <form onSubmit={searchData} className="mb-4">
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher un athlète, un pays, un sport..."
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Rechercher
                </button>
              </div>
            </div>
          </form>

          <InfiniteScroll
            dataLength={athletes.length}
            next={fetchMore}
            hasMore={hasMore}
            loader={<h4 className="has-text-centered mt-4">Chargement...</h4>}
            endMessage={<p className="has-text-centered mt-4"><b>Fin des résultats.</b></p>}
          >
            <table className="table is-striped is-bordered is-fullwidth mt-2">
              <thead>
                <tr className="has-background-info-light">
                  <th>ID</th>
                  <th>Nom de l'athlète</th>
                  <th>Sexe</th>
                  <th>Équipe (Pays)</th>
                  <th>Jeux</th>
                  <th>Sport</th>
                  <th>Médaille</th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete, index) => (
                  <tr key={index}>
                    <td>{athlete.id}</td>
                    <td>{athlete.Name}</td>
                    <td>{athlete.Sex}</td>
                    <td>{athlete.Team}</td>
                    <td>{athlete.Games}</td>
                    <td>{athlete.Sport}</td>
                    <td>
                      {athlete.Medal ? (
                        <span className={`tag ${athlete.Medal === 'Gold' ? 'is-warning' : athlete.Medal === 'Silver' ? 'is-light' : 'is-danger'}`}>
                          {athlete.Medal}
                        </span>
                      ) : (
                        "Aucune"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default AthleteList;