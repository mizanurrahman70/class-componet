import React, { useRef, useState, useEffect } from "react";
import './KzuiSelect.css';

const KzuiCustomSelect = ({
  isClearable,    
  isSearchable,   
  isDisabled,    
  options,        
  value,          
  placeholder,    
  isGrouped,      
  isMulti,        
  onChangeHandler,
  onMenuOpen,     
  onSearchHandler 
}) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(''); 
  // Reference to the select component
  const selectRef = useRef(null);  
  console.log(selectRef)

  
  // menu opent when the menu is opened
  useEffect(() => {
    if (isOpen && onMenuOpen) {
      onMenuOpen();
    }
  }, [isOpen, onMenuOpen]);

  // Function to handle selecting an option
  const handleSelect = (option) => {
    if (isMulti) {
       // Remove the option if already selected
      const newValue = value && Array.isArray(value) && value.includes(option)
        ? value.filter(val => val !== option) 
        : [...(value || []), option];  // Add the option if not selected
      onChangeHandler(newValue);
    } else {
      onChangeHandler(option);  
      setIsOpen(false); 
    }
  };

  // Function to handle clearing the selection
  const handleClear = () => {
    onChangeHandler(isMulti ? [] : null);  
    setSearchTerm('');  
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);  
    if (onSearchHandler) {
      onSearchHandler(value); 
    }
  };

  // Filtered options based on the search  and grouping
  const filteredOptions = isGrouped
    ? options.map(group => ({
      ...group,
      options: group.options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(group => group.options.length > 0)
    : options.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={`kzui-custom-select ${isDisabled ? 'kzui-custom-select--disabled' : ''}`} ref={selectRef}>
      <div className="kzui-select-input-filed" onClick={() => !isDisabled && setIsOpen(!isOpen)}>
        {isMulti && value && value.length > 0 ? (
          <div className="kzui-select-multi-values">
            {value.map((val, index) => (
              <span key={index} className="kzui-select-multi-value">
                {val.label}
                {isClearable && (
                  <span className="kzui-custom-select__clear-single" onClick={() => handleSelect(val)}>
                    &times;
                  </span>
                )}
              </span>
            ))}
          </div>
        ) : value ? (
          <span className="kzui-select__single-value">{value.label}</span>
        ) : (
          <span className="kzui-select__placeholder">{placeholder}</span>
        )}
        {isClearable && value && (
          <span className="kzui-select__clear-all" onClick={handleClear}>
            &times;
          </span>
        )}
      </div>

      <div className={`kzui-select__menu ${isOpen ? 'kzui-select__menu--visible' : ''}`}>
        {isSearchable && (
          <input
            type="text"
            className="kzui-select__search-input"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search..."
          />
        )}

        <ul className="kzui-custom-select__list">
          {isGrouped ? (
            filteredOptions.map((group, index) => (
              <li key={index} className="kzui-select__group">
                <div className="kzui-select__group-label">{group.label}</div>
                <ul className="kzui-select__group-list">
                  {group.options.map((option, idx) => (
                    <li
                      key={idx}
                      className={`kzui-select__option ${value && Array.isArray(value) && value.includes(option) ? 'kzui-select__option--selected' : ''}`}
                      onClick={() => handleSelect(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`kzui-select__option ${value && Array.isArray(value) && value.includes(option) ? 'kzui-select__option--selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default KzuiCustomSelect;
