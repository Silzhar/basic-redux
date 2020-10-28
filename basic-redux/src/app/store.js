import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import calculatorReducer from '../features/calculatorSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    calculator: calculatorReducer,
  },
});
