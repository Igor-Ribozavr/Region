import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveData } from './redux/actions';
import './App.css';

function App() {
  const dataFirst = useSelector((state) => state.data);
  const [detailsDist, setDetailsDist] = useState([]);
  const [detailsCountry, setDetailsCountry] = useState([]);
  const dispatch = useDispatch();

  const districtShawn = (userId) => {
    const shownState = detailsDist.slice();
    const index = shownState.indexOf(userId);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailsDist(shownState);
    } else {
      shownState.push(userId);
      setDetailsDist(shownState);
    }
  };

  const countryShawn = (userIdCountry) => {
    const shownState = detailsCountry.slice();
    const index = shownState.indexOf(userIdCountry);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailsCountry(shownState);
    } else {
      shownState.push(userIdCountry);
      setDetailsCountry(shownState);
    }
  };

  useEffect(() => {
    dispatch(receiveData());
  }, [dispatch]);
  console.log(dataFirst);

  return (
    <div className="page">
      <div className="action-container">
        <div className="filter-container">
          <h1>Фильтр</h1>
        </div>
        <div className="add-container">
          <h1>Добавление новой информации</h1>
        </div>
      </div>
      <div className="content-container">
        {dataFirst &&
          dataFirst.map((elem, key) => {
            return (
              <React.Fragment key={key}>
                <div className="container-regions">
                  <div
                    className="regions"
                    onClick={() => {
                      if (elem.children.length > 0) {
                        districtShawn(elem.id);
                      }
                    }}
                  >
                    {elem.name}
                  </div>

                  {detailsDist.includes(elem.id) && (
                    <div
                      className="district-container"
                      onClick={() => {
                        countryShawn(elem.id);
                      }}
                    >
                      {elem.children &&
                        elem.children.map((elemDis, keyCh) => {
                          return (
                            <React.Fragment key={keyCh}>
                              <div
                                className="district"
                                onClick={(event) => {
                                  countryShawn(elemDis.id);
                                  event.stopPropagation(event);
                                }}
                              >
                                {elemDis.name}
                              </div>
                              {detailsCountry.includes(elemDis.id) && (
                                <div className="country-container">
                                  {elemDis.children &&
                                    elemDis.children.map(
                                      (elemCountry, keyChTw) => {
                                        return (
                                          <React.Fragment key={keyChTw}>
                                            <div
                                              className="country"
                                              onClick={(event) => {
                                                countryShawn(elemDis.id);
                                                event.stopPropagation();
                                              }}
                                            >
                                              {elemCountry.name}
                                            </div>
                                          </React.Fragment>
                                        );
                                      }
                                    )}
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </div>
  );
}

export default App;
