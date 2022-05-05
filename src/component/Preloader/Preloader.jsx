import preloader from "../../img/loading.gif";
import style from "./Style/Preloader.module.css";

export const Preloader = () => {
  return <img src={preloader} className={style.preloader}></img>;
};
