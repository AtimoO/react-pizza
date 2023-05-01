import { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../services/slices/sortSlice';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<any>(null);

  const onClickClear = () => {
    setValue('');
    dispatch(setSearchValue(''));

    // из-за анимации
    setTimeout(() => {
      inputRef.current.focus();
    }, 0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 300),
    [],
  );

  const onChangeInput = (e: any) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <svg
        className={styles.image}
        xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        enableBackground="new 0 0 50 50"
        height="50px"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 50 50"
        width="50px"
        // xml:space="preserve"
      >
        <rect fill="none" height="50" width="50" />
        <circle
          cx="21"
          cy="20"
          fill="none"
          r="16"
          stroke="#000000"
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10"
          strokeWidth="4"
          x1="32.229"
          x2="45.5"
          y1="32.229"
          y2="45.5"
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.search}
        onChange={onChangeInput}
        value={value}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={styles.btn_clear}
          onMouseDown={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z" />
          <path d="M0 0h48v48H0z" fill="none" />
        </svg>
      )}
    </div>
  );
};
export default Search;
