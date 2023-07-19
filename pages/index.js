import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTodoList } from "../app/store/todo/actions";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodoList());
  }, []);
  return (
    <div className="app">
      Hello
    </div>
  );
}
