const React = require('react');
export const test = () => {
  const results = [1, 2];
  return (
    <div>
      {results.length > 0 ? (
        results.map(i => <div key={i}>{i}</div>)
      ) : (
        <p>none</p>
      )}
    </div>
  );
};
