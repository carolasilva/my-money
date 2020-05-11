import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function InputMoney({ name, id, otherOnChange,...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const formatMoney = (evt) => {
    let id = evt.target.id;
    let value = evt.target.value;
    let newValue = value.replace(/\D+/g, "");

    if(newValue.length == 1)
      newValue = "R$ 0,0" + newValue;

    else if(newValue.length == 2)
      newValue = "R$ 0," + newValue;

    else if(newValue.length == 3)
      newValue = 'R$ ' + newValue.substring(0,1) + "," + newValue.substring(1,3);

    else if(newValue.length == 4 && newValue.substring(0,2) == "00")
      newValue = "R$ 0," + newValue.substring(2,4);

    else if(newValue.length == 4 && newValue.substring(0,1) == "0")
      newValue = 'R$ ' + newValue.substring(1,2) + "," + newValue.substring(2,4);

    else if(newValue.length == 4 && newValue.substring(0,1) != "0")
      newValue = 'R$ ' +newValue.substring(0,2) + "," + newValue.substring(2,4);

    else if(newValue.length == 5)
      newValue = 'R$ ' +newValue.substring(0,3) + "," + newValue.substring(3,5);

    else if(newValue.length >= 6 && newValue.length <= 8) {
      let separador = newValue.length % 3;
      newValue = 'R$ ' + newValue.substring(0, separador + 1) + "." + newValue.substring(separador + 1, separador + 4) + ',' + newValue.slice(-2);
    }

    else if(newValue.length >= 9 && newValue.length <= 11) {
      let separador = newValue.length % 3;
      newValue = 'R$ ' + newValue.substring(0, separador + 1) + "." + newValue.substring(separador + 1, separador + 4) + "." + newValue.substring(separador + 4, separador + 7) + ',' + newValue.slice(-2);
    }

    else if(newValue.length >= 12 && newValue.length <= 14) {
      let separador = newValue.length % 3;
      newValue = 'R$ ' + newValue.substring(0, separador + 1) + "." + newValue.substring(separador + 1, separador + 4) + "." + newValue.substring(separador + 4, separador + 7) + "." + newValue.substring(separador + 7, separador + 10) + ',' + newValue.slice(-2);
    }

    else if(newValue.length >= 15) {
      newValue = 'R$ ' + newValue.substring(0, newValue.length-2) + ',' + newValue.slice(-2);
    }

    document.getElementById(id).value = newValue;
    otherOnChange(evt);
  };

  return (
    <>
      <div className="input-group">
        <input
              id={id}
              ref={inputRef}
              defaultValue={defaultValue}
              className={error ? "form-control inputError" : "form-control"}
              onChange={formatMoney}
              onFocus={formatMoney}
              {...rest}
            />
      </div>
      { error && <small>{error}</small> }
    </>
  );
}