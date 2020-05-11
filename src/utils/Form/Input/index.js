import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

export default function Input({ name, icon,...rest }) {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <>
      <div className="input-group">
        <input
              ref={inputRef}
              defaultValue={defaultValue}
              className={error ? "form-control inputError" : "form-control"}
              {...rest}
            />
        { icon && (
          <div className="input-group-append">
            <button className='input-group-txt btn btn-success' type='submit'>{icon}</button>
          </div>
        )}
      </div>
      { error && <small>{error}</small> }
    </>
  );
}