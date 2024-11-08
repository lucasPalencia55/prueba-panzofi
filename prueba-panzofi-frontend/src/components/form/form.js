import React from 'react';
export function Form({ title, fields = [], submit, change = () => {}, buttonTitle }){
  const onChange = (index, event) => {
    const values = [...fields];
    values[index].value = event.target.value;
    change(values);
  }
  const onSubmit = (event) => {
    event.preventDefault()
    submit(fields)
  }
  return (
    <form className='flex flex-col' onSubmit={(event) => onSubmit(event)}>
      {title && <h5 className='text-lg text-center mt-0 text-gray-600 mb-10'>{title}</h5>}
      <div className='w-full p-0'>
        <div className='grid m-0 gap-6 grid-cols-4 md:grid-cols-8 lg:grid-cols-12'>
          
          {fields.map(({ type, placeholder }, index) => (
            <div key={index} className='col-span-4 md:col-span-8 lg:col-span-12' >
              <input 
                className='w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400' 
                type={type}
                placeholder={placeholder}
                onChange={(event) => onChange(index, event)} />
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded mt-6 hover:bg-blue-600 transition duration-300"
      >{buttonTitle}
      </button>
    </form>
  )
}
