import React, { useState } from 'react';


import KzuiCustomSelect from './componant/KzuiSelect';


function App() {
  const [value, setValue] = useState(null);



  // Countrys Data
  const Countris = [
    {
      label: 'Asia',
      options: [
        { label: 'Tajikistan' },
        { label: 'Afghanistan' },
        { label: 'Bangladesh' },
        { label: 'Bhutan' },
        { label: 'Armenia' }
      ]
    },
    {
      label: 'Europe',
      options: [
        { label: 'Albania' },
        { label: 'Andorra' },
        { label: 'Austria' },
        { label: 'Belarus' },
        { label: 'Belgium' }
      ]
    },
    {
      label: 'Africa',
      options: [
        { label: 'Algeria' },
        { label: 'Angola' },
        { label: 'Benin' },
        { label: 'Botswana' },
        { label: 'Burundi' }
      ]
    }
  ];
  

  const handleChange = (selectedOption) => {
    setValue(selectedOption);
  };

 

  return (
    <div className='kzui-custom-select_main-container'>

      <h2 >Scelete Your Country</h2>

      <KzuiCustomSelect
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        options={Countris}
        value={value}
        placeholder="Select Your Countrys"
        isGrouped={true}
        isMulti={true}
        onChangeHandler={handleChange}
        onMenuOpen={() => console.log('Menu Open')}
        onSearchHandler={(searchText) => console.log('Searching for:', searchText)}
      />
      
    </div>
  );
}
export default App
