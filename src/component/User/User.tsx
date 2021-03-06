import { useState, useEffect, useCallback, ChangeEvent, FormEvent } from 'react';
import style from './Style/User.module.scss';


export const User = () => {
  const [textInput, setInputText] = useState<string>(''); // для передачи данных из инпута  в форму
  const [userName, setUserName] = useState<string>(''); // для данных из LocalStorage
  const [showInput, setShowInput] = useState<boolean>(true); // показывать/скрывать поле ввода

  useEffect(() => {
    const saved = localStorage.getItem('UserName');
    setUserName(saved ?? '');
    if (saved && saved.length) {
      setShowInput(false);
    }
  }, []);

  const handleChangeInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputText(value);
  }, []);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('UserName', textInput);
    setShowInput(!showInput);
    setUserName(textInput);
  };

  const toggleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className={style.user}>
      {userName === '' ? (
        <div className={style.user__question_container}>
          <h1 className={style.user__question}>Hello, what's your name?</h1>
          <form className={style.user__form} onSubmit={handleFormSubmit}>
            <input
              className={style.user__input}
              onChange={handleChangeInput}
              type="text"
              placeholder="введите имя.."
            />
          </form>
        </div>
      ) : (
        <div>
          <div className={style.user__container} onClick={() => toggleShowInput()}>
            <h1 className={style.user__greetings}>Hello, </h1>
            <span className={style.user__name}>
              <h1> {userName}</h1>
              <svg className={style.user__pencil} viewBox="0 0 100 100">
                <path d="M24.56 92.536L0 100l7.453-24.583c6.356-.244 17.322 10.792 17.107 17.119zM96.617 32.082l-.475.471L67.383 3.766l.472-.472c12.927-12.94 42.016 15.517 28.762 28.788zM61.64 9.516l28.758 28.785-46.303 46.345c-1.222 1.221-2.234.884-2.234.884l2.314-15.356-14.454.074.072-14.468-15.342 2.312s-.34-1.011.883-2.234L61.64 9.516z"></path>
              </svg>
            </span>
          </div>
          {showInput ? (
            <form className={style.user__form} onSubmit={handleFormSubmit}>
              <input
                className={style.user__input}
                onChange={handleChangeInput}
                type="text"
                placeholder="введите имя.."
              />
            </form>
          ) : null}
        </div>
      )}
    </div>
  );
};
