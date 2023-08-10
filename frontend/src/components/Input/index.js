function Input({ type, label, placeholder, name, value, handleChange}){
    return(
        <div className=''>
        <label className='form-label'>{label}</label>
        <input 
            className='form-control' 
            type={type} 
            placeholder={placeholder} 
            name={name}
            value={value}
            onChange={handleChange}
        />
        </div>
    )
}

export default Input