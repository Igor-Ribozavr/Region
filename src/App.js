import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveData } from './redux/actions';
import './App.css';

function App() {
  const dataFirst = useSelector((state) => state.data);
  const dataSecond = useSelector((state) => state.creature);

  const [detailsDist, setDetailsDist] = useState([]);
  const [detailsCountry, setDetailsCountry] = useState([]);
  const [region, setRegionChange] = useState([]);
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

  const helper = (userIdCountry) => {
    const shownState = detailsCountry.slice();
    const index = shownState.indexOf(userIdCountry);
    if (index >= 0) {
      shownState.splice(index, 1);
      setRegionChange(shownState);
    } else {
      shownState.push(userIdCountry);
      setRegionChange(shownState);
    }
  };

  useEffect(() => {
    dispatch(receiveData());
  }, [dispatch]);
  // console.log(dataFirst);
  // console.log(region[0]);
  // console.log(dataSecond && dataSecond.children);

  return (
    <div className="page">
      <div className="action-container">
        <div className="filter-container">
          <h1>Фильтр</h1>
        </div>
        <div className="add-container">
          <h1>Добавление новой информации</h1>
          <div className="checkbox-container">
            <div className="container-input-checkbox-district">
              <select
                className="input-checkbox-city"
                onChange={(event) => {
                  helper(event.target.value);
                  console.log(event.target.value);
                }}
              >
                <option value="None">Не выбрано</option>
                {dataFirst &&
                  dataFirst
                    .filter((el) => {
                      if (el.name === region[0]) {
                        dispatch({ type: 'ADD_REGION', payload: el });
                        return el.name === region[0];
                      } else {
                        return el;
                      }
                    })
                    .map((elCity, keyCity) => {
                      return (
                        <option value={elCity.name} key={keyCity}>
                          {elCity.name}
                        </option>
                      );
                    })}
              </select>
            </div>
            <div className="container-input-checkbox-district">
              <select
                className="input-checkbox-district"
                onChange={(event) => {
                  // console.log(event.target.value);
                }}
              >
                <option value="None">Не выбрано</option>
                {dataSecond &&
                  dataSecond.children.map((elCity, keyCity) => {
                    return (
                      <option value={elCity.name} key={keyCity}>
                        {elCity.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="form-add-information">
            <input type="text" className="input-text"></input>
          </div>
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
