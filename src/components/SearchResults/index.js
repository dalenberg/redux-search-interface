import React from "react";
import { numberToLocale } from "../../helpers";
import "./style.css";

const SearchResults = ({ results, show }) =>
  !show ? null : (
    <div className="SearchResults">
      {results &&
        results.map(result => (
          <a
            className="Result"
            key={result.id}
            href={result.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="Result-title">{result.full_name}</h2>
            <div className="Result-content">
              <span className="Result-meta">
                <img
                  className="Result-avatar"
                  src={result.owner.avatar_url}
                  alt={result.owner.login}
                  height={24}
                  width={24}
                />
                <span>{result.owner.login}</span>
              </span>

              <span className="Result-meta">
                {numberToLocale(result.stargazers_count)} stars
              </span>

              <span className="Result-meta">{result.language}</span>
            </div>
          </a>
        ))}
    </div>
  );

export default SearchResults;
