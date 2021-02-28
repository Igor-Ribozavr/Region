import { RECEIVE_DATA, ADD_REGION, DELETE_REGION } from './actionTypes';

export const receiveData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://salty-shelf-51947.herokuapp.com/api/region?type=1'
      );
      const result = await response.json();
      dispatch({
        type: RECEIVE_DATA,
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addRegion = (parametrFilter) => {
  return (dispatch) => {
    console.log(parametrFilter);

    dispatch({
      type: ADD_REGION,
      payload: parametrFilter,
    });
  };
};

export const deleteRegion = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://api/list/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const result = await response.json();

      dispatch({
        type: DELETE_REGION,
        payload: result,
      });
    } catch (error) {}
  };
};

// export const editRegion = (id, title) => {
//   return async (dispatch) => {
// try {
//     const response = await fetch(
//       `https://api/list/${id}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           title: title,
//         }),
//       }
//     );
//     const result = await response.json();
//     dispatch({
//       type: EDIT_REGION,
//       payload: result,
//     });
//    } catch (error) {}
//   };
// };
