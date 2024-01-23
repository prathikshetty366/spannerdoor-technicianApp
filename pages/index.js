import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodoList } from "../app/store/todo/actions";
import Login from "./login";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, []);
  return (
    <div className="app">
    <Login/>
    </div>
  );
}
