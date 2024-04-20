import React, { useState, useEffect } from "react";
import SanctionTreeView from "./SanctionTreeView";
import questionsData from "./questions.json";

function App() {
  const [sanctionsData, setSanctionsData] = useState(null);

  useEffect(() => {
    // A function to transform the questions data into a tree structure
    const transformQuestionsToTree = (jsonData) => {
      return Object.keys(jsonData).map((tableKey) => ({
        name: tableKey,
        isExpanded: false,
        children: Object.keys(jsonData[tableKey]).map((colKey) => ({
          name: colKey,
          isExpanded: false,
          children: [result(jsonData[tableKey][colKey])],
        })),
      }));
    };

    const treeData = transformQuestionsToTree(questionsData);
    setSanctionsData(treeData);
  }, []);

  return (
    <div>
      {sanctionsData ? (
        <SanctionTreeView data={sanctionsData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

function result(jsonData) {
  const list = [];
  Object.keys(jsonData).forEach((element) => {
    const e = {
      name: element,
      value: { data: jsonData[element] },
    };
    list.push(e);
  });
  list.reverse();
  var a = null;
  var b = null;
  list.forEach((e) => {
    const c = a;
    if (c == null) {
      b = {
        name: e.name,
        isExpanded: false,
        value: e.value,
      };
    } else {
      b = {
        name: e.name,
        isExpanded: false,
        children: [c],
        value: e.value,
      };
    }
    a = b;
  });
  return a;
}
export default App;
